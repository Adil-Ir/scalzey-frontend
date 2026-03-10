import * as yup from "yup";

/** Shared profile form validation — used by Edit Profile and Onboarding Profile */
export type ProfileFormValues = {
  name: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  aboutMe: string;
  avatarUrl: string | null;
  roles: string[];
};

const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

export const profileSchema: yup.ObjectSchema<ProfileFormValues> = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  phone: yup.string().optional().default(""),
  location: yup.string().optional().default(""),
  website: yup
    .string()
    .optional()
    .test("url", "Enter a valid URL", (val) => !val || val === "" || urlRegex.test(val)),
  aboutMe: yup.string().optional().default(""),
  avatarUrl: yup.string().nullable().optional().default(null),
  roles: yup.array().of(yup.string()).optional().default([]),
});
