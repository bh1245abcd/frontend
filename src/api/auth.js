import axiosInstance from "./axiosInstance";
import jwt_decode from "jwt-decode";


export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/login/v1/login",
      payload
    );
    const { token, role } = response.data.data;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("role", role)

    // localStorage.setItem("token", token);
    // localStorage.setItem("role", role);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


export const registerUser = async (payload) => {
  const response = await axiosInstance.post(
    "/login/v1/signup",
    payload
  );
  return response.data;
};



export const getUserFromToken = () => {
  // const token = localStorage.getItem("token");
  const token = sessionStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwt_decode(token);
    // console.log("====getUserFromToken======", decoded)
    return {
      username: decoded.username || decoded.sub,
      userId: decoded.userId,
      role: decoded.roles || [],
      customerId: decoded.customerId,
      exp: decoded.exp,
    };
  } catch {
    return null;
  }
};



export const getUserIdFromToken = () => {
  const token = sessionStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwt_decode(token);
    return decoded.userId;
  } catch {
    return null;
  }
};

// 🛒 ADD TO CART
export const addToCart = async ({ productId, quantity }) => {
  const userId = getUserIdFromToken();

  if (!userId) {
    throw new Error("User not logged in");
  }

  const payload = {
    productId,
    quantity,
    variantId: "default",
    promoCode: "",
    itemId: productId,
    userId,
  };

  try {
    const res = await axiosInstance.post(
      "/vasaae/user/cart/add",
      payload
    );

    return res.data;
  } catch (error) {
    console.error("Add to cart failed", error);
    throw error.response?.data || error;
  }
};


//  GET CART
export const getCartItems = async () => {
  const userId = getUserIdFromToken();
  if (!userId) return [];

  const res = await axiosInstance.get("/vasaae/user/cart");
  const data = res.data?.data;
  console.log("😂😂😂😂😂", data)

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;

  return [];
};


//  DELETE CART ITEM
export const deleteCartItem = async (itemId) => {
  console.log("❌❌❌❌", itemId)
  await axiosInstance.delete(`/vasaae/user/cart/remove/${itemId}`);
};

export const updatecart = async (payload) => {
  return await axiosInstance.put(
    "/vasaae/user/cart/update",
    payload
  );
};

//ADD PRODUCT
export const addProduct = async (payload) => {
  const res = await axiosInstance.post("/api/admin/products", payload);
  return res.data;
};

//SEE PRODUCT
export const getProducts = async () => {
  const res = await axiosInstance.get("/api/admin/products");
  console.log(res)
  return res.data?.data?.items || [];
};

//UPDATE PRODUCT
export const updateProduct = async (id, payload) => {
  await axiosInstance.put(`/api/admin/products/${id}`, payload);
  return true; // ✅ return full response
};

//DELTE PRODUCT
export const deleteProduct = async (id) => {
  const res = await axiosInstance.delete(`/api/admin/products/${id}`);
  return res.data; // always return response
};

//CREATE CATEGORY
export const createCategory = async (payload) => {
  const res = await axiosInstance.post("/api/admin/categories", payload);
  return res.data; // return response data
};

// GET CATEGORIES
export const getCategories = async () => {
  const res = await axiosInstance.get("/api/admin/categories");
  // console.log("========res===========",res.data.data.content)
  return res.data.data.content;
};

// UPDATE CATEGORY
export const updateCategory = async (id, payload) => {
  const res = await axiosInstance.put(
    `/api/admin/categories/${id}`,
    payload
  );
  return res.data;
};

// DELETE CATEGORY
export const deleteCategory = async (id) => {
  const res = await axiosInstance.delete(`/api/admin/categories/${id}`);
  return res.data;
};

// UPLOAD PRODUCT IMAGE
export const uploadProductImage = async (productId, imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile); // key must match backend

  const res = await axiosInstance.post(
    `/api/admin/products/${productId}/images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const createSubcategories = async (categoryId, body) => {
  const res = await axiosInstance.post(
    `/api/admin/subcategories/category/${categoryId}`,
    body
  );
  return res.data;
};


// get subcategories by category id
export const getSubcategoriesByCategory = async (categoryId) => {
  const res = await axiosInstance.get(
    `/api/admin/subcategories/category/${categoryId}`
  );
  return res.data.data.content;
};

// update subcategory
export const updateSubcategory = async (id, payload) => {
  const res = await axiosInstance.put(
    `/api/admin/subcategories/${id}`,
    payload
  );
  return res.data;
};

// delete subcategory
export const deleteSubcategory = async (id) => {
  const res = await axiosInstance.delete(
    `/api/admin/subcategories/${id}`
  );
  return res.data;
};

// user side get category api
export const getPublicCategories = async () => {
  const res = await axiosInstance.get("/vasaae/categories");
  return res.data.data.content; // adjust if backend wraps response
};

// user side get subcategory api
export const getPublicsubCategories = async (categoryId) => {
  const res = await axiosInstance.get(
    `/vasaae/categories/subcategory/${categoryId}`
  );
  return res.data.data.content // single category object
};

// Get products by categoryId
export const getProductsByCategory = async (categoryId) => {
  const res = await axiosInstance.get(`/vasaae/categories/${categoryId}/products`);
  console.log(categoryId)
  return res.data.data || []; // array of products
};


// Get prodcuts for subcategory
export const getProductsBySubCategory = async (categoryId, subCategoryId) => {
  const res = await axiosInstance.get(
    `/vasaae/categories/${categoryId}/subcategories/${subCategoryId}/products`
  );
  return res.data?.data?.products || [];
};

// Create a new order
export const createOrder = async (orderPayload) => {
  try {
    const res = await axiosInstance.post("/vasaae/user/orders", orderPayload);
    return res.data; // return full response from backend
  } catch (error) {
    // Throw error so the calling code can handle it
    throw error.response?.data || error;
  }
};

// Get Orders
export const getorders = async() => {
  try{
  const reponse = await axiosInstance.get("/vasaae/user/orders")
  return reponse
  }catch(error){
    throw error.response?.data || error;
  }
}

export const cancelOrder = async (orderId, payload) => {
  try {
    const response = await axiosInstance.post(
      `/vasaae/user/orders/${orderId}/cancel`,
      payload
    );
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};