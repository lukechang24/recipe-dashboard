import { gql } from "@apollo/client"

const ADD_RECIPE = gql`
    mutation AddRecipe($input: AddRecipeInput) {
        addRecipe(input: $input) {
            code
            success
            message
            recipe {
                id
                title
            }
        }
    }
`

const UPDATE_RECIPE = gql`
    mutation UpdateRecipe($id: ID!, $input: UpdateRecipeInput!) {
        updateRecipe(id: $id, input: $input) {
            code
            success
            message
            recipe {
                title
                id
            }
        }
    }
`

const DELETE_RECIPE = gql`
    mutation DeleteRecipe($id: ID!) {
        deleteRecipe(id: $id) {
            code
            success
            message
            recipe {
                title
                id
            }
        }
    }
`

export { ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE }