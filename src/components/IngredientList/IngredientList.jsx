import IngredientListStyles from './IngredientList.module.css'
import IngredientСard from '../IngredientСard/IngredientСard'
import PropTypes from 'prop-types';
import {  useSelector } from 'react-redux';
import React from "react";
function IngredientList({ type}) {
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
    return (
        <>
            <div className={`${IngredientListStyles.list} pl-4 pr-4`}>
                {ingedientList.map((ingredient) => (
                    <IngredientСard ingredient={ingredient} key={ingredient._id} />
                ))}
            </div>
        </>
    )
}
IngredientList.propTypes = {
    type: PropTypes.string.isRequired,
}
export default IngredientList