import styled from "styled-components"

type Props = {
   show: any
}

export const Home = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    box-sizing: border-box;
`

export const RecipeSection = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`  

export const CategoryTitle = styled.h2`
    margin: 15px;
    font-size: 30px;
`

export const AddRecipeButton = styled.button`
    background-color: #0D96ED;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    &:hover {
        background-color: #66c4ff;
    }
`

export const Backdrop = styled.div<Props>`
   position: fixed;
   top: 0;
   left: 0;
   display: ${props => props.show ? "block" : "none"};
   width: 100%;
   height: 100%;
   background: rgba(0,0,0,0.3);
   z-index: 999;
`
