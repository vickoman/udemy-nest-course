import { TaskStatus } from "../task.models";

export class GetTaskFilterDTO {
    status: TaskStatus;
    search: string;
}