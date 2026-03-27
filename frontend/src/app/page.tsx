'use client'
import React, { useState } from "react"
import RecipeForm from "../components/Recipe/RecipeForm"
import RecipeList from "../components/Recipe/RecipeList"
import Sidebar from "../components/Sidebar/sidebar"
import * as S from "./index"

import { useQuery } from "@apollo/client/react";
import { GET_CATEGORIES } from "../graphql/queries";
import { Categories } from "../app/types";

type CategoriesQuery = {
    categories: [Categories]
}

const Home = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("")
  const [showForm, setShowForm] = useState<boolean>(false)
  const { loading: categoriesLoading, error: categoriesError, data } = useQuery<CategoriesQuery>(GET_CATEGORIES)
  if (categoriesLoading) return <p>loading</p>
  if (categoriesError) return <p>error</p>
  const selectedCategory = data?.categories.find((cat) => cat.id === selectedCategoryId)
  return (
      <S.Home>
        <Sidebar categories={data?.categories} selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId}/>
        <S.RecipeSection>
          <S.Header>
            <S.CategoryTitle>{selectedCategory?.name || "All Recipes"}</S.CategoryTitle>
            <S.AddRecipeButton onClick={() => setShowForm(!showForm)}>Add Recipe</S.AddRecipeButton>
          </S.Header>
          <S.Backdrop show={showForm}></S.Backdrop>
          <RecipeForm categories={data?.categories} showForm={showForm} setShowForm={setShowForm}/>
          <RecipeList selectedCategoryId={selectedCategoryId}/>
        </S.RecipeSection>
      </S.Home>
  )
}

export default Home