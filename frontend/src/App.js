import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import DashboardLayoutNavigationLinks from './components/Dashboard';
import { AuthProvider, useAuth } from './utils/authContext';  // Import AuthProvider
import './App.css';
import './index.css';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PublicRoute />
                        }
                    />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/login"
                        element={<Login />}
                    />
                    <Route
                        path="/logout"
                        element={<Logout />}
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

function PublicRoute() {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Navigate to="/dashboard" /> : <Login />;
}

function PrivateRoute() {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <DashboardLayoutNavigationLinks /> : <Navigate to="/login" />;
}

export default App;
