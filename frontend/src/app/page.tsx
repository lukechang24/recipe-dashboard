import React from "react"
import RecipeForm from "../components/RecipeForm"
import RecipeList from "../components/RecipeList";

const Home = () => {
  return (
      <>
        <RecipeForm />
        <RecipeList />
      </>
  );
}

export default Home