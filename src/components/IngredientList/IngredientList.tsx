import IngredientListStyles from './IngredientList.module.css'
import IngredientСard from '../IngredientСard/IngredientСard'
import { useSelector } from '../../hooks/hooks';
import React, { FC } from "react";
import { TIngredient } from '../../utils/types';
interface IngredientListProps {
    type: string
  }
const IngredientList: FC<IngredientListProps> = ({ type }) => {
    const apiData = useSelector(state => state.apiData)
    let ingedientList:Array<TIngredient> = isTrueType()
    function isTrueType() {
        let a:Array<TIngredient> = []
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
export default IngredientList