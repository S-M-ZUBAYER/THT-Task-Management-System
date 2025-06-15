import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useUserData } from "./hook/useUserData";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import EmployeePage from "./pages/EmployeePage";
import TaskPage from "./pages/TaskPage";
import BugManagement from "./pages/BugManagement";
import SingleTaskPage from "./pages/SingleTaskPage";
import TaskReport from "./pages/TaskReport";
import BugDetailsPage from "./pages/BugDetailsPage";
import SignInPage from "./pages/SignInPage";
import Animated404 from "./components/404";
import ReportsPage from "./pages/ReportsPage";

const AppLayout = () => {
  return (
    <div className="flex h-screen">
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

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUserData();

  if (loading) return null; // or <LoadingSpinner />
  if (!user) return <Navigate to="/sign-in" replace />;

  return children;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useUserData();

  if (loading) return null; // or <LoadingSpinner />
  if (user) return <Navigate to="/" replace />;

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="employees" element={<EmployeePage />} />
          <Route path="tasks" element={<TaskPage />} />
          <Route path="bugs" element={<BugManagement />} />
          <Route path="task-details" element={<SingleTaskPage />} />
          <Route path="task-report" element={<TaskReport />} />
          <Route path="bug-details" element={<BugDetailsPage />} />
          <Route path="Reports" element={<ReportsPage />} />
          <Route path="*" element={<Animated404 />} />
        </Route>

        <Route
          path="/sign-in"
          element={
            <PublicRoute>
              <SignInPage />
            </PublicRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
