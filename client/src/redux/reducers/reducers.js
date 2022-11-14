const initProduct = {
    numberCart: 0,
    Carts: [],
    _products: []
}


function shopping(state = initProduct, action) {
    switch (action.type) {
        case "GET_ALL_PRODUCTS":
            return {
                ...state,
                _products: action.payload
            }

        case "ADD_CART":
            if (state.numberCart === 0) {
                let cart = {
                    name: action.payload.name,
                    quantity: 1,
                    mass: action.payload.mass,
                    image: action.payload.image,
                }
                state.Carts.push(cart);
            } else {
                let check = false;
                state.Carts.map((item, i) => {
                    if (item.id === action.payload.id) {
                        state.Carts[i].quantity++;
                        check = true;
                    }
                });
                if (!check) {
                    let _cart = {
                        name: action.payload.name,
                        quantity: 1,
                        mass: action.payload.mass,
                        image: action.payload.image,
                    }
                    state.Carts.push(_cart);
                }
            }
            return {
                ...state,
                numberCart: state.numberCart + 1
            }
        case "INCREASE_QUANTITY":
            state.Carts[action.payload].quantity++;
            return {
                ...state,
                Carts: state.Carts,
                numberCart: state.numberCart + 1
            }
        case "DECREASE_QUANTITY":
            let qty = state.Carts[action.payload].quantity;
            if (qty > 1) {
                state.Carts[action.payload].quantity--;
                return {
                    ...state,
                    Carts: state.Carts,
                    numberCart: state.numberCart - 1

                }
            } else {
                state.Carts[action.payload].quantity = 0;
                return {
                    ...state,
                    Carts: state.Carts.filter(item => item.id !== state.Carts[action.payload].id),
                    numberCart: state.numberCart - 1

                }
            }
        case "DELETE_CART":
            let quantity_ = state.Carts[action.payload].quantity;
            return {
                ...state,
                numberCart: state.numberCart - quantity_,
                Carts: state.Carts.filter(item => item.id !== state.Carts[action.payload].id)
            }
        default:
            return state;
    }
}

export default shopping;