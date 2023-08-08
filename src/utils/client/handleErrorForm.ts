import { type SafeParseReturnType } from "zod";

export const handleErrorForm = <I, O>(zodReturn: SafeParseReturnType<I, O>) => {
  if (zodReturn.success) {
    return { success: zodReturn.success };
  } else {
    return {
      success: zodReturn.success,
      errors: zodReturn.error.issues.map((i) => ({
        path: i.path[0]?.toString() ?? "",
        error: i.message,
      })),
    };
  }
};
