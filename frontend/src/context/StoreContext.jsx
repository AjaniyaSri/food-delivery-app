import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);
import axios from "axios";


const StoreContextProvider = (props) => {
  const [cartItems, setcartItems] = useState({});
  const url = "http://localhost:4000"
  const [token,setToken] = useState("");
  const [food_list,setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setcartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    // if (token) {
    //   await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    // }

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    // if (token) {
    //   await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    // }

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
      }
    }
  };

  // const getTotalCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       let itemInfo = food_list.find((product) => product._id == item);
  //       totalAmount += itemInfo.price * cartItems[item];
  //     }
  //   }
  //   return totalAmount;
  // }

  const getTotalCartAmount = () => {
  let totalAmount = 0;
  for (const itemId in cartItems) {
    if (cartItems[itemId] > 0) {
      const itemInfo = food_list.find((product) => product._id === itemId);
      if (itemInfo) {  // <-- check if itemInfo exists
        totalAmount += itemInfo.price * cartItems[itemId];
      }
    }
  }
  return totalAmount;
};


  const fetchFoodList = async ()=>{
    const response = await axios.get(url+"/api/food/list");
    setFoodList(response.data.data);
  }

  // const loadCartData = async (token)=>{
  //   const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
  //   setcartItems(response.data.cartData)
  // }

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );
      setcartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Failed to load cart data:", error);
    }
  };

   useEffect(()=>{
      
      async function loadData() {
        await fetchFoodList();
      //   if (localStorage.getItem("token")) {
      //   setToken(localStorage.getItem("token"));
      //   await loadCartData(localStorage.getItem("token"))
      // }
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
      }
      loadData();
  },[])

  const contextValue = {
    food_list,
    cartItems,
    setcartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
