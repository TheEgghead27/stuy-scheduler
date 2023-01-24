import React from 'react';
import {Periods, ScheduleContext} from "../context/ScheduleContext";
import ScheduleCell from "./ScheduleCell";
import moment from "moment/moment";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";

const Form = () => {
    const schedule = React.useContext(ScheduleContext) as Periods;
    return (
        <div>
            {schedule.map(cell => <ScheduleCell {...cell}/>)}
        </div>
    )
}

const ScheduleForm = () => {
    const [formData, setFormData] = React.useState([
        {
            name: "Period 1",
            start: moment("1970-01-01 08:00"),
            end: moment("1970-01-01 08:41")
        },
        {
            name: "Period 2",
            start: moment("1970-01-01 08:45"),
            end: moment("1970-01-01 09:21")
        }
    ]);
    console.log(formData);
    return (<div>
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <ScheduleContext.Provider value={formData}>
                <Form />
            </ScheduleContext.Provider>
        </LocalizationProvider>
    </div>);
};

export default ScheduleForm;