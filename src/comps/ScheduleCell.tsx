import {FC} from "react";
import {Period} from "../context/ScheduleContext";
import {TimePicker} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";

const ScheduleCell: FC<Period> = (period) => {
    return (
        <div>
            <TextField label="Period" variant="filled" value={period.name}/>
            <TimePicker
                label="Start"
                onChange={change => {return 0}}
                value={period.start}
                renderInput={params => <TextField variant="filled" {...params} />}
            />
            <TimePicker
                label="End"
                onChange={change => {return 0}}
                value={period.end}
                renderInput={params => <TextField variant="filled" {...params} />}
            />
        </div>

    )
};

export default ScheduleCell;
