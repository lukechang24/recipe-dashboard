import styled from "styled-components"
import React from "react"


type Props = {
   show: any
}

 export const RecipeForm = styled.form<Props>`
   position: absolute;
   right: ${props => props.show ? "0" : "-500px"};
   top: 0;
   width: 500px;
   display: flex;
   flex-direction: column;
 `

 export const RecipeInputContainer = styled.div`
   display: flex;
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