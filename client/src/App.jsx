import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import BookService from "./pages/BookService";
import AdminDashboard from "./pages/AdminDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-service" element={<BookService />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/worker" element={<WorkerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;