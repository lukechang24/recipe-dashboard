import { useState, useEffect, useRef } from "react"
import * as S from "./index"
import { Ingredient } from "../../app/types"
import IngredientAutocomplete from "./IngredientAutocomplete"

type IngredientInputProp = {
    quantity: string
    ingredient: Ingredient
}

type Props = {
    ing: IngredientInputProp
    index: number
    arrLen: number
    updateIngredient: any
    removeIngredient: any
}

const IngredientInput = ({ ing, index, updateIngredient, removeIngredient, arrLen } : Props) => {
  const inputNameRef = useRef(null)

  useEffect(() => {

  }, [])
  return (
    <S.IngredientContainer>
      <S.IngredientNameInput
        placeholder="Ingredient"
        value={ing.ingredient.name}
        onChange={(e) => updateIngredient(index, { ...ing, ingredient: { name: e.target.value } })}
        ref={inputNameRef}
      />
      <S.IngredientQtyInput
        placeholder="Quantity"
        value={ing.quantity}
        onChange={(e) => updateIngredient(index, { ...ing, quantity: e.target.value })}
      />
      <IngredientAutocomplete/>
      <S.RemoveIngredient type="button" onClick={() => removeIngredient(index)} show={arrLen > 1}>Remove</S.RemoveIngredient>
    </S.IngredientContainer>
  )
}

export default IngredientInput