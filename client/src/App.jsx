import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/customer/Home";
import BookService from "./pages/customer/BookService";
import MyBookings from "./pages/customer/MyBookings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DriverManagement from "./pages/admin/DriverManagement";
import StaffManagement from "./pages/admin/StaffManagement";
import BookingManagement from "./pages/admin/BookingManagement";
import DriverDashboard from "./pages/driver/DriverDashboard";
import DriverJobs from "./pages/driver/DriverJobs";
import DriverProfile from "./pages/driver/DriverProfile";
import WorkerDashboard from "./pages/worker/WorkerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-service" element={<BookService />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/drivers" element={<DriverManagement />} />
        <Route path="/admin/staff" element={<StaffManagement />} />
        <Route path="/admin/bookings" element={<BookingManagement />} />

        <Route path="/driver" element={<DriverDashboard />} />
        <Route path="/driver/jobs" element={<DriverJobs />} />
        <Route path="/driver/profile" element={<DriverProfile />} />

        <Route path="/worker" element={<WorkerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;