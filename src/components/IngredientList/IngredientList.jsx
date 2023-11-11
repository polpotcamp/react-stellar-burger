import IngredientListStyles from './IngredientList.module.css'
import IngredientСard from '../IngredientСard/IngredientСard'
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getApiData } from '../../services/async/ApiData';
import React from "react";
function IngredientList({ type}) {
    const dispatch = useDispatch()
    const [domReady, setDomReady] = React.useState(false)
    const apiData= useSelector(state => state.apiData)
    let ingedientList= isTrueType()
    
    function isTrueType() {
        let a = []
        for (let i = 0; i < apiData.length; i++) {
            if (apiData[i].type === type) {
                a.push(apiData[i])
            }
        }
        return a
    }
    React.useEffect(() => {
         dispatch(getApiData())
         setDomReady(true)
    }, [])
    return (
        domReady
            ?
        <>
            <div className={`${IngredientListStyles.list} pl-4 pr-4`}>
                {ingedientList.map((ingredient) => (
                    <IngredientСard ingredient={ingredient} key={ingredient._id} />
                ))}
            </div>
        </>
        : null
    )
}
IngredientList.propTypes = {
    type: PropTypes.string.isRequired,
}
export default IngredientList