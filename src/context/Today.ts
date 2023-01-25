import { Periods } from "./ScheduleContext";

interface TodayPeriod {
    start: string,
    end: string,
    name: string
}

const Today = (schedule: Periods) : string => {
    const today = [] as Array<TodayPeriod>;
    for (let i in schedule) {
        const period = schedule[i];
        today.push({
            name: period.name,
            // including NBSP based on SQL export
            start: period.start.format(" h:mm A"),
            end: period.end.format("h:mm A"),
        })
    }
    return JSON.stringify(today);
}

export default Today;
