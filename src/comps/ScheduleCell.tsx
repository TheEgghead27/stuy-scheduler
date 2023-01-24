import {FC} from "react";
import {Period} from "../context/ScheduleContext";
import {TimePicker} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";

const ScheduleCell: FC<Period> = (period) => {
    return (
        <div>
            <div>{period.name}</div>
            <div>{period.start.format()}</div>
            <div>{period.end.format()}</div>
            <TimePicker
                onChange={change => {return 0}}
                value={period.start}
                renderInput={params => <TextField {...params} />}
            />
        </div>

    )
};

export default ScheduleCell;
