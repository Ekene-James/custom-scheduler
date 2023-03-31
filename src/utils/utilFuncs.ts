import moment from "moment";
import { ApiDataObject, GroupByType, TimeType } from "utils/types";
import { borderTopColors, cellHeight, cellWidth } from "./staticData";
/**
 * Function to get days of the week from a particular date,
 * Which defaults to todays date
 * @param currentdate
 * @returns Array of dates
 */
export function daysOfThWeek(currentdate: Date = new Date()): Date[] {
  let week = [];
  const current = new Date(currentdate);

  // Set the current date to the first day (Sunday) of the week by subtracting the day of the week (0 for Sunday, 1 for Monday, etc.) from the date.
  current.setDate(current.getDate() - current.getDay());

  for (let i = 0; i < 7; i++) {
    week.push(new Date(current));

    // Move to the next day by incrementing the date by 1
    current.setDate(current.getDate() + 1);
  }

  return week;
}

/**
 * Function that returns array of shifts for a particular date 'weekDay'
 * and hour
 *
 * @param apiData
 * @param weekDay
 * @param time
 * @returns Array of ApiDataObject
 */
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

/**
 * Function that return an array of shifts
 * in which the start time hour matches a particular hour
 *
 * @param interval
 * @param shifts
 * @returns Array of ApiDataObject
 */
export function findDateTime(
  interval: number,
  shifts: ApiDataObject[]
): ApiDataObject[] {
  if (shifts?.length) {
    const shift = shifts.filter((shift) => {
      const apiTime = shift.startTime.split(":");

      const hour = +apiTime[0];

      return hour === interval;
    });

    return shift;
  }
  return [];
}

/**
 * Function that returns array of shifts for a particular date 'day' only
 * @param apiData
 * @param day
 * @returns Array of ApiDataObject
 */
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

/**
 * A function that returns a random hex color string from an array of hex colors 'borderTopColors'
 * @returns string
 */
export const randomBorderTopColor = (): string => {
  const max: number = 3;
  const min: number = 0;
  // Random numbers between 0-3
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

  return borderTopColors[randomNum];
};

/**
 * A function that returns the height of cell between two intervals using the startTime and endTime parameters
 * @description
 * Here the default cell height between two intervals like 9:00 and 10:00 is 140px
 * @param day
 * @returns number
 */
export const getAppointmentCellHeight = (day: ApiDataObject): number => {
  const start = day?.startTime.split(":");
  const startHour = +start[0];

  const end = day?.endTime.split(":");
  const endHour = +end[0];
  const endMin = +end[1];

  // if 60 mins is 140px, then 1 minute = 2.33px approx
  const minuteLength = endMin * 2.33;

  const hourDifference = endHour - startHour;
  let duration = 0;
  if (hourDifference < 1) duration = cellHeight + minuteLength;

  duration = hourDifference * cellHeight + minuteLength;

  return duration;
};

/**
 * A function that returns cell width for day view
 * @param shifts
 * @returns number
 */
export const getCellWidth = (shifts: ApiDataObject[]): number => {
  let shift: any = {};
  let longestHour = 0;

  /**
   * Among the list of shifts with same start time, get the one that has the longest interval
   */
  shifts.forEach((shft) => {
    const endHour = shft.endTime.split(":")[0];
    if (+endHour > longestHour) {
      longestHour = +endHour;
      shift = shft;
    }
  });

  //The width is for 30mins, so 1 hour will be *2
  const realCellWidth = cellWidth * 2;

  const start = shift?.startTime?.split(":");
  const end = shift?.endTime?.split(":");

  const startHour = +start[0];

  const endHour = +end[0];
  const endMins = +end[1];

  // if 30 mins is 150px, then 1 minute = 5px
  const minuteWidth = endMins * 5;

  const hourDifference = endHour - startHour;
  let duration = 0;

  //if start time and end time is same hour, return realCellWidth + the minute width
  if (hourDifference < 1) duration = realCellWidth + minuteWidth;

  duration = hourDifference * realCellWidth + minuteWidth;

  return duration;
};

/**
 * Function that gets all Days in a month
 *
 * @param month
 * @param year
 * @returns Array of Dates
 */
export const getdaysInAMonth = (month: number, year: number): Date[] => {
  const date = new Date(year, month, 1);
  let days = [];

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
};

/**
 * Function that returns the days in a particular month, to fill a 7*5 matrix view
 * @description
 * The 7 represents 7 days in a week, and 5=5 weeks of a monthly calender,
 * With the function filling out the missing days that will arise, either at the start of the view,
 * at the end, or both since a month is approximately 4 weeks
 * @param month
 * @param year
 * @returns Array of Dates
 */
export const fillMissingDaysInMonth = (month: number, year: number): Date[] => {
  let cureentMonthArr = getdaysInAMonth(month, year);

  //if month == jan, month params(previous month) will be dec i.e.=11, and year params will be prev year
  const previousMonthArr = getdaysInAMonth(
    month === 0 ? 11 : month - 1,
    month === 0 ? year - 1 : year
  );

  //if month == december, month params(next month) will be jan i.e.=1, and year params will be next year
  const nextMonthArr = getdaysInAMonth(
    month === 11 ? 0 : month + 1,
    month === 11 ? year + 1 : year
  );
  const firstDayOfCurrentMonth = cureentMonthArr[0].getDay();
  const lastDayOfCurrentMonth =
    cureentMonthArr[cureentMonthArr.length - 1].getDay();

  //If first day of current month is 0 i.e Sunday, then there shoud'nt be a previous month
  //i.e it is a perfect 7*5 monthly view from the beginning
  //else, return the number of days missing(gotten from the prev month), if you start count from sunday
  // Example, if new month starts from Wednesday, then the number of days to be gotten from the previous month will be 3 to fill the missing slots
  const previousMonth =
    firstDayOfCurrentMonth === 0
      ? []
      : previousMonthArr.slice(firstDayOfCurrentMonth * -1);

  //For missing days added from the next month, get the missing days starting from the lastDayOfCurrentMonth
  const nextMonth = nextMonthArr.slice(0, 6 - lastDayOfCurrentMonth);

  //Add previous month and next month to the current month and return
  cureentMonthArr = previousMonth.concat(cureentMonthArr);
  cureentMonthArr = cureentMonthArr.concat(nextMonth);

  return cureentMonthArr;
};

/**
 * A function that returns a formatted date string from a millitary time format using momentJs
 * @param input
 * @returns A date String
 */
export const convertFromMilitaryTime = (input: string): string => {
  return moment(input, "HH:mm").format("h:mm A");
};

/**
 * A function that groups an array into categories from the 'name' property
 *
 * @param data
 * @param name
 * @returns object
 */
export const groupBy = (data: any[], name: string): GroupByType =>
  data.reduce((x, y) => {
    (x[y[name]] = x[y[name]] || []).push(y);
    return x;
  }, {});

/**
 * Function that returns shifts of a particular day (currentDay parameter)
 * @param currentDay
 * @param shifts
 * @returns array of ApiDataObject
 */
export const currentDayShift = (
  currentDay: number,
  shifts: ApiDataObject[]
): ApiDataObject[] => {
  return shifts.filter((shift) => {
    const apiDay = new Date(shift.startDate).getDate();
    return apiDay === currentDay;
  });
};
