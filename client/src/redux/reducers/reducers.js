const initProduct = {
    numberCart: 0,
    Carts: [],
    _products: []
}

const precision = 10;
let priceItem = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (10 * precision)

function shopping(state = initProduct, action) {
    switch (action.type) {
        case "GET_ALL_PRODUCTS":
            return {
                ...state,
                _products: action.payload
            }
        case "REMOVE_ALL_PRODUCTS":
            state.Carts = [];
            return {
                ...state,
                numberCart: 0,
                Carts: []
            }

        case "ADD_CART":
            if (state.numberCart === 0) {
                if (action.payload.orbit_class) {
                    let cart = {
                        name: action.payload.designation,
                        quantity: 1,
                        image: action.payload.img,
                        price: action.payload.price,
                    }
                    state.Carts.push(cart);
                }
                else {
                    let cart = {
                        name: action.payload.name,
                        mass: action.payload.mass,
                        quantity: 1,
                        image: action.payload.img,
                        price: action.payload.price,
                    }
                    state.Carts.push(cart);
                }

            } else {
                let check = false;
                state.Carts.map((item, i) => {
                    if (action.payload.orbit_class) {
                        if (item.name === action.payload.designation) {
                            state.Carts[i].quantity++;
                            check = true;
                        }
                    }
                    if (action.payload.name) {
                        if (item.name === action.payload.name) {
                            state.Carts[i].quantity++;
                            check = true;
                        }
                    }

                });
                if (!check) {

                    if (action.payload.orbit_class) {
                        let cart = {
                            name: action.payload.designation,
                            quantity: 1,
                            image: action.payload.img,
                            price: action.payload.price,
                        }
                        state.Carts.push(cart);
                    }
                    else {
                        let cart = {
                            name: action.payload.name,
                            mass: action.payload.mass,
                            quantity: 1,
                            image: action.payload.img,
                            price: action.payload.price,
                        }
                        state.Carts.push(cart);
                    }
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
                    Carts: state.Carts.filter(item => item.name !== state.Carts[action.payload].name),
                    numberCart: state.numberCart - 1

                }
            }

        case "DELETE_CART":
            let quantity_ = state.Carts[action.payload].quantity;
            return {
                ...state,
                numberCart: state.numberCart - quantity_,
                Carts: state.Carts.filter(item => item.name !== state.Carts[action.payload].name)
            }

        default:
            return state;
    }
}

export default shopping;