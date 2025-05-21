import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import EmployeePage from "./pages/EmployeePage";
import TaskPage from "./pages/TaskPage";
import BugManagement from "./pages/BugManagement";
import SingleTaskPage from "./pages/SingleTaskPage";
import TaskReport from "./pages/TaskReport";
import BugDetailsPage from "./pages/BugDetailsPage";

const AppLayout = () => {
  return (
    <div className="flex h-screen ">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 overflow-y-auto custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="employees" element={<EmployeePage />} />
          <Route path="tasks" element={<TaskPage />} />
          <Route path="bugs" element={<BugManagement />} />
          <Route path="task-details" element={<SingleTaskPage />} />
          <Route path="task-report" element={<TaskReport />} />
          <Route path="bug-details" element={<BugDetailsPage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
