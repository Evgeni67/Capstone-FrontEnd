export default function (state = {}, action) {
    switch (action.type) {
      case "ADD_PRODUCT_TO_FAVOURITES":
        return {
          ...state,
          favouriteProducts: state.favouriteProducts.concat(action.payload),
        };
      //pass an id not the whole object
      case "REMOVE_PRODUCT_FROM_FAVOURITES":
        return {
          ...state,
          favouriteProducts: state.favouriteProducts.filter(
            (x) => x.id !== action.payload
          ),
        };
      case "ADD_FETCHED_PRODUCTS":
        return {
          ...state,
          allProducts: action.payload,
        };
        case "ADD_PRODUCT_TO_CART":
            return {
              ...state,
              porductsInCart: state.porductsInCart.concat(action.payload),
            };
        default:
        return state
    }
  }
  