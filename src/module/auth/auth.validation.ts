import { z } from "zod";


const login_validation = z.object({
    email: z.string({ message: "Email is required" }),
    password: z.string({ message: "Email is required" }),
})

export const auth_validation = {
    login_validation,
}

