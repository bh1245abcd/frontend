import { Routes, Route } from "react-router-dom";

// Layouts
import HomeLayout from "../layout/HomeLayout";
import Adminlayout from "../layout/Adminlayout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "../Routes/PublicRoute"

// User Pages
import Homepage from "../components/Homepage";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ProductGrid from "../reusable/productgrid";
import Orders from "../pages/Orders";
import Men from "../pages/Mens";
// import Women from "../pages/Women";
// import Kids from "../pages/Kids";
// import Bangles from "../pages/Bangles";
// import Earings from "../pages/Earings";
// import Fingerrings from "../pages/Fingerrings";
// import Pandents from "../pages/Pandents";

// ✅ Dynamic Category Page

// Admin Pages
import AddProduct from "../pages/adminpages/Addproduct";
import Seeproduct from "../pages/adminpages/Seeproduct";
import Editproduct from "../pages/adminpages/Editproduct";
import Deleteproduct from "../pages/adminpages/Deleteproduct";
// import Addnavbaritem from "../pages/adminpages/Addnavbaritem";
// import Seenavbaritem from "../pages/adminpages/Seenavbaritem";
// import Editnavbaritem from "../pages/adminpages/Editnavbaritem";
// import Deletenavbaritem from "../pages/adminpages/Deletenavbaritem";
import Createcategory from "../pages/adminpages/Createcategory";
import Seecategory from "../pages/adminpages/Seecategory";
// import EditCategory from "../pages/adminpages/EditCategory";
// import DeleteCategory from "../pages/adminpages/DeleteCategory";
import UploadProductImage from "../pages/adminpages/Uploadimage";
import CreateSubategory from "../pages/adminpages/CreateSubcategory";
import Seesubcategory from "../pages/adminpages/Seesubcategory";


const Approutes = () => {
  return (
    <Routes>
      <Route path="/"
        element={
          <PublicRoute>
            <HomeLayout />
          </PublicRoute>
        }
      >
        {/* <Route path="/" element={<HomeLayout />}> */}
        <Route index element={<Homepage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="mens" element={<Men />} />
        {/* <Route path="womens" element={<Women />} /> */}
        {/* <Route path="kids" element={<Kids />} /> */}
        {/* <Route path="bangles" element={<Bangles />} />/ */}
        {/* <Route path="earrings" element={<Earings />} /> */}
        {/* <Route path="fingerings" element={<Fingerrings />} /> */}
        {/* <Route path="pendents" element={<Pandents />} /> */}
        <Route path="about" element={<About />} />
        <Route path="orders" element={<Orders />} />
        <Route path=":category/:categoryId/:subId?" element={<ProductGrid />} />

      </Route>

      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <Adminlayout />
          </PrivateRoute>
        }
      >
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="seeproduct" element={<Seeproduct />} />
        <Route path="editproduct" element={<Editproduct />} />
        <Route path="deleteproduct" element={<Deleteproduct />} />

        {/* <Route path="addnavbaritem" element={<Addnavbaritem />} />
        <Route path="seenavbaritem" element={<Seenavbaritem />} />
        <Route path="editnavbaritem" element={<Editnavbaritem />} />
        <Route path="deletenavbaritem" element={<Deletenavbaritem />} /> */}

        <Route path="createcategory" element={<Createcategory />} />
        <Route path="createsubcategory" element={<CreateSubategory />} />
        <Route path="seesubcategory" element={<Seesubcategory />} />
        <Route path="seecategory" element={<Seecategory />} />
        {/* <Route path="editcategory" element={<EditCategory />} />
        <Route path="deletecategory" element={<DeleteCategory />} /> */}

        <Route
          path="uploadproductimage/:productId"
          element={<UploadProductImage />}
        />
      </Route>

      {/* ================= 404 ================= */}
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
};

export default Approutes;
