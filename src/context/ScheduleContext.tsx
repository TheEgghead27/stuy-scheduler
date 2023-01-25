import { createContext } from "react";
import moment from "moment";

export interface Period {
    name: string,
    start: moment.Moment,
    end: moment.Moment
}

export interface Periods extends Array<Period> { }

export interface IndexArg {
    index: number
}

export const ScheduleContext = createContext<Periods>([
    {
        name: "Period 1",
        end: moment("1970-01-01 08:41"),
        start: moment("1970-01-01 08:00")
    },
]);
