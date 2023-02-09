import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  task: string;
  done: boolean;
}

const TodoSchema = new Schema<ITodo>(
  {
    task: { type: String, required: true },
    done: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITodo>("Todo", TodoSchema);
