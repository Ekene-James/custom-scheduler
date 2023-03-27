import moment from "moment";
import { ApiDataObject, TimeType } from "utils/types";
import { borderTopColors, cellHeight, cellWidth } from "./staticData";

export function daysOfThWeek(currentdate: Date = new Date()): Date[] {
  let week = [];
  const current = new Date(currentdate);
  // Starting Monday not Sunday

  current.setDate(current.getDate() - current.getDay());

  for (let i = 0; i < 7; i++) {
    week.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return week;
}

export function findAppointmentDayAndTime(
  apiData: ApiDataObject[],
  weekDay: Date,
  time: TimeType
): [] | ApiDataObject[] {
  if (apiData?.length) {
    const shift = apiData.filter((shift) => {
      const currentdate = new Date(weekDay);
      const currentYr = currentdate.getFullYear();
      const currentMonth = currentdate.getMonth();
      const currentDay = currentdate.getDate();

      const apiDate = new Date(shift.startDate);

      const apiYr = apiDate.getFullYear();
      const apiMonth = apiDate.getMonth();
      const apiDay = apiDate.getDate();

      const apiTime = shift.startTime.split(":");

      const hour = +apiTime[0];

      return (
        apiYr === currentYr &&
        apiMonth === currentMonth &&
        apiDay === currentDay &&
        hour === time.militaryTime
      );
    });

    return shift;
  }
  return [];
}

export function findDateTime(
  interval: number,
  shifts: ApiDataObject[]
): ApiDataObject[] {
  if (shifts?.length) {
    const shift = shifts.filter((shift) => {
      const apiTime = shift.startTime.split(":");

      const hour = +apiTime[0];
      // let mins = +apiTime[1];

      // if (mins <= 29) mins = 0;
      // if (mins >= 30) mins = 30;
      // const timeStr = `${hour}.${mins}`;
      // const time = Number(timeStr);

      return hour === interval;
    });

    return shift;
  }
  return [];
}
export function findDayInMonth(
  apiData: Array<ApiDataObject>,
  day: Date
): Array<ApiDataObject> {
  if (apiData?.length) {
    const shift = apiData.filter((shift) => {
      const currentdate = new Date(day);
      const currentYr = currentdate.getFullYear();
      const currentMonth = currentdate.getMonth();
      const currentDay = currentdate.getDate();

      const apiDate = new Date(shift.startDate);

      const apiYr = apiDate.getFullYear();
      const apiMonth = apiDate.getMonth();
      const apiDay = apiDate.getDate();

      return (
        apiYr === currentYr &&
        apiMonth === currentMonth &&
        apiDay === currentDay
      );
    });

    return shift;
  }
  return [];
}

export const randomBorderTopColor = (): string => {
  const max: number = 3;
  const min: number = 0;
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

  return borderTopColors[randomNum];
};

export const getAppointmentCellHeight = (day: ApiDataObject): number => {
  let realCellHeight = cellHeight;
  const start = day?.startTime.split(":");
  const startHour = +start[0];
  const startMin = +start[1];
  const startTime = `${startHour}.${startMin}`;

  const end = day?.endTime.split(":");
  const endHour = +end[0];
  let endMin = +end[1];

  //make 30 mins = 0.5, i.e. 1 mins =0.17 approx
  endMin = Math.floor(0.17 * endMin);
  const endTime = `${endHour}.${endMin}`;

  const duration = Math.abs(+endTime - +startTime);

  if (duration) realCellHeight = cellHeight * duration;
  return realCellHeight;
};

export const getCellWidth = (shifts: ApiDataObject[]): number => {
  let shift: any = {};
  let longestHour = 0;
  shifts.forEach((shft) => {
    const endHour = shft.endTime.split(":")[0];
    if (+endHour > longestHour) {
      longestHour = +endHour;
      shift = shft;
    }
  });

  let realCellWidth = cellWidth * 2;
  const start = shift?.startTime?.split(":");
  const end = shift?.endTime?.split(":");

  const startHour = +start[0];
  const startMins = +start[1];
  const startTime = `${startHour}.${startMins}`;

  const endHour = +end[0];
  let endMins = +end[1];

  //make 30 mins = 0.5, i.e. 1 mins =0.17 approx
  endMins = Math.floor(0.17 * endMins);

  const endTime = `${endHour}.${endMins}`;

  const duration = Math.abs(Number(endTime) - Number(startTime));

  if (duration) {
    const durationWidth = Math.floor((duration * 60) / 30);

    realCellWidth = cellWidth + cellWidth * durationWidth;
  }
  return realCellWidth;
};
export const getdaysInAMonth = (month: number, year: number): Date[] => {
  const date = new Date(year, month, 1);
  let days = [];

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
};
export const fillMissingDaysInMonth = (month: number, year: number): Date[] => {
  let cureentMonthArr = getdaysInAMonth(month, year);

  //if month == jan, month params will be dec i.e.=11, and year params will be prev year
  const previousMonthArr = getdaysInAMonth(
    month === 0 ? 11 : month - 1,
    month === 0 ? year - 1 : year
  );

  //if month == december, month params will be jan i.e.=1, and year params will be next year
  const nextMonthArr = getdaysInAMonth(
    month === 11 ? 0 : month + 1,
    month === 11 ? year + 1 : year
  );
  const firstDayOfCurrentMonth = cureentMonthArr[0].getDay();
  const lastDayOfCurrentMonth =
    cureentMonthArr[cureentMonthArr.length - 1].getDay();
  const previousMonth =
    firstDayOfCurrentMonth === 0
      ? []
      : previousMonthArr.slice(firstDayOfCurrentMonth * -1);
  const nextMonth = nextMonthArr.slice(0, 6 - lastDayOfCurrentMonth);
  cureentMonthArr = previousMonth.concat(cureentMonthArr);
  cureentMonthArr = cureentMonthArr.concat(nextMonth);

  return cureentMonthArr;
};

export const convertFromMilitaryTime = (input: string): string => {
  return moment(input, "HH:mm").format("h:mm A");
};

export const groupBy = (data: any[], name: string) =>
  data.reduce((x, y) => {
    (x[y[name]] = x[y[name]] || []).push(y);
    return x;
  }, {});

export const currentDayShift = (
  currentDay: number,
  shifts: ApiDataObject[]
): ApiDataObject[] => {
  return shifts.filter((shift) => {
    const apiDay = new Date(shift.startDate).getDate();
    return apiDay === currentDay;
  });
};
