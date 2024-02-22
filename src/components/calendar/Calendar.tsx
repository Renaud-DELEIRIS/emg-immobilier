import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { useEffect, useState, type FC, type ReactNode } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const hours: string[] = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
];

const Calendar: FC<Props> = ({ value, onChange }) => {
  const date = new Date(value);
  const [month, setMonth] = useState<number>(date.getMonth());
  const [year, setYear] = useState<number>(date.getFullYear());
  const [hour, setHour] = useState<number>(0);
  const [days, setDays] = useState<ReactNode[]>([]);
  const { t } = useTranslation("common");
  const months = new Array(12)
    .fill("")
    .map((_, i) => t(`CALENDAR_MONTH_${i + 1}`));

  const today = new Date();

  useEffect(() => {
    if (
      date.getHours() >= 20 ||
      (date.getHours() >= 19 && date.getMinutes() >= 30)
    ) {
      setHour(0);
      const newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1,
        8
      );
      onChange(newDate.toISOString());
      setMonth(newDate.getMonth());
      setYear(newDate.getFullYear());
    } else {
      const date: Date[] = hours.map((hour) => {
        const [hours, minutes] = hour.split(":") as [string, string];
        return new Date(
          year,
          month,
          new Date().getDate(),
          parseInt(hours),
          parseInt(minutes)
        );
      });
      const index = date.findIndex(
        (d) => d.getTime() > today.getTime() + 30 * 60 * 1000
      );
      setHour(index === -1 ? 0 : index);
    }
  }, []);

  useEffect(() => {
    createDays();
  }, [month, year, value]);

  const isDisabledHour = (hour: number) => {
    const hourString = hours[hour] as string;
    const day = new Date(
      year,
      month,
      date.getDate(),
      parseInt(hourString.split(":")[0] as string),
      parseInt(hourString.split(":")[1] as string)
    );
    return day.getTime() < new Date().getTime();
  };

  const createDays = () => {
    const days: ReactNode[] = [];

    // Create elements for previous month days
    // Know that my calendar starts on Monday
    const firstDay = new Date(year, month, 1).getDay();
    const previousMonth = new Date(year, month, 0).getDate();
    // Alwais have 6 rows
    const previousMonthDays = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < previousMonthDays; i++) {
      days.push(
        <time
          key={Math.random().toString(36)}
          className="text-center text-[13px] font-normal text-grey"
          dateTime={`${year}-${month - 1}-${previousMonth - i}`}
        >
          {previousMonth - i}
        </time>
      );
    }
    days.reverse();

    // Create elements for current month days
    const currentMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= currentMonth; i++) {
      const today = new Date();
      const newDate = new Date(year, month, i);
      // Create a variable isDayPassed that is true if it's a day before today or if it's today but we passed 19:30
      const isDayPassed =
        newDate.getTime() + 24 * 60 * 1000 * 60 < today.getTime() ||
        (newDate.getDate() === today.getDate() &&
          newDate.getMonth() === today.getMonth() &&
          newDate.getFullYear() === today.getFullYear() &&
          today.getHours() >= 19 &&
          today.getMinutes() >= 30);

      const isSaturdayOrSunday =
        newDate.getDay() === 0 || newDate.getDay() === 6;

      // is selected is true if day is today
      const isSelected =
        new Date(year, month, i).getDate() === date.getDate() &&
        new Date(year, month, i).getMonth() === date.getMonth() &&
        new Date(year, month, i).getFullYear() === date.getFullYear();
      days.push(
        <button
          key={Math.random().toString(36)}
          className={`text-center text-[13px] font-normal ${
            isDayPassed || isSaturdayOrSunday
              ? "text-grey"
              : isSelected
              ? "rounded-full bg-primary text-white"
              : "text-black"
          }`}
          onClick={() => {
            onChange(new Date(year, month, i).toISOString());
          }}
          disabled={isDayPassed || isSaturdayOrSunday}
        >
          <time dateTime={`${year}-${month}-${i}`}>{i}</time>
        </button>
      );
    }

    // Create elements for next month days
    // Know that my calendar starts on Monday
    // If only 5 rows, add 7 empty days starting from last day of next month
    const nextMonthDays = 42 - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push(
        <time
          key={Math.random().toString(36)}
          className="text-center text-[13px] font-normal text-grey"
          dateTime={`${year}-${month + 1}-${i}`}
        >
          {i}
        </time>
      );
    }

    setDays(days);
  };

  const isPreviousMonthDisabled = () => {
    return (
      new Date(year, month, 1).getTime() < today.getTime() &&
      new Date(year, month, 1).getMonth() === today.getMonth() &&
      new Date(year, month, 1).getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="w-full">
      <div className="flex w-full justify-around border-b border-grey/20 px-5 pb-[14px] text-dark">
        <button
          onClick={() => {
            setMonth(month - 1);
            if (month === 0) {
              setYear(year - 1);
              setMonth(11);
            }
          }}
          className="disabled:text-grey"
          disabled={isPreviousMonthDisabled()}
        >
          <IconChevronLeft size={20} />
        </button>
        <span className="flex-1 text-center">
          {months[month]} {year}
        </span>
        <button
          onClick={() => {
            setMonth(month + 1);
            if (month === 11) {
              setYear(year + 1);
              setMonth(0);
            }
          }}
        >
          <IconChevronRight size={20} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-x-5 gap-y-3 pt-3">
        {new Array(7).fill("").map((_, i) => (
          <div
            key={i}
            className=" text-center text-[15px] font-semibold text-grey"
          >
            {t(`CALENDAR_DAY_${i + 1}`)}
          </div>
        ))}
        {days}
      </div>
      <div className="mt-5 flex items-center justify-between">
        <button
          onClick={() => {
            const newHour = hour === 0 ? hours.length - 1 : hour - 1;
            const hourString = hours[newHour] as string;
            const newDate = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              parseInt(hourString.split(":")[0] as string),
              parseInt(hourString.split(":")[1] as string)
            );

            if (newDate.getTime() < today.getTime()) {
              onChange(newDate.toISOString());
            }
            setHour(newHour);
          }}
          className="disabled:text-grey"
        >
          <IconChevronLeft size={20} />
        </button>
        <div className="flex flex-1 items-center justify-around overflow-hidden">
          {hours
            .slice(
              hour === hours.length - 1
                ? hour - 4
                : hour === hours.length - 2
                ? hour - 3
                : hour === 0
                ? hour
                : hour === 1
                ? hour - 1
                : hour - 2,
              hour === 0 ? hour + 5 : hour === 1 ? hour + 4 : hour + 3
            )
            .map((hourString) => (
              <button
                key={hourString}
                className={`flex items-center justify-center p-1.5 text-xs disabled:text-grey md:p-2 md:text-sm ${
                  hourString === hours[hour]
                    ? "rounded-xl bg-primary text-white disabled:bg-primary/20"
                    : ""
                }`}
                disabled={isDisabledHour(hours.indexOf(hourString))}
                onClick={() => {
                  setHour(hours.indexOf(hourString));
                  onChange(
                    new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate(),
                      parseInt(hourString.split(":")[0] as string),
                      parseInt(hourString.split(":")[1] as string)
                    ).toISOString()
                  );
                }}
              >
                {hourString}
              </button>
            ))}
        </div>
        <button
          onClick={() => {
            const newHour = hour === hours.length - 1 ? 0 : hour + 1;
            const hourString = hours[newHour] as string;
            const newDate = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              parseInt(hourString.split(":")[0] as string),
              parseInt(hourString.split(":")[1] as string)
            );

            if (newDate.getTime() >= today.getTime()) {
              onChange(newDate.toISOString());
            }
            setHour(newHour);
          }}
        >
          <IconChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Calendar;
