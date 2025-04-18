import z from "zod";

export const newTodoValidation = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

export type NewTodoValidation = z.infer<typeof newTodoValidation>;
