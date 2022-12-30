
export interface SpendingDto {
    _id: number,
    name: string,
    status: string,
    index: number,
    createdDate: Date,
    scheduleDate: Date,
    description?: string,
}

export const TaskSchema = {
    name: "Spending",
    properties: {
        _id: "int",
        name: "string",
        status: "string",
        index: "int",
        createDate: "date?",
        scheduleDate: "date",
        description: "string?",
    },
    primaryKey: "_id",
};

