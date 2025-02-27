import Home from "./pages/Home";
import { Navbar, Footer } from "./components/NavFooter";
import AuthForm from "./pages/Signup";
import Dashboard from "./pages/DashBoard";
import Verify_Signup from "./pages/Verify_Signup";
import Create_Capsule from "./pages/Create_Capsule";
import Success from "./pages/Success";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Import ProtectedRoute
import CapsuleDetails from "./pages/CapsuleDetails";
import Update_Capsule from "./pages/UpdateCapsule";
import FunZone from "./pages/FunZone";
import MemoryQuiz from "./pages/MemoryGame";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GuessTheAge from "./pages/GuessTheAge";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="bg-gray-900 text-cyan-300 min-h-screen">
          <Navbar />
          <Home />
          <Footer />
        </div>
      ),
    },
    {
      path: "/auth",
      element: (
        <div className="bg-gray-900 text-cyan-300 min-h-screen">
          <Navbar />
          <AuthForm />
          <Footer />
        </div>
      ),
    },
    {
      path: "/auth/signup/verify",
      element: (
        <div>
          <Navbar />
          <Verify_Signup />
          <Footer />
        </div>
      ),
    },
    {
      path: "/auth/success",
      element: (
        <div>
          <Navbar />
          <Success />
          <Footer />
        </div>
      ),
    },
    {
      path: "/dashboard", // ✅ Protecting Dashboard Route
      element: (
        <ProtectedRoute>
          <div>
            <Navbar />
            <Dashboard />
            <Footer />
          </div>
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard/capsule/:id", // ✅ Protecting Dashboard Route
      element: (
        <ProtectedRoute>
          <div>
            <Navbar />
            <CapsuleDetails />
            <Footer />
          </div>
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard/update-capsule/:id",
      element: (
        <ProtectedRoute>
          <div>
            <Navbar />
            <Update_Capsule />
            <Footer />
          </div>
        </ProtectedRoute>
      ),
    },
    {
      path: "/capsule/:id", // ✅ Fixing URL structure
      element: (
        <ProtectedRoute>
          <div>
            <Navbar />
            <CapsuleDetails />
            <Footer />
          </div>
        </ProtectedRoute>
      ),
    },
    {
      path: "/create_capsule", // ✅ Protecting Create Capsule too (if needed)
      element: (
        <ProtectedRoute>
          <div>
            <Navbar />
            <Create_Capsule />
            <Footer />
          </div>
        </ProtectedRoute>
      ),
    },
    {
      path: "/fun-zone", // ✅ Protecting Create Capsule too (if needed)
      element: (
        <div>
          <Navbar />
          <FunZone />
          <Footer />
        </div>
      ),
    },
    {
      path: "/fun-zone/memory-game", // ✅ Protecting Create Capsule too (if needed)
      element: (
        <div>
          <Navbar />
          <MemoryQuiz />
          <Footer />
        </div>
      ),
    },
    {
      path: "/fun-zone/guess-game", // ✅ Protecting Create Capsule too (if needed)
      element: (
        <div>
          <Navbar />
          <GuessTheAge />
          <Footer />
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
