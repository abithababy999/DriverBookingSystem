import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/common/Login";
import Register from "./pages/common/Register";
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
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin', 'worker']}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book-service"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <BookService />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/drivers"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DriverManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/staff"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <StaffManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <BookingManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver"
          element={
            <ProtectedRoute allowedRoles={['worker']}>
              <DriverDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver/jobs"
          element={
            <ProtectedRoute allowedRoles={['worker']}>
              <DriverJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver/profile"
          element={
            <ProtectedRoute allowedRoles={['worker']}>
              <DriverProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/worker"
          element={
            <ProtectedRoute allowedRoles={['worker']}>
              <WorkerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;