
import * as z from "zod";

// Define the schema for the checkout form
export const checkoutSchema = z.object({
  // Recipient type fields
  deliveryType: z.enum(["self", "other"]),
  
  // Self fields
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  
  // Alternative recipient fields (conditional)
  recipientFirstName: z.string().optional(),
  recipientLastName: z.string().optional(),
  recipientPhone: z.string().optional(),
  
  // Common address fields
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  postalCode: z.string().min(4, {
    message: "Postal code must be at least 4 digits.",
  }),
  deliveryNote: z.string().optional(),
  
  // Delivery type - updated to accept all three options
  deliverySpeed: z.enum(["standard", "express", "scheduled"]),
  
  // Optional field for scheduled delivery date
  deliveryDate: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

// Default form values
export const defaultFormValues = {
  deliveryType: "self" as const,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  recipientFirstName: "",
  recipientLastName: "",
  recipientPhone: "",
  address: "",
  city: "",
  postalCode: "",
  deliveryNote: "",
  deliverySpeed: "standard" as const,
  deliveryDate: "",
};
