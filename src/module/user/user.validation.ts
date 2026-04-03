
import { z } from "zod";

const create_user = z
  .object({
   fristName: z.string().min(1, "First name is required"),
   lastName: z.string().min(1, "Last name is required"),
   email: z.string().email("Invalid email address"),
   password: z.string().min(6, "Password must be at least 6 characters long"),
   comfirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long"),
  })

export const user_validations = {
  create_user,
};
