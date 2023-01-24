import { createContext } from "react";
import moment from "moment";

export interface Period {
    name: string,
    start: moment.Moment,
    end: moment.Moment
}

export interface Periods extends Array<Period> { }

export const ScheduleContext = createContext<Periods>([
    {
        end: moment("1970-01-01 08:41"),
        name: "Period 1",
        start: moment("1970-01-01 08:00")
    },
]);
