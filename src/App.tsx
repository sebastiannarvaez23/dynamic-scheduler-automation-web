import { Fragment } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AlertListener from './core/listener/AlertListener';

import CompanyPage from './features/tenant/company/pages/Company.page';
import HelpPage from './features/other/help/page/Help.page';
import HistoryPage from './features/execution/history/pages/History.page';
import TaskingPage from './features/execution/task/pages/Tasking.page';

import './App.css';
import "react-datepicker/dist/react-datepicker.css";

function App() {

  return (
    <Fragment>
      <AlertListener />
      <Routes>
        <Route path="/" element={<Navigate to="/task" replace />} />
        <Route path="/task" element={<TaskingPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </Fragment>
  );
};

export default App;
