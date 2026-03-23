import { gql } from "@apollo/client"

const GET_RECIPES = gql`
    query GetRecipes($categoryId: ID) {
        recipes(categoryId: $categoryId) {
            id
            title
            createdAt
            updatedAt
            description
        }
    }
`

const GET_RECIPE = gql`
    query GetRecipe($id: ID!) {
        recipe(id: $id) {
            title
            createdAt
            description
            instructions
            updatedAt
            category {
                name
            }
            ingredients {
                quantity
                ingredient {
                    name
                }
            }
        }
    }
`

const GET_CATEGORIES = gql`
    query GetCategories {
        categories {
            name
            id
        }
    }
`

// const GET_RECIPES = gql`
//     query GetRecipes {
//         recipes {
//             id
//             title
//             ingredients {
//                 quantity
//                 ingredient {
//                     name
//                 }
//             }
//         }
//     }
// `


export { GET_RECIPES, GET_RECIPE, GET_CATEGORIES }