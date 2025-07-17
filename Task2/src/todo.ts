import { exit } from "process";
import * as readline from "readline";

let ID: number = 0;

interface ToDoItem{
    id: Number;
    title: string;
    description?: string;
    completed: boolean;
    dueDate?: String;
    completed_at?: Date;

    markAsComplete(): void;
}

let ToDoDB = new Map<Number, ToDoItem>();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function addTask(): void {
    console.log("\nPlease Enter task information: ")

    rl.question("Title: ", (TitleAnswer) =>{
        if (!TitleAnswer.trim()) {
            console.log("Title cannot be empty!");
            main();
            return;
        }
        rl.question("description: ", (DescriptionAnswer) =>{
            rl.question("dueDate(YYYY-MM-DD): ", (DueDateAnswer) =>{
                        if (DueDateAnswer.trim() && isNaN(Date.parse(DueDateAnswer))) {
                            console.log("!! Invalid date format!");
                            addTask();
                            return;
                        } else {
                            const dDate = new Date(DueDateAnswer);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            if (dDate < today){
                                console.log("!! dueDate can not be in the past.");
                                addTask();
                                return;
                            }
                        }
                let task: ToDoItem = {
                    id: ID,
                    title: TitleAnswer,
                    description: DescriptionAnswer || undefined,
                    completed: false,
                    dueDate: DueDateAnswer || undefined,
                    markAsComplete() {
                        this.completed = true;
                        this.completed_at = new Date();
                        console.log(`-- Task "${this.title}" marked as complete.`);
                    },
                };

                ToDoDB.set(ID, task)
                console.log("\nthe task is added successfully. you can access it with id: " + ID)
                ID += 1;
                main();
            });      
        });
    });
}

function removeTask(): void{
    rl.question("\nEnter the id of the task you want to delete: ", (ID) =>{
        const numericID = Number(ID)
        if (ToDoDB.has(numericID)){
            const task = ToDoDB.get(numericID);
            ToDoDB.delete(numericID);
            console.log("\n-- the task with id " + ID + " and " + "title " + task?.title + " has been deleted successfully.");
        }else {
            console.log("\n!! there is no task with id: " + ID);
            removeTask();
            return;
        }
        main();
    });
}

function display(all: Boolean): void{
    let x = 1;
    if (all){
        let allTask: number = 0;
        console.log("\n-- Task List")
        for (const[id, task] of ToDoDB){
            allTask += 1;
            console.log(x + ",");
            console.log(`- Task ID: ${id}`);
            console.log(`- Task ITitle: ${task.title}`);
            console.log(`- Task dueDate: ${task.dueDate}`);
            console.log(`- Completed: ${task.completed}`);
            if (task.completed){
                console.log(`- Completed: ${task.completed_at}`);
            }
            console.log("------------");
            x++;
        }
        if (allTask === 0){
            console.log("-- There are no tasks yet.");
        }else{
            console.log("-- all "+ (x-1) +" tasks are listed. ");
        }
    }else{
        let Ctask: number = 0; 
        console.log("\n-- Completed Task List");
        for (const[id, task] of ToDoDB){
            if (task.completed){
            Ctask += 1;
            console.log(x + ",");
            console.log(`- Task ID: ${id}`);
            console.log(`- Task ITitle: ${task.title}`);
            console.log(`- Task completed at: ${task.completed_at}`);
            console.log("------------");
            x++;
            }
        }
        if (Ctask === 0){
            console.log("\n-- There is no completed task.");
        }else{
            console.log("-- all "+ (x-1) +" completed tasks are listed. ");
        }
    }
    main();
}

function markTaskAsComplete(): void {
    rl.question("\nEnter task ID to mark as complete: ", (id) => {
        const numericID = Number(id);
        if (ToDoDB.has(numericID)) {
            const task = ToDoDB.get(numericID)!;
            task.markAsComplete();
        } else {
            console.log(`\n!! No task found with ID: ${id}`);
        }
        main();
    });
}

let start = true;
function main(): void{
    
    if (start){
        console.log("\nWelcome to the To-Do App.\n");
        start = false;
   }else {
        console.log("\nWelcome back!\n");
   }
    console.log("Choose an action:");
    console.log("1. Create a task");
    console.log("2. Remove a task");
    console.log("3. Mark a task as complete");
    console.log("4. List all tasks");
    console.log("5. List completed tasks");
    console.log("6. Exit\n");


        rl.question("Choice: ", (choice) => {
        if (!["1", "2", "3", "4", "5", "6"].includes(choice)) {
            console.log("Please choose a valid option.");
            main();
        } else {
            switch (choice) {
                case "1":
                    addTask();
                    break;
                case "2":
                    removeTask();
                    break;
                case "3":
                    markTaskAsComplete();
                    break;
                case "4":
                    display(true);
                    break;
                case "5":
                    display(false);
                    break;
                case "6":
                    console.log("\nExiting program...");
                    rl.close();
                    exit();
            }
        }
    });
}


main();
