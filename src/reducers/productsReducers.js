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
        case "CHANGE_CURRENT_CATEGORY":
        return {
          ...state,
          category: action.payload
        };
        case "CHANGE_CURRENT_PRODUCT":
          return {
            ...state,
            currentProduct: action.payload
          };
      case "ADD_FETCHED_PRODUCTS":
        return {
          ...state,
          allProducts: action.payload,
        };
        case "FILTER_PRODUCTS":
          return {
            ...state,
            products: action.payload,
          };
        case "ADD_PRODUCT_TO_CART":
            return {
              ...state,
              productsInCart: state.productsInCart.concat(action.payload),
            };
            case "REMOVE_PRODUCT_FROM_CART":
            return {
              ...state,
              productsInCart: state.productsInCart.filter(product => product.id !== action.payload.id),
            };
        default:
        return state
    }
  }
  