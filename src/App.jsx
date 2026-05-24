import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";

// mock dashboard for test mock login first page
const MockDashboard = () => (
    <div className="p-8 text-center mt-20">
        <h1 className="text-2xl font-bold">Welcome back, young padawan</h1>
        <p>Routing and Context work well with the Force user!</p>
    </div>
);
function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* public routes */}
                    <Route path="/login" element={<Login />} />

                    {/* protected routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route
                            path="/"
                            element={<Navigate to="/dashboard" replace />}
                        />
                        <Route path="/dashboard" element={<MockDashboard />} />
                    </Route>

                    {/* fallback routes */}
                    <Route
                        path="*"
                        element={<Navigate to="/login" replace />}
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
