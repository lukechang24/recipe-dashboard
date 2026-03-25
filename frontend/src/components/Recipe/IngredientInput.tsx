import * as S from "./index"
import { Ingredient } from "../../app/types"

type IngredientInputProp = {
    quantity: string
    ingredient: Ingredient
}

type Props = {
    ing: IngredientInputProp
    index: number
    updateIngredient: any
    removeIngredient: any
}

const IngredientInput = ({ ing, index, updateIngredient, removeIngredient } : Props) => (
  <S.IngredientContainer>
    <input
      placeholder="Ingredient"
      value={ing.ingredient.name}
      onChange={(e) => updateIngredient(index, { ...ing, ingredient: { name: e.target.value } })}
    />
    <input
      placeholder="Quantity"
      value={ing.quantity}
      onChange={(e) => updateIngredient(index, { ...ing, quantity: e.target.value })}
    />
    <button type="button" onClick={() => removeIngredient(index)}>Remove</button>
  </S.IngredientContainer>
)

export default IngredientInput