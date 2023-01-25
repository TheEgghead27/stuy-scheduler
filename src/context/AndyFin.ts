import { Periods } from "./ScheduleContext";

interface AndyFinPeriod {
    start: string,
    end: string,
    name: string
}

const AndyFin = (name: string, schedule: Periods) : string => {
    const sophomore = {
        name,
        segments: [] as Array<AndyFinPeriod>
    };
    for (let i in schedule) {
        const period = schedule[i];
        const segments = sophomore.segments;
        if (i !== "0") {
            let passing = segments[segments.length - 1];
            passing.end = period.start.clone().subtract(1, 's').format("HH:mm:ss");
            if (passing.name.startsWith("Period ") && period.name.startsWith("Period "))
                passing.name = `Periods ${passing.name.substring(7)}-${period.name.substring(7)} Passing`;
            else
                passing.name = `${passing.name}-${period.name} Passing`;
            sophomore.segments.splice(segments.length - 1, 1, passing);
        }
        else {
            sophomore.segments.push({
                start: "00:00:00",
                end: period.start.format("HH:mm:ss"),
                name: "Before School",
            })
        }

        sophomore.segments.push({
            start: period.start.format("HH:mm:00"),
            end: period.end.format("HH:mm:00"),
            name: period.name,
        })

        // passing period
        sophomore.segments.push({
            start: period.end.format("HH:mm:01"),
            // placeholders
            end: "HH:mm:59",
            name: period.name,
        })
    }
    if (sophomore.segments.length >= 3) {
        const after = sophomore.segments.pop() as AndyFinPeriod;
        after.name = "After School";
        after.end = "23:59:59";
        sophomore.segments.push(after);
    }
    return JSON.stringify(sophomore, null, 2);
}

export default AndyFin;
