import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context
import { AuthProvider } from './context/AuthContext';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Page Components
import Home from './Pages/Home';
import WorkspaceListing from './Pages/workspaceListing';
import WorkspaceDetails from './Pages/WorkspaceDetails';
import BookingPage from './Pages/Bookingpage';
import Confirmation from './Pages/Confirmation';
import AboutUs from './Pages/Aboutus';
import Auth from './Pages/Auth';
import ContactUs from './Pages/Contactus';


function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-layout">
          <Navbar />
          
          <main className="app-main">
            <Routes>
              {/* Home Page */}
              <Route path="/" element={<Home />} />
              
              {/* Workspace Pages */}
              <Route path="/workspaces" element={<WorkspaceListing />} />
              <Route path="/workspace/:id" element={<WorkspaceDetails />} />
              
              {/* Booking Flow - PROTECTED: requires login */}
              <Route
                path="/book/:id"
                element={
                  <ProtectedRoute>
                    <BookingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/confirmation"
                element={
                  <ProtectedRoute>
                    <Confirmation />
                  </ProtectedRoute>
                }
              />
              
              {/* Information Pages */}
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              
              {/* Authentication */}
              <Route path="/auth" element={<Auth />} />
              
              {/* 404 Fallback */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;