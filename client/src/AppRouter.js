import { createHashHistory } from 'history';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import TaskList from './components/TaskList';
import { useDispatch } from 'react-redux';

export const history = createHashHistory();
const AppRouter = () => {
    // const dispatch = useDispatch()
    // dispatch(loadTasks())

    return (
        < HashRouter history={history} >
            <div>
                <Switch>
                    <Route to="/" component={TaskList} exact />
                </Switch>
            </div>
        </HashRouter >
    )
}
export default AppRouter;