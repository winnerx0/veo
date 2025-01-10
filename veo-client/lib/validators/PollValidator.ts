import { z } from "zod";
export const PollValidator = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 charaters",
    })
    .max(20),
  options: z
    .array(
      z.object({
        id: z.string().uuid(),
        name: z.string().min(3, {
          message: "Option must be 3 characters",
        }),
      })
    )
});

export type PollValidator = z.infer<typeof PollValidator>;
