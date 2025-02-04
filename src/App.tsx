
import HomePage from "./pages/HomePage";
import { OnlyAuth, OnlyUnAuth } from "./components/ProtectedRouteElement";
import SignInPage from "./pages/SignInPage";
import RegistrationPage from "./pages/RegistrationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import IngredientPage from "./pages/IngredientPage";
import FeedPage from "./pages/FeedPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import OrderPage from "./pages/OrderPage";
import Order from "./components/Order/Order";
import React from "react"
import styles from "./App.module.css";
import Modal from "./components/Modal/Modal";
import { getApiData } from "./services/async/ApiData";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import getUserData from "./services/async/GetUserData";
import AppHeader from "./components/AppHeader/AppHeader";
function App() {
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const refreshToken = localStorage.getItem("refreshToken")
  const handleModalClose = () => {
    navigate(-1);
  };
  React.useEffect(() => {
    dispatch(getApiData())
    if (refreshToken !== null) {
      dispatch(getUserData())
    }
  }, [])
  return (
    <div className={styles.app} id="main">
      <AppHeader />
      <Routes>
        <Route path="/login" element={<OnlyUnAuth component={<SignInPage />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<RegistrationPage />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
        <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />
      </Routes>
      <Routes location={background || location}>
        <Route path="/profile/orders" element={<OnlyAuth component={<OrderHistoryPage />} />} />
        <Route path="/profile/orders/:number" element={<OnlyAuth component={<OrderPage />} />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/ingredients/:ingredientId'
          element={<IngredientPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path='/feed/:number' element={<OrderPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/ingredients/:ingredientId'
            element={
              <Modal setActive={handleModalClose}>
                <IngredientPage />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal setActive={handleModalClose}>
                <Order />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal setActive={handleModalClose}>
                <Order />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
