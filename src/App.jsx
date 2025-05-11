import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";

const AppLayout = () => {
  return (
    <div className="flex h-screen ">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 overflow-y-auto">
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
          {/* <Route path="created" element={<About />} />
          <Route path="pending" element={<Contact />} />
          <Route path="disabled" element={<Pending />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
