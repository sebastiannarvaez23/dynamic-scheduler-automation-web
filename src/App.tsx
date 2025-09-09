import { Fragment } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import CompanyPage from './features/execution/company/pages/Company.page';
import HistoryPage from './features/execution/history/pages/History.page';
import TaskingPage from './features/execution/tasking/pages/Tasking.page';

import './App.css';
import "react-datepicker/dist/react-datepicker.css";

function App() {

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/tasking" replace />} />
        <Route path="/tasking" element={<TaskingPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/company" element={<CompanyPage />} />
      </Routes>
    </Fragment>
  );
};

export default App;
