import { Paper, CircularProgress, Grid, Button, IconButton, Tooltip, Divider } from '@material-ui/core';
import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles, Typography } from '@material-ui/core';
import TaskDetail from './TaskDetail';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDialog from './ConfirmDialog';
import { deleteTask } from '../api/taskApi';
import { useSnackbar } from 'notistack';
import { removeTask } from '../actions/task';

const useStyles = makeStyles({
    container: {
        marginLeft: "auto",
        marginRight: "auto",
        width: "30em"
    },
    task: {
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "grey"
        },
    }
})

const TaskList = ({ isLoading, tasks, error }) => {
    const [showDetail, setShowDetail] = useState(false);
    const [currentTask, setCurrentTask] = useState(null)
    const [showConf, setShowConf] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()

    const handleDeleteTask = () => {
        if (currentTask) {
            deleteTask(currentTask)
                .then((response) => {
                    dispatch(removeTask(response.data))
                    enqueueSnackbar("Task deleted!", {
                        variant: "success",
                    });
                })
                .catch((error) => {
                    enqueueSnackbar(error, {
                        variant: "error",
                    });
                })
        }
        setShowConf(false)
    }

    const classes = useStyles()
    if (error) {
        return <p>Unable to load data</p>
    }

    if (isLoading) {
        return <CircularProgress />
    }

    return (
        <div className={classes.container}>
            <Typography variant={'h3'}>To-do List</Typography>
            <Divider /><br />
            <Button variant="contained" onClick={() => {
                setCurrentTask(null)
                setShowDetail(true)
            }}>Create new task</Button>
            {tasks.map((task) => (
                <div key={task?._id}>
                    <Grid container spacing={1}>
                        <Grid item xs={1}>
                            <Tooltip title={'Remove Task'}>
                                <IconButton style={{ marginTop: "0.75em" }}
                                    onClick={() => {
                                        setCurrentTask(task)
                                        setShowConf(true)
                                    }}>
                                    <DeleteIcon fontSize='small' />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={11}>
                            <Paper className={classes.task} onClick={() => {
                                setCurrentTask(task)
                                setShowDetail(true)
                            }}>
                                <Grid style={{ margin: "1em" }} container spacing={2}>
                                    <Grid item xs={10}>
                                        {task?.name}
                                    </Grid>
                                    <Grid item xs={2}>
                                        {task?.isComplete ? <CheckCircleIcon style={{ color: "green" }} /> : <WarningIcon style={{ color: "yellow" }} />}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            ))}
            <TaskDetail
                task={currentTask}
                showDetail={showDetail}
                setShowDetail={setShowDetail} />
            <ConfirmDialog
                handleYes={() => handleDeleteTask()}
                showConf={showConf}
                setShowConf={setShowConf} />
        </div>
    );
};


const mapStateToProps = (state) => ({
    isLoading: state.isLoading,
    tasks: state.tasks,
    error: state.error
});

export default connect(mapStateToProps)(TaskList);