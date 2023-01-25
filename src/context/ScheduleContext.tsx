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
