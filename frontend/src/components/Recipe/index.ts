import styled from "styled-components"
import { FaTimes } from 'react-icons/fa'


type Props = {
   show: any
}


export const RecipeForm = styled.form<Props>`
   position: fixed;
   right: ${props => props.show ? "0" : "-500px"};
   top: 0;
   width: 400px;
   height: 100vh;
   display: flex;
   flex-direction: column;
   background-color: white;
   padding: 20px 40px 0;
   z-index: 1000;
   transition: 0.15s linear all;
   box-sizing: border-box;
`

export const RecipeInputContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   box-sizing: border-box;
   margin-bottom: 15px;
`

export const RecipeInput = styled.input`
`

export const InputTitle = styled.p`
   margin-bottom: 5px;
`

export const CategoryDropdown = styled.select`
`

export const Option = styled.option`

`

export const IngredientSection = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   box-sizing: border-box;
`

export const IngredientContainer = styled.div`
   display: flex;
   width: 100%;
   gap: 5px;
   margin-bottom: 5px;
`

export const IngredientNameInput = styled.input`
   flex: 3;
   min-width: 0;
`

export const IngredientQtyInput = styled.input`
   flex: 1;
   min-width: 0;
`

export const RemoveIngredient = styled.button`
   // flex-shrink: 0;
   background: none;
   border: none;
   color: #d87979;
   font-size: 13px;
   cursor: pointer;
   &:hover {
      color: #e82020;
   }
`

export const AddIngredient = styled.button`
   // background-color: #e5e5e5;
   background-color: transparent;
   color: #8a8a8a;
   font-size: 14px;
   padding: 5px 10px;
   border: none;
   border-radius: 5px;
   &:hover {
      color: #000;
   }
`

export const RecipeListSection = styled.div`
   display: flex;
   flex-wrap: wrap;
   padding: 30px 15px;
   gap: 20px;
`

export const RecipeDiv = styled.div`
   width: calc(33.33% - 13.33px);
   cursor: pointer;
`

export const RecipeTitle = styled.h4`

`

export const AddRecipe = styled.button`
   position: absolute;
   bottom: 50px;
   right: 50%;
   transform: translateX(50%);
   width: 100px;
   background-color: #136D12;
   color: white;
   padding: 10px;
   border: none;
   border-radius: 5px;
   &:hover {
      background-color: #2e9f2c;
   }
`

export const ExitButton = styled(FaTimes)`
   position: absolute;
   top: 0;
   right: 0;
   font-size: 20px;
   margin: 5px;
   cursor: pointer;
   &:hover {
      color: red;
   }
`