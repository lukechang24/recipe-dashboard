import { useState, useEffect } from "react"
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
    allIngredients?: [Ingredient]
    updateIngredient: any
    removeIngredient: any
}

const IngredientInput = ({ ing, index, updateIngredient, allIngredients, removeIngredient, arrLen } : Props) => {
  const [focused, setFocused] = useState(false)
  const handleFocus = () => {
    setFocused(true)
  }
  const handleBlur = () => {
    // setFocused(false)
  }
  return (
    <S.IngredientContainer>
      <S.IngredientNameInput
        placeholder="Ingredient"
        value={ing.ingredient.name}
        onChange={(e) => updateIngredient(index, { ...ing, ingredient: { name: e.target.value } })}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <S.IngredientQtyInput
        placeholder="Quantity"
        value={ing.quantity}
        onChange={(e) => updateIngredient(index, { ...ing, quantity: e.target.value })}
      />
      <IngredientAutocomplete focused={focused} setFocused={setFocused} allIngredients={allIngredients} index={index} inputValue={ing} updateIngredient={updateIngredient}/>
      <S.RemoveIngredient 
        type="button" 
        onClick={() => removeIngredient(index)} show={arrLen > 1}>Remove</S.RemoveIngredient>
    </S.IngredientContainer>
  )
}

export default IngredientInput