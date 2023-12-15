
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
import { getApiData } from "./services/async/ApiData";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { authorizationUserAction } from "./services/actions/actions";
import { fetchWithRefresh } from "./services/async/FetchWithRefresh";
import { BASE_URL } from "./utils/Api";
import AppHeader from "./components/AppHeader/AppHeader";
function App() {
  const dispatch = useDispatch()
  dispatch(getApiData())
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const handleModalClose = () => {
    navigate(-1);
  };
  const refreshToken = localStorage.getItem("refreshToken")
  if (refreshToken !==null) {
    fetchWithRefresh(`${BASE_URL}/auth/user`, {
      method: 'GET',
      headers: {
        authorization: JSON.parse(localStorage.getItem("accessToken"))
      }
    }).then(() => {
      dispatch(authorizationUserAction())
    })
  }
  return (
    <div className={styles.app} id="main">
      <AppHeader/>
      <Routes location={background || location}>
        <Route path='/' element={<HomePage />} />
        <Route path='/ingredients/:ingredientId'
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
                <IngredientPage />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
