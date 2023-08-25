import { parsePhoneNumber } from "libphonenumber-js";

export const formatTelephone = (p: string) => {
  try {
    const parsedPhoneNumber = parsePhoneNumber("+" + p);
    return parsedPhoneNumber.formatInternational();
  } catch (error) {
    return p;
  }
};
