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
        review {
          star
        }
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
          review {
            star
          }
  
      }
    }
  `
  const result = await request(MASTER_URL, query);
  return result;
  ;
}

const AddToCart = async (data) => {
  const query =
    gql`
  mutation AddToCart {
  createUserCart(
    data: {email: "` +
    data?.email +
    `", price: ` +
    data.price +
    `, productDescription: "` +
    data.description +
    `", productImage: "` +
    data.productImage +
    `", productName: "` +
    data.name +
    `"
    restaurant: {connect: {slug: "`+data.restaurantSlug+`"}}}
    
  ) {
    id
  }
  publishManyUserCarts(to: PUBLISHED) {
    count
  }
}`
  const result = await request(MASTER_URL, query);
  return result;

};

const GetUserCart=async(userEmail)=>{
  const query = gql`
    query GetUserCart {
    userCarts(where: {email: "`+userEmail+`"}) {
      id
      price
      productDescription
      productImage
      productName
      restaurant {
      name
      banner {
        url
      }
        slug
      }
    }
  }`
  const result = await request(MASTER_URL, query);
  return result;
}

const DisconnectRestaurantFromUserCartItem = async(id)=>{
  const query = gql`
    mutation DisconnectRestaurantFromCartItem {
      updateUserCart(
        data: { restaurant: { disconnect: true } },
        where: { id: "`+id+`" }
      ){id} 
      publishManyUserCarts(to: PUBLISHED) {
        count
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
}


const DeleteItemFromCart = async(id)=>{
  const query = gql`
    mutation DeleteCartItem {
      deleteUserCart(where: { id: "`+id+`" }) {
        id
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
}

const AddNewReview = async(data)=>{
  const query = gql`
    mutation AddNewReview {
      createReview(
        data: {
          email: "`+data.email+`",
          profileImage: "`+data.profileImage+`",
          reviewText: "`+data.reviewText+`",
          userName: "`+data.userName+`",
          restaurant: { connect: { slug: "`+data.RestroSlug+`" } },
          star: `+data.star+`
        }
      ) {
        id
      }
        publishManyReviews(to: PUBLISHED) {
          count
        }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
}

const GetRestaurantReviews = async(slug)=>{
  const query = gql`
    query RestaurantReviews {
      reviews(where: { restaurant: { slug: "`+slug+`" }},orderBy: publishedAt_DESC) {
        email
        id
        profileImage
        publishedAt
        userName
        star
        reviewText
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
}

const CreateNewOrder = async(data)=>{
  const query = gql`
    mutation CreateNewOrder {
      createOrder(
        data: {
          email: "`+data.email+`"
          orderAmount: `+data.orderAmount+`
          restaurantName: "`+data.restaurantName+`"
          userName: "`+data.userName+`"
          address: "`+data.address+`"
          phone: "`+data.phone+`"
          zipCode: "`+data.zipCode+`"
        }
      ) {
        id
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
}

// const UpdateOrderToAddOrderItems = async(name,price,id) =>{
//    const query = gql`
//       mutation UpdateOrderWithDetail {
//       updateOrder(
//         data: {orderDetail: {create: {OrderItem: {data: {_: "Name:${name}, Price:${price}"}}}}}
//         where: {id: "`+id+`"}
//       ) {
//         id
//       }
//     }
//    `;
//    const result = await request(MASTER_URL, query);
//    return result;
// }


const UpdateOrderToAddOrderItems = async(name,price,id) =>{
  const query = gql`
     mutation UpdateOrderWithDetail {
      updateOrder(
        data: {orderDetail: {create: {OrderItem: {data: {name: "`+name+`", price:`+price+`}}}}}
        where: {id: "`+id+`"}
      ) {
        id
      }
        publishManyOrders(to: PUBLISHED) {
          count
        }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
}


export default {
    GetCategory,
    GetBusiness,
    GetBusinessDetail,
    AddToCart,
    GetUserCart,
    DisconnectRestaurantFromUserCartItem,
    DeleteItemFromCart,
    AddNewReview,
    GetRestaurantReviews,
    CreateNewOrder,
    UpdateOrderToAddOrderItems
}