import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import Loading from './pages/loading';
import Verification from './pages/verification';
import { AuthProvider, ProtectedRoute } from './context/auth';
import { ModalProvider } from './context/modal';
import Welcome from './pages/welcome';
import UserProfile from './pages/profilePage';
import Cohort from './pages/cohort';
import Search from './pages/search';

const App = () => {
  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="loading" element={<Loading />} />
            <Route path="verification" element={<Verification />} />

            <Route
              path="dashboard/search/:searchQuery"
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            />

            <Route
              path="dashboard/search/"
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            />

            <Route
              index
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cohort"
              element={
                <ProtectedRoute>
                  <Cohort />
                </ProtectedRoute>
              }
            />

            <Route
              path="welcome"
              element={
                <ProtectedRoute disabledNav={true}>
                  <Welcome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:profileId"
              element={
                <ProtectedRoute>
                  <UserProfile isEditMode={false} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:profileId/edit"
              element={
                <ProtectedRoute>
                  <UserProfile isEditMode={true} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ModalProvider>
      </AuthProvider>
    </>
  );
};

export default App;
