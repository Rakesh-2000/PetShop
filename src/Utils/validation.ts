import { z } from 'zod';

export const petSchema = z.object({
  name: z
    .string({ required_error: 'Pet name is required' })
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name too long'),

  breed: z
    .string({ required_error: 'Breed is required' })
    .min(2, 'Breed must be at least 2 characters')
    .max(50, 'Breed too long'),

  age: z
    .string({ required_error: 'Age is required' })
    .regex(/^\d+$/, 'Age must be a number')
    .refine((val) => parseInt(val) >= 0 && parseInt(val) <= 30, {
      message: 'Age must be between 0 and 30',
    }),

  price: z
    .string({ required_error: 'Price is required' })
    .regex(/^\d+(\.\d{1,2})?$/, 'Enter a valid price (e.g. 500)')
    .refine((val) => parseFloat(val) > 0, { message: 'Price must be greater than 0' }),
});

export type PetFormData = z.infer<typeof petSchema>;

export type FormErrors = Partial<Record<keyof PetFormData, string>>;

export const validatePetForm = (
  data: PetFormData,
): { success: true } | { success: false; errors: FormErrors } => {
  const result = petSchema.safeParse(data);
  if (result.success) return { success: true };

  const errors: FormErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof PetFormData;
    if (!errors[key]) errors[key] = issue.message;
  }
  return { success: false, errors };
};
