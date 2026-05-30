import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import MainLayout from "./components/layout/MainLayout";

import Login from "./pages/Login";
import ProductsPage from "./pages/Products";
import UsersPage from "./pages/Users";
import NotesPage from "./pages/Notes";

// mock pages
const Dashboard = () => (
    <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>
            Count Dooku's the great Jedi, even being a Sith one, he's still be
            great people.
        </p>
    </div>
);

const AdminElement = ({ children }) => {
    const { user } = useAuth();
    if (user?.role !== "admin") {
        return <Navigate to="/dashboard" replace />;
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
                            <Route
                                path="/"
                                element={<Navigate to="/dashboard" replace />}
                            />
                            <Route path="/dashboard" element={<Dashboard />} />
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
