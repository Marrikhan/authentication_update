import { Document } from "mongoose";
export interface IEntity extends Document {
    Firstname: string
    Lastname: string
    City: string
    Salary: number
}