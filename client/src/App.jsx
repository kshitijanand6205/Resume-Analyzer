import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Analyze from "./pages/Analyze";
import ProtectedRoute from "./auth/ProtectedRoute";
import "./App.css";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analyze"
            element={
              <ProtectedRoute>
                <Analyze />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./auth/AuthContext";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Analyze from "./pages/Analyze";
// import ProtectedRoute from "./auth/ProtectedRoute";

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>

//           {/* Default route */}
//           <Route path="/" element={<Navigate to="/dash" replace />} />

//           {/* Public routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Protected routes */}
//           <Route
//             path="/analyze"
//             element={
//               <ProtectedRoute>
//                 <Analyze />
//               </ProtectedRoute>
//             }
//           />

//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;