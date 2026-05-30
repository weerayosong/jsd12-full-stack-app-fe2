import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import MainLayout from "./components/layout/MainLayout";

import Login from "./pages/Login";
import ProductsPage from "./pages/Products";
import UsersPage from "./pages/Users";
import NotesPage from "./pages/Notes";
import DashboardPage from "./pages/Dashboard";
import ProfilePage from "./pages/Profile";

const RootRedirect = () => {
    const { user } = useAuth();
    if (user?.role === "admin") {
        return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/profile" replace />;
};

const AdminElement = ({ children }) => {
    const { user } = useAuth();
    if (user?.role !== "admin") {
        return <Navigate to="/profile" replace />;
    }
    return children;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* public routes */}
                    <Route path="/login" element={<Login />} />

                    {/* protected routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<RootRedirect />} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <AdminElement>
                                        <DashboardPage />
                                    </AdminElement>
                                }
                            />
                            <Route
                                path="/products"
                                element={<ProductsPage />}
                            />
                            <Route
                                path="/users"
                                element={
                                    <AdminElement>
                                        <UsersPage />
                                    </AdminElement>
                                }
                            />
                            <Route
                                path="/notes"
                                element={
                                    <AdminElement>
                                        <NotesPage />
                                    </AdminElement>
                                }
                            />
                        </Route>
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
