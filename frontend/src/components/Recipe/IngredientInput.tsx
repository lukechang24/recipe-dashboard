import * as S from "./index"
import { Ingredient } from "../../app/types"

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

const IngredientInput = ({ ing, index, updateIngredient, removeIngredient, arrLen } : Props) => (
  <S.IngredientContainer>
    <S.IngredientNameInput
      placeholder="Ingredient"
      value={ing.ingredient.name}
      onChange={(e) => updateIngredient(index, { ...ing, ingredient: { name: e.target.value } })}
    />
    <S.IngredientQtyInput
      placeholder="Quantity"
      value={ing.quantity}
      onChange={(e) => updateIngredient(index, { ...ing, quantity: e.target.value })}
    />
    {
        arrLen > 1 ? <S.RemoveIngredient type="button" onClick={() => removeIngredient(index)}>Remove</S.RemoveIngredient> : null
    }
  </S.IngredientContainer>
)

export default IngredientInput