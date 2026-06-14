import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import Customers from "./pages/Customers/Customers";
import Orders from "./pages/Orders/Orders";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Reports from "./pages/Reports/Reports";
import Settings from "./pages/Settings/Settings";

function App() {
  return (
    <Routes>

      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* KORUNAN SAYFALAR */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />


        <Route path="products" element={<Products />} />
        <Route path="customers" element={<Customers />} />
        <Route path="orders" element={<Orders />} />

        <Route path="reports" element={<Reports />} />
        <Route
          path="settings"
          element={<Settings />}
        />
      </Route>

    </Routes>
  );
}

export default App;