import { z } from 'zod';

export const signInValidation = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
});

export const signUpValidation = z
  .object({
    fullName: z
      .string()
      .min(3, { message: 'Full name must be at least 3 characters.' })
      .max(100, { message: 'Full name must be at most 50 characters.' }),
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export const newsletterValidation = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
});

export const shippingInformationValidation = z.object({
  firstName: z
    .string()
    .min(3, { message: 'First name must be at least 3 characters.' }),
  lastName: z
    .string()
    .min(3, { message: 'Last name must be at least 3 characters.' }),
  address: z
    .string()
    .min(3, { message: 'Address must be at least 3 characters.' }),
  city: z.string().min(3, { message: 'City must be at least 3 characters.' }),
  state: z.string().min(2, { message: 'State must be at least 2 characters.' }),
  zip: z
    .string()
    .min(4, { message: 'ZIP code must be at least 4 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 characters.' }),
  notes: z.string().optional(),
});

export const accountUpdateValidation = z.object({
  fullName: z
    .string()
    .min(3, { message: 'First name must be at least 3 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }).optional(),
  phone: z.string().optional(),
});

export const passwordUpdateValidation = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' }),
    passwordConfirmation: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match.',
    path: ['passwordConfirmation'],
  });

export const forgotPasswordValidation = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
});

export const resetPasswordValidation = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' }),
    passwordConfirmation: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match.',
    path: ['passwordConfirmation'],
  });
