import './App.css';
import React from 'react'
import AppRouter from './AppRouter';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import { loadTasks } from './actions/task';
import { SnackbarProvider } from 'notistack';

store.dispatch(loadTasks())
function App() {
  return (
    <div>
      <Provider store={store}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}>
          <AppRouter />
        </SnackbarProvider>
      </Provider>
    </div>
  );
}

export default App;
