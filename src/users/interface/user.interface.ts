import { Document } from "mongoose";
export interface users extends Document {
    name: string,
    email: string,
    username: string,
    password: string
}