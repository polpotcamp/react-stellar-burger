import styles from "./HomePage.module.css";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
function HomePage() {
    localStorage.setItem("flag", JSON.stringify(null))
    return (
        <>       
            <main className={styles.twoColumn}>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </>
    )
}
export default HomePage