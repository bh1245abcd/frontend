import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  // const [showProductMenu, setShowProductMenu] = useState(false);
  // const [navbarmenu, setnavabrmenu] = useState(false);
  // const [categorymenu, setcategorymenu] = useState(false);
  // const [subcategorymenu, setsubcategorymenu] = useState(false);
  // const [imagemenu,setimagemnu] = useState(false)

  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
  setOpenMenu(openMenu === menu ? null : menu);
  };


  const menuItem =
    "px-4 py-3 rounded-md cursor-pointer mb-2 font-medium transition-all hover:bg-yellow-600 hover:text-white flex justify-between items-center";

  const subMenu =
    "ml-4 mt-2 flex flex-col gap-2";

  const subMenuItem =
    "px-3 py-2 rounded-md bg-yellow-50 text-gray-800 hover:bg-yellow-600 hover:text-white transition-all";

  return (
    <div className="w-[250px] h-screen bg-[#f9f5f0] p-5 font-['Trebuchet_MS'] text-gray-800">
      
      {/* Product */}
      <div
        className={menuItem}
        onClick={() => toggleMenu("product")}
      >
        <span>Product</span>
        <span>{openMenu === "product" ? "▲" : "▼"}</span>
      </div>
      {openMenu === "product" && (
        <div className={subMenu}>
          <Link to="/admin/addproduct" className={subMenuItem}>
            Add Product
          </Link>
          <Link to="/admin/seeproduct" className={subMenuItem}>
            See Product
          </Link>
          <Link to="/admin/editproduct" className={subMenuItem}>
            Edit Product
          </Link>
          <Link to="/admin/deleteproduct" className={subMenuItem}>
            Delete Product
          </Link>
        </div>
      )}

      {/* Navbar */}
      {/* <div
        className={menuItem}
        onClick={() => setnavabrmenu(!navbarmenu)}
      >
        <span>Navbar</span>
        <span>{navbarmenu ? "▲" : "▼"}</span>
      </div>
      {navbarmenu && (
        <div className={subMenu}>
          <Link to="/admin/addnavbaritem" className={subMenuItem}>
            Add Navbar Item
          </Link>
          <Link to="/admin/seenavbaritem" className={subMenuItem}>
            See Navbar Item
          </Link>
          <Link to="/admin/editnavbaritem" className={subMenuItem}>
            Edit Navbar Item
          </Link>
          <Link to="/admin/deletenavbaritem" className={subMenuItem}>
            Delete Navbar Item
          </Link>
        </div>
      )} */}

      {/* Category */}
      <div
        className={menuItem}
        onClick={() => toggleMenu("category")}
      >
        <span>Category</span>
        <span>{openMenu === "category" ? "▲" : "▼"}</span>
      </div>
      {openMenu === "category" && (
        <div className={subMenu}>
          <Link to="/admin/createcategory" className={subMenuItem}>
            Add Category
          </Link>
          <Link to="/admin/seecategory" className={subMenuItem}>
            See Category
          </Link>
          {/* <Link to="/admin/editcategory" className={subMenuItem}>
            Edit Category
          </Link>
          <Link to="/admin/deletecategory" className={subMenuItem}>
            Delete Category
          </Link> */}
        </div>
      )}

      {/* <div
        className={menuItem}
        onClick={() => setimagemnu(!categorymenu)}
      >
        <span>Image</span>
        <span>{imagemenu ? "▲" : "▼"}</span>
      </div>
      {imagemenu && (
        <div className={subMenu}>
          <Link to="/admin/uploadproductimage/${productId}" className={subMenuItem}>
            Add Image
          </Link> */}
          {/* <Link to="/admin/seecategory" className={subMenuItem}>
            See Category
          </Link>
          <Link to="/admin/editcategory" className={subMenuItem}>
            Edit Category
          </Link>
          <Link to="/admin/deletecategory" className={subMenuItem}>
            Delete Category
          </Link> */}
        {/* </div>
      )} */}

      <div
        className={menuItem}
        onClick={() => toggleMenu("subcategory")}
      >
        <span>SubCategory</span>
        <span>{openMenu === "subcategory" ? "▲" : "▼"}</span>
      </div>
      {openMenu === "subcategory" && (
        <div className={subMenu}>
          <Link to="/admin/createsubcategory" className={subMenuItem}>
            Add SubCategory
          </Link>
          <Link to="/admin/seesubcategory" className={subMenuItem}>
            See SubCategory
          </Link>
          {/* <Link to="/admin/editcategory" className={subMenuItem}>
            Edit SubCategory
          </Link>
          <Link to="/admin/deletecategory" className={subMenuItem}>
            Delete SubCategory
          </Link> */}
        </div>
      )}

    </div>
  );
};

export default Sidebar;
