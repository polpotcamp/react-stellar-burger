
import HomePage from "./pages/HomePage";
import { OnlyAuth, OnlyUnAuth } from "./components/ProtectedRouteElement";
import SignInPage from "./pages/SignInPage";
import RegistrationPage from "./pages/RegistrationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import IngredientPage from "./pages/IngredientPage";
import React from "react"
import styles from "./App.module.css";
import Modal from "./components/Modal/Modal";
import IngredientDetails from "./components/IngredientDetails/IngredientDetails";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };
  return (
    <div className={styles.app} id="main">
      <Routes>
      </Routes>
      <Routes location={background || location}>
        <Route path='/' element={<HomePage  />} />
        <Route path= '/ingredients/:ingredientId'
          element={<IngredientPage />} />
                 <Route path="/login" element={<OnlyUnAuth component={<SignInPage />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<RegistrationPage />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
        <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />
      </Routes>
      {background && (
        <Routes>
	        <Route
	          path='/ingredients/:ingredientId'
	          element={
	            <Modal setActive={handleModalClose}>
	              <IngredientDetails />
	            </Modal>
	          }
	        />
        </Routes>
      )}
    </div>
  );
}

export default App;
