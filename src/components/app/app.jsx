import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import React from "react";
function App() {
  const Url = `https://norma.nomoreparties.space/api/ingredients`;
  const [data, setData] = React.useState([])
  const [state, setState] = React.useState({
    loading: true, error: false
  })
  React.useEffect(() => {
    fetch(Url)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw res
      })
      .then(data => {
        setData(data)
      })
      .catch(error => {
        console.log(error)
        setState({ error: true })
      })
      .finally(() => {
        setState({ loading: false })
      })
  }, [])
  if (state.loading) return 'Loading'
  if (state.error) return 'Error'
  return (
    <div className={styles.app} id="main">
      <AppHeader />
      <div className={styles.twoColumn}>
        <BurgerIngredients data={data.data} />
        <BurgerConstructor data={data.data} />
      </div>
      <pre style={{
        margin: "auto",
        fontSize: "1.5rem"
      }}>
      </pre>
    </div>
  );
}

export default App;
