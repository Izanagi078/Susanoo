const { z } = require("zod");

const registerSchema = z.object({
  body: z.object({
    fullName: z.string().trim().min(1, "Full name is required"),
    email: z.string().trim().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    profileImageUrl: z.string().optional(),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
  }),
});

const addExpenseSchema = z.object({
  body: z.object({
    category: z.string().trim().min(1, "Category is required"),
    amount: z.coerce.number().positive("Amount must be a positive number"),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date string" }),
    icon: z.string().optional(),
  }),
});

const addIncomeSchema = z.object({
  body: z.object({
    source: z.string().trim().min(1, "Source is required"),
    amount: z.coerce.number().positive("Amount must be a positive number"),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date string" }),
    icon: z.string().optional(),
  }),
});

const updateProfileSchema = z.object({
  body: z.object({
    fullName: z.string().trim().min(1, "Full name is required").optional(),
    password: z.string().min(6, "Password must be at least 6 characters long").optional(),
    profileImageUrl: z.string().optional(),
    email: z.string().optional(),
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
  addExpenseSchema,
  addIncomeSchema,
  updateProfileSchema,
};
