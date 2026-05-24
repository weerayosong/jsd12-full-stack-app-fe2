import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import MainLayout from "./components/layout/MainLayout";

// mock dashboard for test mock login first page
// const MockDashboard = () => (
//     <div className="p-8 text-center mt-20">
//         <h1 className="text-2xl font-bold">Welcome back, young padawan</h1>
//         <p>Routing and Context work well with the Force user!</p>
//     </div>
// );
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
const Products = () => (
    <div>
        <h1 className="text-2xl font-bold">Products</h1>
        <p>Qui-Gon Jinn is the best.</p>
    </div>
);
const Users = () => (
    <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p>Anakin's cool, even cooler as Darth Vader.</p>
    </div>
);
const Notes = () => (
    <div>
        <h1 className="text-2xl font-bold">Notes</h1>
        <p>Ahsoka. the last one of this Great line, I'm no Jedi.</p>
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
                        <Route element={<MainLayout />}>
                            <Route
                                path="/"
                                element={<Navigate to="/dashboard" replace />}
                            />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/notes" element={<Notes />} />
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
