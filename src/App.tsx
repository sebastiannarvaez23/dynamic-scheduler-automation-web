import { Fragment } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import TaskingPage from './features/execution/tasking/pages/Tasking.page';
import HistoryPage from './features/execution/history/pages/History.page';

import './App.css';
import "react-datepicker/dist/react-datepicker.css";

function App() {

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/tasking" replace />} />
        <Route path="/tasking" element={<TaskingPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Fragment>
  );
};

export default App;
