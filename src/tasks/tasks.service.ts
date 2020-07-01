import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from "./task.models";
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilter(filterDTO: GetTaskFilterDTO): Task[] {
        const { status, search} = filterDTO;
        let tasks = this.getAllTasks();
        if (status) {
            tasks = tasks.filter(t => t.status === status);
        }

        if( search ) {
            tasks = tasks.filter(t => t.title.includes(search) || t.description.includes(search));
        }
        return tasks;
    }

    createTask(createTaskDTO: CreateTaskDTO) {
        const { title, description} = createTaskDTO;
        const task: Task = {
            id: uuidv1(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(t => t.id === id);
    }

    deleteTask(id: string) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        return { isOk: true, message: `The record ${id} was deleted`};
    }

    updateStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    updateTask(id: string, createTaskDTO: CreateTaskDTO): Task {
        const task = this.getTaskById(id);
        const { title, description } = createTaskDTO;
        task.title = title;
        task.description = description;
        return task;
    }

}
