import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getDatabase } from "firebase/database";
import app from "./firebase";
import { RecipeProvider } from "./context/RecipeContext";
import { AuthProvider } from "./context/AuthContext";
import Nav from "./Components/Nav";
import Home from "./Pages/Home";
import AboutUs from "./Pages/Aboutus";
import Recipes from "./Pages/Recipes";
import RecipeDetail from "./Pages/RecipeDetail";
import RecipeShare from "./Pages/RecipeShare";
import ContactUs from "./Pages/ContactUs";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import TermsOfConditions from "./Pages/TermsofCondition";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import ScrollToTop from "./Components/ScrollToTop";
import ProtectedRoute from "./Components/ProtectedRoute";

const db = getDatabase(app);

function App() {
  return (
    <AuthProvider>
      <RecipeProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="app-wrapper">
            <Nav />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/terms" element={<TermsOfConditions />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/recipes" element={<Recipes />} />
                  <Route path="/recipe/:id" element={<RecipeDetail />} />
                  <Route path="/share" element={<RecipeShare />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/edit-profile" element={<EditProfile />} />
                </Route>
                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </RecipeProvider>
    </AuthProvider>
  );
}

export default App;