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
   padding: 20px 10px 0;
   z-index: 1000;
   transition: 0.15s linear all;
   box-sizing: border-box;
`

export const RecipeInputContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
`

export const RecipeInput = styled.input`
   width: 375px;
`

export const CategoryDropdown = styled.select`
`

export const Option = styled.option`

`

export const IngredientSection = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
`

export const IngredientContainer = styled.div`
   display: flex;
`

export const IngredientInput = styled.input`

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

export const ExitButton = styled(FaTimes)`
   position: absolute;
   top: 0;
   right: 0;
   font-size: 20px;
   margin: 5px;
   cursor: pointer;
`