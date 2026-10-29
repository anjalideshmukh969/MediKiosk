import z from "zod";

const email = z.string().trim().toLowerCase().email("Invalid email");
const password = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be at most 72 characters")
    .regex(/[A-Za-z]/, "Password needs a letter")
    .regex(/\d/, "Password needs a digit");

export const registerSchema = z
    .object({
        name: z.string().trim().min(2, "Name too short").max(80),
        email,
        password,
        phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Invalid mobile number").optional(),
        preferredLanguage: z.enum(["en", "hi", "mr"]).optional(),
    })
    .strict();

export const loginSchema = z
    .object({
        email,
        password: z.string().min(1, "Password required").max(72),
    })
    .strict();