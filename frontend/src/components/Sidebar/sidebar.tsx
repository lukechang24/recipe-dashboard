'use client'
import React, { useState } from "react"
import { useQuery } from "@apollo/client/react";
import { GET_CATEGORIES } from "../../graphql/queries";
import { Categories } from "../../app/types";
import * as S from "./index"


type Props = { 
    categories?: Categories[]
    selectedCategoryId: string
    setSelectedCategoryId: any
}

const Sidebar = ({ selectedCategoryId, setSelectedCategoryId, categories } : Props) => {
    return(
        <S.SidebarContainer>
            <S.CategoryContainer isActive={!selectedCategoryId} onClick={() => setSelectedCategoryId("")}>All Recipes</S.CategoryContainer>
            {categories?.map(category => {
                const { id, name } = category
                return(
                    <S.CategoryContainer 
                        isActive={selectedCategoryId === id}
                        key={id} 
                        onClick={() => setSelectedCategoryId(id)}>
                            {name}
                    </S.CategoryContainer>
                )
            })}
        </S.SidebarContainer>
    )
}

export default Sidebar
