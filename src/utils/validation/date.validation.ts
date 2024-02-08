import dayjs from "dayjs";

export type DateError =
  | "invalid"
  | "inFuture"
  | "inPast"
  | "isMajor"
  | "isMinor"
  | "today";

export const isValidDate = (
  dayjsDate: dayjs.Dayjs,
  opts: {
    inFuture?: boolean;
    inPast?: boolean;
    isMajor?: boolean;
    isMinor?: boolean;
    today?: boolean;
  } = {}
): DateError | undefined => {
  const { inFuture, inPast, isMajor, isMinor, today } = opts;
  const now = dayjs();

  if (!dayjsDate.isValid()) {
    return "invalid";
  }

  if (today && dayjsDate.isSame(now)) {
    return "today";
  }

  if (inFuture && dayjsDate.isBefore(now)) {
    return "inFuture";
  }

  if (inPast && dayjsDate.isAfter(now)) {
    return "inPast";
  }

  if (isMajor && now.diff(dayjsDate, "year") < 18) {
    return "isMajor";
  }

  if (isMinor && now.diff(dayjsDate, "year") >= 18) {
    return "isMinor";
  }
};
