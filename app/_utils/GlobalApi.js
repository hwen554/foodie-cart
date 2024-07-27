// const {gql, default:request} = require("graphql-request")
import { request, gql } from 'graphql-request';



const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

/**
 * Used to make get categories api request
 * @returns 
 */
const GetCategory = async() => {
  const query = gql`
    query Categories {
      categories(first: 50) {
        id
        slug
        name
        icon {
          url
        }
      }
    }
  `
  const result = await request(MASTER_URL, query);
  return result;
};

const GetBusiness = async (category) => {
  const query = gql`
    query GetBusiness {
      restaurants(where: { categories_some: { slug: "`+category+`" } }) {
        aboutUs
        address
        banner {
          url
        }
        categories {
          name
        }
        id
        name
        restroType
        slug
        workingHours
      }
    }
  `
  const result = await request(MASTER_URL, query);
  return result;
};
const GetBusinessDetail = async(businessSlug)=>{
  const query = gql`
    query RestaurantDetail {
      restaurant(where: { slug: "`+businessSlug+`"}) {
        aboutUs
        address
        banner {
          url
        }
        categories {
          name
        }
        id
        name
        restroType
        slug
        workingHours
        menu {
          ... on Menu {
            id
            category
            menuItem {
              ... on MenuItem {
                id
                name
                description
                price
                productImage {
                  url
                }
              }
            }
          }
        }
      }
    }
  `
  const result = await request(MASTER_URL, query);
  return result;
  ;
}

export default {
    GetCategory,
    GetBusiness,
    GetBusinessDetail
}