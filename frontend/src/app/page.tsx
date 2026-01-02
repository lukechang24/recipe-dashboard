'use client'
import React from "react"
import RecipeForm from "../components/Recipe/RecipeForm"
import RecipeList from "../components/Recipe/RecipeList"
import * as S from "./index"

const Home = () => {
  return (
      <S.Home>
        <RecipeForm />
        <RecipeList />
      </S.Home>
  )
}

export default Home