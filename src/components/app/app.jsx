import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { BurgerConstructorContext } from "../../services/BurgerConstructor";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import React from "react";
import { apiContext } from "../../services/Api";
import { orderContext } from "../../services/Order";
function App() {
  const Url = `https://norma.nomoreparties.space/api/ingredients`;
  const [data, setData] = React.useState([])
  const [state, setState] = React.useState({
    loading: true, error: false
  })
  const [order,setOrder] = React.useState('')
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD": return { ...state, ingr: [...state.ingr, action.payload] }
      case "SWITCHBUN": return { ...state, bun: action.payload }
      default: return state
    }
  }
  const [burgerConstructorData, dispatch] = React.useReducer(reducer, { bun: {}, ingr: [] })
  React.useEffect(() => {
    fetch(Url)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(data => {
        setData(data)
        dispatch({ type: 'SWITCHBUN', payload: data.data[0] })
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
      <main className={styles.twoColumn}>
        <apiContext.Provider value={data}>
          <BurgerConstructorContext.Provider value={{ burgerConstructorData, dispatch }}>
            <orderContext.Provider value={{order,setOrder}}>
            <BurgerIngredients />
            <BurgerConstructor />
            </orderContext.Provider>
          </BurgerConstructorContext.Provider>
        </apiContext.Provider>
      </main>
    </div>
  );
}

export default App;
