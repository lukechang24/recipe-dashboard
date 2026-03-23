'use client'
import React, { useState } from "react"
import RecipeForm from "../components/Recipe/RecipeForm"
import RecipeList from "../components/Recipe/RecipeList"
import Sidebar from "../components/Sidebar/sidebar"
import * as S from "./index"

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  return (
      <S.Home>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
        <S.RecipeSection>
          <RecipeForm />
          <RecipeList selectedCategory={selectedCategory}/>
        </S.RecipeSection>
      </S.Home>
  )
}

export default Home