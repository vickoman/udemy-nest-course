import { Controller, Get, Post, Body, Param, Delete, Patch, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.models';
import { CreateTaskDTO} from "./dto/create-task.dto";
import { GetTaskFilterDTO } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(
        private taskService: TasksService,
    ) { }

    @Get()
    getTasks(@Query() filterDTO: GetTaskFilterDTO): Task[] {
        if (Object.keys(filterDTO).length) {
            return this.taskService.getTasksWithFilter(filterDTO);
        } else {
            return this.taskService.getAllTasks();
        }
    }

    @Post()
    createTask(
        @Body() createTaskDTO: CreateTaskDTO
    ): Task {
        return this.taskService.createTask(createTaskDTO);
    }

    @Get("/:id")
    getTaskById(@Param("id") id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Delete("/:id")
    deleteTask(@Param("id") id: string) {
        return this.taskService.deleteTask(id);
    }

    @Patch("/:id/status")
    updateTask(
        @Param("id") id: string,
        @Body("status") status: TaskStatus,
    ): Task {
        return this.taskService.updateStatus(id, status);
    }

    @Put("/:id")
    updateTaskBody(
        @Param("id") id: string,
        @Body() createTaskDTO: CreateTaskDTO,
    ): Task {
        return this.taskService.updateTask(id, createTaskDTO);
    }
}
