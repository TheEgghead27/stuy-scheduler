import { Component, FC, useState } from 'react';
import { IndexArg, Periods } from "../context/ScheduleContext";
import moment from "moment/moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from "@mui/x-date-pickers";
import { Alert, Button, IconButton, Snackbar, TextField } from "@mui/material";
import { AddCircle, Clear } from "@mui/icons-material";
import AndyFin from "../context/AndyFin";

class ScheduleForm extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            schedule: [{
                name: "Period 1",
                start: moment("1970-01-01 08:00"),
                end: moment("1970-01-01 08:41")
            }] as Periods,
            toastOpen: false
        };
    }

    appendPeriod(name: string, start: moment.Moment, end: moment.Moment) {
        this.setState(
            {
                schedule: [...this.state.schedule, {name, start, end}]
            }
        )
    }
    editPeriod(index: number, name: string, start: moment.Moment, end: moment.Moment) {
        const schedule = this.state.schedule;
        schedule[index] = {name, start, end};
        this.setState({
            schedule
        })
    }
    updatePName(index: number, name: string) {
        const period = this.state.schedule[index];
        this.editPeriod(index, name, period.start, period.end);
    }
    updatePStart(index: number, start: moment.Moment) {
        const period = this.state.schedule[index];
        this.editPeriod(index, period.name, start, start.clone().add(period.end.diff(period.start, 'minutes'), 'm'));
    }
    updatePEnd(index: number, end: moment.Moment) {
        const period = this.state.schedule[index];
        this.editPeriod(index, period.name, period.start, end);
        return end.isAfter(period.start) ? "" : "End time must be after start time.";
    }
    removePeriod(index: number) {
        const schedule = this.state.schedule;
        if (schedule.length === 1) return;
        schedule.splice(index, 1);
        this.setState({
            schedule
        })
    }

    generate(schedule: Periods) {
        return AndyFin(schedule);
    }

    ScheduleCell: FC<IndexArg> = (props) => {
        const period = this.state.schedule[props.index];
        const [endHelper, setEndHelper] = useState<string>("");
        return (
            <div>
                <TextField
                    label="Period"
                    variant="filled"
                    value={period.name}
                    onChange={event => {
                        this.updatePName(props.index, event.target.value);
                    }}
                />
                <TimePicker
                    label="Start"
                    value={period.start}
                    onChange={value => {
                        this.updatePStart(props.index, value);
                    }}
                    renderInput={params => <TextField variant="filled" {...params} />}
                />
                <TimePicker
                    label="End"
                    value={period.end}
                    minTime={period.start.clone().add(1, 'm')}
                    onChange={value => {
                        setEndHelper(this.updatePEnd(props.index, value));
                    }}
                    renderInput={params => <TextField variant="filled" helperText={endHelper} {...params} />}
                />
                <IconButton
                    aria-label={`remove ${period.name}`}
                    disabled={this.state.schedule.length === 1}
                    onClick={() => this.removePeriod(props.index)}
                >
                    <Clear />
                </IconButton>
            </div>

        )
    };

    render() {
        const toggleClose = () => this.setState({toastOpen: !this.state.toastOpen});
        return (
            <LocalizationProvider dateAdapter={AdapterMoment}>
                {Object.keys(this.state.schedule).map((cell: string) =>
                    <this.ScheduleCell key={cell} index={parseInt(cell)}/>
                )}
                <IconButton
                    aria-label="add a period"
                    onClick={
                        () => this.appendPeriod(
                            "Period X",
                            this.state.schedule[this.state.schedule.length - 1].start.clone().add(46, 'm'),
                            this.state.schedule[this.state.schedule.length - 1].end.clone().add(46, 'm')
                        )
                    }
                >
                    <AddCircle />
                </IconButton>
                <Button variant="contained" onClick={async () => {
                    await navigator.clipboard.writeText(
                        JSON.stringify(this.generate(this.state.schedule), null, 2)
                    );
                    toggleClose();
                }}>
                    Generate
                </Button>
                <Snackbar open={this.state.toastOpen} autoHideDuration={5000} onClose={toggleClose}>
                    <Alert onClose={toggleClose} severity="success">
                        Copied to clipboard!
                    </Alert>
                </Snackbar>
            </LocalizationProvider>
        )
    }
}

export default ScheduleForm;