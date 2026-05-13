import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(2, "Name is required"),

  phone: z.string().min(10, "Phone is required"),

  email: z.string().email("Valid email is required"),

  address: z.string().min(5, "Address is required"),

  city: z.string().min(2, "City is required"),

  createAccount: z.boolean(),

  password: z.string().optional(),

  pay: z.literal("sslcommerz"),

  items: z.array(
    z.object({
      productId: z.string(),
      qty: z.number().min(1),
    })
  ),

  subtotal: z.number().positive(),
}).refine(
  (data) => {
    if (data.createAccount) {
      return data.password && data.password.length >= 6;
    }
    return true;
  },
  {
    message: "Password must be at least 6 characters",
    path: ["password"],
  }
);