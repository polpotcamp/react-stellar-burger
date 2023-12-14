import styles from "./HomePage.module.css";
import AppHeader from "../components/AppHeader/AppHeader";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
function HomePage() {
    localStorage.setItem("flag", JSON.stringify(null))
    return (
        <>       
            <AppHeader />
            <main className={styles.twoColumn}>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </>
    )
}
export default HomePage