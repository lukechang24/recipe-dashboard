import { gql } from "@apollo/client"

const GET_RECIPES = gql`
    query GetRecipes {
        recipes {
            id
            title
            createdAt
            description
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


export { GET_RECIPES }