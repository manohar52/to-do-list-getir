import {
    Button,
    Dialog,
    DialogActions,
    DialogContent, DialogTitle, FormControlLabel, Switch, TextField
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewTask, updateTask } from '../api/taskApi';
import { useSnackbar } from 'notistack';
import { addNewTask, editTask } from '../actions/task';

const TaskDetail = ({ task, showDetail, setShowDetail }) => {
    const [taskName, setTaskName] = useState('')
    const [taskComplete, setTaskComplete] = useState(task?.isComplete || false)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (task) {
            setTaskName(task?.name)
            setTaskComplete(task?.isComplete)
        }
        else {
            setTaskName('')
            setTaskComplete(false)
        }
    }, [task])

    const handleUpdateTask = () => {
        if (taskName != '') {
            updateTask({ ...task, name: taskName, isComplete: taskComplete })
                .then((response) => {
                    dispatch(editTask(response.data))
                    setShowDetail(false)
                    enqueueSnackbar("Task updated!", {
                        variant: "success",
                    });
                })
                .catch((error) => {
                    enqueueSnackbar(error, {
                        variant: "error",
                    });
                })
        }
        else {
            enqueueSnackbar("Task Name is required", {
                variant: "error",
            });
        }
    }

    const handleCreateNewTask = () => {
        if (taskName != '') {
            createNewTask({ name: taskName, isComplete: taskComplete })
                .then((response) => {
                    dispatch(addNewTask(response.data))
                    setShowDetail(false)
                    enqueueSnackbar("Task created!", {
                        variant: "success",
                    });
                })
                .catch((error) => {
                    enqueueSnackbar(error, {
                        variant: "error",
                    });
                })
        }
        else {
            enqueueSnackbar("Task Name is required", {
                variant: "error",
            });
        }
    }
    return (
        <Dialog
            open={showDetail}
            onClose={() => setShowDetail(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle>Task Detail</DialogTitle>
            <DialogContent>
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="Task Name"
                        onChange={event => setTaskName(event.target.value)}
                        defaultValue={taskName} />
                    <br />
                    <br />
                    <div>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={taskComplete}
                                    onChange={() => setTaskComplete(!taskComplete)} />
                            }
                            label={"Complete"}
                            labelPlacement={"start"}
                        />
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                {task ?
                    <Button onClick={() => handleUpdateTask()}>Update</Button>
                    :
                    <Button onClick={() => handleCreateNewTask()}>Create</Button>}
            </DialogActions>
        </Dialog>
    );
};

export default TaskDetail;