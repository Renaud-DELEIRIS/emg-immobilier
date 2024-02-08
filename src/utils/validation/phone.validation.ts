import { isValidPhoneNumber } from "libphonenumber-js";

export const isValidPhone = (phone: string | undefined) =>
  isValidPhoneNumber(phone ?? "");
