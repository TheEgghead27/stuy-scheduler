import { Periods } from "./ScheduleContext";

interface AndyFinPeriod {
    start: string,
    end: string,
    name: string
}

interface AndyFinPeriods extends Array<AndyFinPeriod> { }

const AndyFin = (schedule: Periods) => {
    const sophomore = [{
        name: "Regular",
        segments: [] as AndyFinPeriods
    }];
    for (let i in schedule) {
        const period = schedule[i];
        const segments = sophomore[0].segments;
        if (i !== "0") {
            let passing = segments[segments.length - 1];
            passing.end = period.start.clone().subtract(1, 's').format("HH:mm:ss");
            if (passing.name.startsWith("Period ") && period.name.startsWith("Period "))
                passing.name = `Periods ${passing.name.substring(7)}-${period.name.substring(7)} Passing`;
            else
                passing.name = `${passing.name}-${period.name} Passing`;
            sophomore[0].segments.splice(segments.length - 1, 1, passing);
        }
        else {
            sophomore[0].segments.push({
                start: "00:00:00",
                end: period.start.clone().subtract(1, 'second').format("HH:mm:ss"),
                name: "Before School",
            })
        }

        sophomore[0].segments.push({
            start: period.start.format("HH:mm:00"),
            end: period.end.format("HH:mm:00"),
            name: period.name,
        })

        // passing period
        sophomore[0].segments.push({
            start: period.end.format("HH:mm:01"),
            // placeholders
            end: "HH:mm:59",
            name: period.name,
        })
    }
    if (sophomore[0].segments.length >= 3) {
        const after = sophomore[0].segments.pop() as AndyFinPeriod;
        after.name = "After School";
        after.end = "23:59:59";
        sophomore[0].segments.push(after);
    }
    return sophomore;
}

export default AndyFin;
