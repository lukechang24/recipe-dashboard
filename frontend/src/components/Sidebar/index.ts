import styled from "styled-components"

interface Props {
  isActive: any
}

export const SidebarContainer = styled.div`
    position: sticky;
    top: 0;
    width: 250px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding-top: 50px;
`

export const CategoryContainer = styled.button<Props>`
    color: ${props => props.isActive ? "red" : "black"};
    padding: 20px 70px;
`