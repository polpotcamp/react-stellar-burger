import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import React from "react";
function App() {
  return (
    <div className={styles.app} id="main">
      <AppHeader />
      <main className={styles.twoColumn}>                     
            <BurgerIngredients />
            <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
