import styled from "styled-components"

interface Props {
  isActive: any
}

export const SidebarContainer = styled.div`
    position: sticky;
    top: 0;
    width: 200px;
    height: 100vh;
    display: flex;
    flex-direction: column;
`

export const SidebarTitle = styled.h1`
    margin-bottom: 10px;
`

export const CategoryContainer = styled.button<Props>`
    background-color: ${props => props.isActive ? "#F6F6F6" : "transparent"};
    border: none;
    text-align: left;
    padding: 10px 10px;
    border-radius: 5px;
    margin: 5px 0;
    &:hover {
        background-color: #f6f6f6e3;
    }
`