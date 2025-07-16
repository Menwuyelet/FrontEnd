"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const readline = __importStar(require("readline"));
let ID = 0;
let ToDoDB = new Map();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function addTask() {
    console.log("Please Enter task information: ");
    rl.question("Title: ", (TitleAnswer) => {
        if (!TitleAnswer.trim()) {
            console.log("Title cannot be empty!");
            main();
            return;
        }
        rl.question("description: ", (DescriptionAnswer) => {
            rl.question("dueDate(YYYY-MM-DD): ", (DueDateAnswer) => {
                if (DueDateAnswer.trim() && isNaN(Date.parse(DueDateAnswer))) {
                    console.log("Invalid date format!");
                    main();
                    return;
                }
                else {
                    const dDate = new Date(DueDateAnswer);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if (dDate < today) {
                        console.log("dueDate can not be in the past.");
                        main();
                        return;
                    }
                }
                let task = {
                    id: ID,
                    title: TitleAnswer,
                    description: DescriptionAnswer || undefined,
                    completed: false,
                    dueDate: DueDateAnswer || undefined,
                    markAsComplete() {
                        this.completed = true;
                        this.completed_at = new Date();
                        console.log(`Task "${this.title}" marked as complete.`);
                    },
                };
                ToDoDB.set(ID, task);
                console.log("the task is added successfully. you can access it with id: " + ID);
                ID += 1;
                main();
            });
        });
    });
}
function removeTask() {
    rl.question("Enter the id of the task you want to delete: ", (ID) => {
        const numericID = Number(ID);
        if (ToDoDB.has(numericID)) {
            const task = ToDoDB.get(numericID);
            ToDoDB.delete(numericID);
            console.log("the task with id " + ID + " and " + "title " + (task === null || task === void 0 ? void 0 : task.title) + "has been deleted successfully.");
        }
        else {
            console.log("there is no task with id: " + ID);
        }
        main();
    });
}
function display(all) {
    let x = 1;
    if (all) {
        console.log("Task List");
        for (const [id, task] of ToDoDB) {
            console.log(x + ",");
            console.log(`Task ID: ${id}`);
            console.log(`Task ITitle: ${task.title}`);
            console.log(`Task dueDate: ${task.dueDate}`);
            console.log(`Completed: ${task.completed}`);
            if (task.completed) {
                console.log(`Completed: ${task.completed_at}`);
            }
            console.log("------------");
            x++;
        }
    }
    else {
        console.log("Completed Task List");
        for (const [id, task] of ToDoDB) {
            if (task.completed) {
                console.log(x + ",");
                console.log(`Task ID: ${id}`);
                console.log(`Task ITitle: ${task.title}`);
                console.log(`Task completed at: ${task.completed_at}`);
                console.log("------------");
                x++;
            }
        }
    }
    main();
}
function markTaskAsComplete() {
    rl.question("Enter task ID to mark as complete: ", (id) => {
        const numericID = Number(id);
        if (ToDoDB.has(numericID)) {
            const task = ToDoDB.get(numericID);
            task.markAsComplete();
        }
        else {
            console.log(`No task found with ID: ${id}`);
        }
        main();
    });
}
function main() {
    console.log("\nWelcome to the To-Do App.");
    console.log("Choose an action:");
    console.log("1. Create a task");
    console.log("2. Remove a task");
    console.log("3. Mark a task as complete");
    console.log("4. List all tasks");
    console.log("5. List completed tasks");
    console.log("6. Exit");
    rl.question("Choice: ", (choice) => {
        if (!["1", "2", "3", "4", "5", "6"].includes(choice)) {
            console.log("Please choose a valid option.");
            main();
        }
        else {
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
                    console.log("Exiting program...");
                    rl.close();
                    (0, process_1.exit)();
            }
        }
    });
}
main();
//# sourceMappingURL=todo.js.map