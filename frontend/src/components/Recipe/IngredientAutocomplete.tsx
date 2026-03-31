import * as S from "./index"
import { Ingredient } from "../../app/types"

type IngredientInput = {
    quantity: string
    ingredient: Ingredient
}

type Props = {
    focused: boolean
    setFocused: any
    allIngredients?: [Ingredient]
    index: number
    inputValue: IngredientInput
    updateIngredient: any
}

const IngredientAutocomplete = ({ focused, setFocused, allIngredients, index, updateIngredient, inputValue } : Props) => {
    let filteredIngredients = allIngredients?.filter(i => i.name.toLowerCase().includes(inputValue.ingredient.name.toLowerCase())).slice(0, 5)

    const exactMatch = allIngredients?.some(i => i.name.toLowerCase() === inputValue.ingredient.name.toLowerCase())

    if (!exactMatch && inputValue.ingredient.name) {
        filteredIngredients = [...(filteredIngredients || []), { name: `+ add "${inputValue.ingredient.name}"`, id: "" }]
    }

    const handleAutocomplete = (e : any) => {
        const match = e.target.innerText.match(/"(.*?)"/)
        let extractedText = match ? match[1] : e.target.innerText
        updateIngredient(index, { ...inputValue, ingredient: { name: extractedText } })
        setFocused(false)
    }
    return (
        <S.AutocompleteContainer show={focused}>
            {filteredIngredients?.map((ingredient) => {
                return <S.AutocompleteIngredient onClick={(e) => handleAutocomplete(e)}>{ingredient.name}</S.AutocompleteIngredient>
            })}
        </S.AutocompleteContainer>
    )
}

export default IngredientAutocomplete