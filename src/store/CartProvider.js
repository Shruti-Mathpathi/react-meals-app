import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    const existingItemCartIndex = state.items.findIndex((item) => item.id === action.item.id);
    const existingItemCart = state.items[existingItemCartIndex];
    let updatedItems;
    if (existingItemCart) {
      let updatedItem;
      updatedItem = {
        ...existingItemCart,
        amount: existingItemCart.amount + action.item.amount
      };
      updatedItems = [...state.items]
      updatedItems[existingItemCartIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  if (action.type === 'REMOVE') {
    const existingItemCartIndex = state.items.findIndex((item) => item.id === action.id);
    const existingItemCart = state.items[existingItemCartIndex];
    const upadtedTotalAmount = state.totalAmount - existingItemCart.price;
    let updatedItems;
    if (existingItemCart.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id
      )
    } else {
      let updatedItem;
      updatedItem = {
        ...existingItemCart,
        amount: existingItemCart.amount - 1
      };
      updatedItems = [...state.items]
      updatedItems[existingItemCartIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: upadtedTotalAmount
    };
  }

  if (action.type === 'CLEAR') {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' });
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;