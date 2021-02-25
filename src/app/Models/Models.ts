export class Users {
    id: number;
    firstname: string;
    lastname: string;
    fullname: string;
    isActive: number;
}

export class CreateTaskModel {
    taskName: string;
    workingHours: string;
    currentStatus: string;
    userId: string;
}

export class Tasks {
    id: number;
    name: string;
    statusId: number;
    workingHours: number;
    userId: number;
}

export class Status {
    id: number;
    status1: string
}