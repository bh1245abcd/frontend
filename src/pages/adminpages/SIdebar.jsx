// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   // const [showProductMenu, setShowProductMenu] = useState(false);
//   // const [navbarmenu, setnavabrmenu] = useState(false);
//   // const [categorymenu, setcategorymenu] = useState(false);
//   // const [subcategorymenu, setsubcategorymenu] = useState(false);
//   // const [imagemenu,setimagemnu] = useState(false)

//   const [openMenu, setOpenMenu] = useState(null);

//   const toggleMenu = (menu) => {
//   setOpenMenu(openMenu === menu ? null : menu);
//   };


//   const menuItem =
//     "px-4 py-3 rounded-md cursor-pointer mb-2 font-medium transition-all hover:bg-yellow-600 hover:text-white flex justify-between items-center";

//   const subMenu =
//     "ml-4 mt-2 flex flex-col gap-2";

//   const subMenuItem =
//     "px-3 py-2 rounded-md bg-yellow-50 text-gray-800 hover:bg-yellow-600 hover:text-white transition-all";

//   return (
//     <div className="w-[250px] h-screen bg-[#f9f5f0] p-5 font-['Trebuchet_MS'] text-gray-800">
      
//       {/* Product */}
//       <div
//         className={menuItem}
//         onClick={() => toggleMenu("product")}
//       >
//         <span>Product</span>
//         <span>{openMenu === "product" ? "▲" : "▼"}</span>
//       </div>
//       {openMenu === "product" && (
//         <div className={subMenu}>
//           <Link to="/admin/addproduct" className={subMenuItem}>
//             Add Product
//           </Link>
//           <Link to="/admin/seeproduct" className={subMenuItem}>
//             See Product
//           </Link>
//           <Link to="/admin/editproduct" className={subMenuItem}>
//             Edit Product
//           </Link>
//           <Link to="/admin/deleteproduct" className={subMenuItem}>
//             Delete Product
//           </Link>
//         </div>
//       )}

//       {/* Navbar */}
//       {/* <div
//         className={menuItem}
//         onClick={() => setnavabrmenu(!navbarmenu)}
//       >
//         <span>Navbar</span>
//         <span>{navbarmenu ? "▲" : "▼"}</span>
//       </div>
//       {navbarmenu && (
//         <div className={subMenu}>
//           <Link to="/admin/addnavbaritem" className={subMenuItem}>
//             Add Navbar Item
//           </Link>
//           <Link to="/admin/seenavbaritem" className={subMenuItem}>
//             See Navbar Item
//           </Link>
//           <Link to="/admin/editnavbaritem" className={subMenuItem}>
//             Edit Navbar Item
//           </Link>
//           <Link to="/admin/deletenavbaritem" className={subMenuItem}>
//             Delete Navbar Item
//           </Link>
//         </div>
//       )} */}

//       {/* Category */}
//       <div
//         className={menuItem}
//         onClick={() => toggleMenu("category")}
//       >
//         <span>Category</span>
//         <span>{openMenu === "category" ? "▲" : "▼"}</span>
//       </div>
//       {openMenu === "category" && (
//         <div className={subMenu}>
//           <Link to="/admin/createcategory" className={subMenuItem}>
//             Add Category
//           </Link>
//           <Link to="/admin/seecategory" className={subMenuItem}>
//             See Category
//           </Link>
//           {/* <Link to="/admin/editcategory" className={subMenuItem}>
//             Edit Category
//           </Link>
//           <Link to="/admin/deletecategory" className={subMenuItem}>
//             Delete Category
//           </Link> */}
//         </div>
//       )}

//       {/* <div
//         className={menuItem}
//         onClick={() => setimagemnu(!categorymenu)}
//       >
//         <span>Image</span>
//         <span>{imagemenu ? "▲" : "▼"}</span>
//       </div>
//       {imagemenu && (
//         <div className={subMenu}>
//           <Link to="/admin/uploadproductimage/${productId}" className={subMenuItem}>
//             Add Image
//           </Link> */}
//           {/* <Link to="/admin/seecategory" className={subMenuItem}>
//             See Category
//           </Link>
//           <Link to="/admin/editcategory" className={subMenuItem}>
//             Edit Category
//           </Link>
//           <Link to="/admin/deletecategory" className={subMenuItem}>
//             Delete Category
//           </Link> */}
//         {/* </div>
//       )} */}

//       <div
//         className={menuItem}
//         onClick={() => toggleMenu("subcategory")}
//       >
//         <span>SubCategory</span>
//         <span>{openMenu === "subcategory" ? "▲" : "▼"}</span>
//       </div>
//       {openMenu === "subcategory" && (
//         <div className={subMenu}>
//           <Link to="/admin/createsubcategory" className={subMenuItem}>
//             Add SubCategory
//           </Link>
//           <Link to="/admin/seesubcategory" className={subMenuItem}>
//             See SubCategory
//           </Link>
//           {/* <Link to="/admin/editcategory" className={subMenuItem}>
//             Edit SubCategory
//           </Link>
//           <Link to="/admin/deletecategory" className={subMenuItem}>
//             Delete SubCategory
//           </Link> */}
//         </div>
//       )}

//     </div>
//   );
// };

// export default Sidebar;




import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const toggleSubMenu = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  const menuItem =
    "px-4 py-3 rounded-md cursor-pointer mb-2 text-sm font-medium flex justify-between items-center text-gray-800 hover:bg-[#faedcd] hover:text-white transition";

  const subMenu = "ml-3 mt-2 flex flex-col gap-2";

  const subMenuItem =
    "px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition";

  return (
   <aside className="w-[250px] bg-[#f9f5f0] h-screen overflow-y-auto no-scrollbar  border-r border-gray-200 p-5">


      {/* ////////////////  Dashboard /////////////////////*/}

      <div className={menuItem} onClick={() => toggleMenu("Dashboard")}>
        <span>Dashboard</span>
        <span className="text-xs">
          {openMenu === "Dashboard" ? "▲" : "▼"}
        </span>
      </div>

      {openMenu === "Dashboard" && (
        <div className={subMenu}>
          <Link to="" className={subMenuItem} onClick={() => alert("Sales clicked!")}>
            Sales
          </Link>
          <Link to="" className={subMenuItem} onClick={() => alert("Orders clicked!")}>
            Orders
          </Link>
          <Link to="" className={subMenuItem} onClick={() => alert("Visitors clicked!")}>
            Visitors
          </Link>
        </div>
      )}


      {/* ////////////////  PRODUCT /////////////////////*/}

      {/* PRODUCT */}
      <div className={menuItem} onClick={() => toggleMenu("product")}>
        <span>Product</span>
        <span className="text-xs">
          {openMenu === "product" ? "▲" : "▼"}
        </span>
      </div>

      {openMenu === "product" && (
        <div className={subMenu}>

          {/* 🔹 Product Management */}
          <div
            className={subMenuItem + " flex justify-between items-center cursor-pointer"}
            onClick={() => toggleSubMenu("management")}
          >
            <span>Product Management</span>
            <span>{openSubMenu === "management" ? "▲" : "▼"}</span>
          </div>

          {openSubMenu === "management" && (
            <div className="ml-4 flex flex-col gap-1">
              <Link to="/admin/addproduct" className={subMenuItem}>
                Add Product
              </Link>
              <Link to="/admin/seeproduct" className={subMenuItem}>
                All Product
              </Link>
              <Link to="/admin/editproduct" className={subMenuItem}>
                Edit Product
              </Link>
              <Link to="/admin/deleteproduct" className={subMenuItem}>
                Delete Product
              </Link>
              <Link to="" className={subMenuItem} onClick={() => alert("Categorie clicked!")}>
                Categorie
              </Link>
              <Link to="" className={subMenuItem}  onClick={() => alert("Brand clicked!")}> 
                Brand
              </Link>
              <Link to="" className={subMenuItem}  onClick={() => alert("Attribute clicked!")}>
                Attribute
              </Link>
              <Link to="" className={subMenuItem}  onClick={() => alert("Inventory Management clicked!")}>
                Inventory Management
              </Link>
              <Link to="" className={subMenuItem}  onClick={() => alert("Bulk Import/Export clicked!")}>
                Bulk Import/Export
              </Link>
            </div>
          )}

          {/* 🔹 Reviews & Ratings */}
          <div
            className={subMenuItem + " flex justify-between items-center cursor-pointer"}
            onClick={() => toggleSubMenu("reviews")}
          >
            <span>Reviews & Ratings</span>
            <span>{openSubMenu === "reviews" ? "▲" : "▼"}</span>
          </div>

          {openSubMenu === "reviews" && (
            <div className="ml-4 flex flex-col gap-1">
              <Link to="" className={subMenuItem} onClick={() => alert("Product Reviews clicked!")}>
                Product Reviews
              </Link>
              <Link to="" className={subMenuItem} onClick={() => alert("Review Approval Request clicked!")}>
                Review Approval Request
              </Link>
            </div>
          )}

        </div>
      )}

      {/* ////////////////  CATEGORY /////////////////////*/}

      {/* CATEGORY */}
      <div className={menuItem} onClick={() => toggleMenu("category")}>
        <span>Category</span>
        <span className="text-xs">
          {openMenu === "category" ? "▲" : "▼"}
        </span>
      </div>

      {openMenu === "category" && (
        <div className={subMenu}>
          <Link to="/admin/createcategory" className={subMenuItem}>
            Add Category
          </Link>
          <Link to="/admin/seecategory" className={subMenuItem}>
            See Category
          </Link>
        </div>
      )}

      {/* ////////////////  SUBCATEGORY /////////////////////*/}

      {/* SUBCATEGORY */}
      <div className={menuItem} onClick={() => toggleMenu("subcategory")}>
        <span>SubCategory</span>
        <span className="text-xs">
          {openMenu === "subcategory" ? "▲" : "▼"}
        </span>
      </div>

      {openMenu === "subcategory" && (
        <div className={subMenu}>
          <Link to="/admin/createsubcategory" className={subMenuItem}>
            Add SubCategory
          </Link>
          <Link to="/admin/seesubcategory" className={subMenuItem}>
            See SubCategory
          </Link>
        </div>
      )}

      {/* ////////////////  Orders /////////////////////*/}


      {/* Orders */}
      <div className={menuItem} onClick={() => toggleMenu("Orders")}>
        <span>Orders</span>
        <span className="text-xs">
          {openMenu === "Orders" ? "▲" : "▼"}
        </span>
      </div>

      {openMenu === "Orders" && (
        <div className={subMenu}>

          {/* 🔹 Product Management */}
          <div
            className={subMenuItem + " flex justify-between items-center cursor-pointer"}
            onClick={() => toggleSubMenu("management")}
          >
            <span>Order Management </span>
            <span>{openSubMenu === "management" ? "▲" : "▼"}</span>
          </div>

          {openSubMenu === "management" && (
            <div className="ml-4 flex flex-col gap-1">
              <Link to="" className={subMenuItem} onClick={() => alert("All Orders clicked!")}>
                All Orders
              </Link>
              <Link to="" className={subMenuItem} onClick={() => alert("Pending clicked!")}>
                Pending
              </Link>
              <Link to="" className={subMenuItem} onClick={() => alert("Processing clicked!")}>
                Processing
              </Link>
              <Link to="" className={subMenuItem} onClick={() => alert("Completed clicked!")}>
                Completed
              </Link>
              <Link to="" className={subMenuItem} onClick={() => alert("Cancelled clicked!")}>
                Cancelled
              </Link>
              <Link to="" className={subMenuItem} onClick={() => alert("Return & Refund clicked!")}>
                Return & Refund
              </Link>
            </div>
          )}

          {/* 🔹 Reviews & Ratings */}
          <div
            className={subMenuItem + " flex justify-between items-center cursor-pointer"}
            onClick={() => toggleSubMenu("Transactions")}
          >
            <span>Transactions </span>
            <span>{openSubMenu === "Transactions" ? "▲" : "▼"}</span>
          </div>

          {openSubMenu === "Transactions" && (
            <div className="ml-4 flex flex-col gap-1">
              <Link to="" className={subMenuItem}  onClick={() => alert("Payment History clicked!")}>
                Payment History
              </Link>
              <Link to="" className={subMenuItem}  onClick={() => alert("Refund Policy clicked!")}>
                Refund Policy
              </Link>
            </div>
          )}
        </div>
      )}


      {/* ////////////////  Customers /////////////////////*/}

      {/* Customers */}
      <div className={menuItem} onClick={() => toggleMenu("Customers")}>
        <span>Customers</span>
        <span className="text-xs">
          {openMenu === "Customers" ? "▲" : "▼"}
        </span>
      </div>

      {/* ✅ Customers ke andar likho */}
      {openMenu === "Customers" && (
        <div className={subMenu}>
          <div
            className={subMenuItem + " flex justify-between items-center cursor-pointer"}
            onClick={() => toggleSubMenu("customerManagement")}
          >
            <span>Customer Management</span>
            <span>{openSubMenu === "customerManagement" ? "▲" : "▼"}</span>
          </div>

          {openSubMenu === "customerManagement" && (
            <div className="ml-4 flex flex-col gap-1">
              <Link to="" className={subMenuItem}  onClick={() => alert("All Customers clicked!")}>
                All Customers
              </Link>
              <Link to="" className={subMenuItem}  onClick={() => alert("Customer Groups clicked!")}>
                Customer Groups
              </Link>
              <Link to="" className={subMenuItem}  onClick={() => alert("Feedback & Inquiries clicked!")}>
                Feedback & Inquiries
              </Link>
            </div>
          )}

          <div
            className={subMenuItem + " flex justify-between items-center cursor-pointer"}
            onClick={() => toggleSubMenu("Royalty & Rewards")}
          >
            <span>Royalty & Rewards </span>
            <span>{openSubMenu === "Royalty & Rewards" ? "▲" : "▼"}</span>
          </div>

          {openSubMenu === "Royalty & Rewards" && (
            <div className="ml-4 flex flex-col gap-1">
              <Link to="" className={subMenuItem} onClick={() => alert("Reward Points clicked!")}>
                Reward Points
              </Link>
              <Link to="" className={subMenuItem} onClick={() => alert("Coupons & Discounts clicked!")}>
                Coupons & Discounts
              </Link>
            </div>
          )}
        </div>
      )}

      {/* ////////////////  Marketing /////////////////////*/}

      {/* Marketing */}
      <div className={menuItem} onClick={() => toggleMenu("Marketing")}>
        <span>Marketing</span>
        <span className="text-xs">
          {openMenu === "Marketing" ? "▲" : "▼"}
        </span>
      </div>

      {/*  Customers ke andar likho */}
      {openMenu === "Marketing" && (
        <div className={subMenu}>
          <div
            className={subMenuItem + " flex justify-between items-center cursor-pointer"}
            onClick={() => toggleSubMenu("Promotions")}
          >
            <span>Promotions </span>
            <span>{openSubMenu === "Promotions " ? "▲" : "▼"}</span>
          </div>

          {openSubMenu === "Promotions" && (
            <div className="ml-4 flex flex-col gap-1">
              <Link to="" className={subMenuItem} onClick={() => alert("Discount Coupons clicked!")}>
                Discount Coupons
              </Link>
              <Link to="" className={subMenuItem} onClick={() => alert("Flash Sales clicked!")}>
                Flash Sales
              </Link>
              <Link to="" className={subMenuItem} onClick={() => alert("Bundle Offers clicked!")}>
                Bundle Offers
              </Link>
            </div>
          )}

          <div
            className={subMenuItem + " flex justify-between items-center cursor-pointer"}
            onClick={() => toggleSubMenu("Email Campaigns")}
          >
            <span>Email Campaigns</span>
            <span>{openSubMenu === "Email Campaigns" ? "▲" : "▼"}</span>
          </div>

          {openSubMenu === "Email Campaigns" && (
            <div className="ml-4 flex flex-col gap-1">
              <Link to="" className={subMenuItem}  onClick={() => alert("Newsletter Subscribers clicked!")}>
                Newsletter Subscribers
              </Link>
              <Link to="" className={subMenuItem}  onClick={() => alert("Email Templates clicked!")}>
                Email Templates
              </Link>
            </div>
          )}


          <div
            className={subMenuItem + " flex justify-between items-center cursor-pointer"}
            onClick={() => toggleSubMenu("SEO & Advertising")}
          >
            <span>SEO & Advertising</span>
            <span>{openSubMenu === "SEO & Advertising" ? "▲" : "▼"}</span>
          </div>

          {openSubMenu === "SEO & Advertising" && (
            <div className="ml-4 flex flex-col gap-1">
              <Link to="" className={subMenuItem}  onClick={() => alert("SEO Settings clicked!")}>
                SEO Settings
              </Link>
              <Link to="" className={subMenuItem}  onClick={() => alert("Google Ads Integration clicked!")}>
                Google Ads Integration
              </Link>
            </div>
          )}
        </div>
      )}

      {/* ////////////////  Content Management /////////////////////*/}

      {/* Content Management */}
      <div className={menuItem} onClick={() => toggleMenu("Content Management")}>
        <span>Content Management</span>
        <span className="text-xs">
          {openMenu === "Content Management" ? "▲" : "▼"}
        </span>
      </div>

      {/*  Content Management ke andar likho */}
      {openMenu === "Content Management" && (
        <div className={subMenu}>
          <div
            className={subMenuItem + " flex justify-between items-center cursor-pointer"}
            onClick={() => toggleSubMenu("Pages")}
          >
            <span>Pages</span>
            <span>{openSubMenu === "Pages" ? "▲" : "▼"}</span>
          </div>

          {openSubMenu === "Pages" && (
            <div className="ml-4 flex flex-col gap-1">
              <Link to="" className={subMenuItem} onClick={() => alert("Homepage clicked!")}>
                Homepage
              </Link>
              <Link to="" className={subMenuItem} onClick={() => alert("About Us clicked!")}>
                About Us
              </Link>
              <Link to="" className={subMenuItem} onClick={() => alert("Contact Us clicked!")}>
                Contact Us
              </Link>
              <Link to="" className={subMenuItem} onClick={() => alert("FAQ clicked!")}> 
                FAQ
              </Link>
            </div>
          )}

          <div
            className={subMenuItem + " flex justify-between items-center cursor-pointer"}
            onClick={() => toggleSubMenu("Blog")}
          >
            <span>Blog</span>
            <span>{openSubMenu === "Blog" ? "▲" : "▼"}</span>
          </div>

          {openSubMenu === "Blog" && (
            <div className="ml-4 flex flex-col gap-1">
              <Link to="" className={subMenuItem} onClick={() => alert("All Blog Posts clicked!")}>
                All Blog Posts
              </Link>
              <Link to="" className={subMenuItem} onClick={() => alert("Blog Categories clicked!")}>
                Blog Categories
              </Link>
              <Link to="" className={subMenuItem} onClick={() => alert("Readers Comments clicked!")}>
                Readers Comments
              </Link>
            </div>
          )}

          <div
            className={subMenuItem + " flex justify-between items-center cursor-pointer"}
            onClick={() => toggleSubMenu("Banners & Sliders")}
          >
            <span>Banners & Sliders </span>
            <span>{openSubMenu === "Banners & Sliders" ? "▲" : "▼"}</span>
          </div>

          {openSubMenu === "Banners & Sliders" && (
            <div className="ml-4 flex flex-col gap-1">
              <Link to="" className={subMenuItem} onClick={() => alert("Homepage Banners clicked!")}>
                Homepage Banners
              </Link>
              <Link to="" className={subMenuItem} onClick={() => alert("Promotional Sliders clicked!")}>
                Promotional Sliders
              </Link>
            </div>
          )}
        </div>
      )}


      {/* ////////////////  Reports & Analytics /////////////////////*/}

      {/* Reports & Analytics */}
      <div className={menuItem} onClick={() => toggleMenu("Reports & Analytics")}>
        <span>Reports & Analytics</span>
        <span className="text-xs">
          {openMenu === "Reports & Analytics" ? "▲" : "▼"}
        </span>
      </div>

      {/*  Content Management ke andar likho */}
      {openMenu === "Reports & Analytics" && (
        <div className={subMenu}>
          <div
            className={subMenuItem + " flex justify-between items-center cursor-pointer"}
            onClick={() => toggleSubMenu("Sales Reports")}
          >
            <span>Pages</span>
            <span>{openSubMenu === "Sales Reports" ? "▲" : "▼"}</span>
          </div>

          {openSubMenu === "Sales Reports" && (
            <div className="ml-4 flex flex-col gap-1">
              <Link to="" className={subMenuItem} onClick={() => alert("Daily clicked!")}>
                Daily
              </Link>
              <Link to="" className={subMenuItem} onClick={() => alert("Weekly clicked!")}>
                Weekly
              </Link>
              <Link to="" className={subMenuItem} onClick={() => alert("Monthly clicked!")}>
                Monthly
              </Link>
            </div>
          )}

          <div
            className={subMenuItem + " flex justify-between items-center cursor-pointer"}
            onClick={() => toggleSubMenu("Customer Analytics")}
          >
            <span>Customer Analytics</span>
            <span>{openSubMenu === "Customer Analytics" ? "▲" : "▼"}</span>
          </div>

          {openSubMenu === "Customer Analytics" && (
            <div className="ml-4 flex flex-col gap-1">
              <Link to="" className={subMenuItem} onClick={() => alert("Behaviour Tracking clicked!")}>
                Behaviour Tracking
              </Link>
              <Link to="" className={subMenuItem} onClick={() => alert("Retention Analysis clicked!")}>
                Retention Analysis
              </Link>
            </div>
          )}

          <div
            className={subMenuItem + " flex justify-between items-center cursor-pointer"}
            onClick={() => toggleSubMenu("Traffic Analysis")}
          >
            <span>Traffic Analysis</span>
            <span>{openSubMenu === "Traffic Analysis" ? "▲" : "▼"}</span>
          </div>

          {openSubMenu === "Traffic Analysis" && (
            <div className="ml-4 flex flex-col gap-1">
              <Link to="" className={subMenuItem}  onClick={() => alert("Page Views clicked!")}>
                Page Views
              </Link>
              <Link to="" className={subMenuItem}  onClick={() => alert("Traffic Sources clicked!")}>
                Traffic Sources
              </Link>
            </div>
          )}
        </div>
      )}


      {/* ////////////////  Settings /////////////////////*/}
      
      {/* Settings */}
      <div className={menuItem} onClick={() => toggleMenu("Settings")}>
        <span>Settings</span>
        <span className="text-xs">
          {openMenu === "Settings" ? "▲" : "▼"}
        </span>
      </div>

      {openMenu === "Settings" && (
        <div className={subMenu}>

          {/* General Configuration */}
          <div
            className={subMenuItem + " flex justify-between items-center cursor-pointer"}
            onClick={() => toggleSubMenu("GeneralConfiguration")}
          >
            <span>General Configuration</span>
            <span>{openSubMenu === "GeneralConfiguration" ? "▲" : "▼"}</span>
          </div>

          {openSubMenu === "GeneralConfiguration" && (
            <div className="ml-4 flex flex-col gap-1">
              <Link to="#" className={subMenuItem}>Store Info</Link>
              <Link to="#" className={subMenuItem}>Currency & Language</Link>
            </div>
          )}

          {/* Payment Settings */}
          <div
            className={subMenuItem + " flex justify-between items-center cursor-pointer"}
            onClick={() => toggleSubMenu("PaymentSettings")}
          >
            <span>Payment Settings</span>
            <span>{openSubMenu === "PaymentSettings" ? "▲" : "▼"}</span>
          </div>

          {openSubMenu === "PaymentSettings" && (
            <div className="ml-4 flex flex-col gap-1">
              <Link to="#" className={subMenuItem}>Paypal</Link>
              <Link to="#" className={subMenuItem}>Stripe</Link>
              <Link to="#" className={subMenuItem}>COD</Link>
            </div>
          )}

          {/* Shipping */}
          <div
            className={subMenuItem + " flex justify-between items-center cursor-pointer"}
            onClick={() => toggleSubMenu("ShippingDelivery")}
          >
            <span>Shipping & Delivery</span>
            <span>{openSubMenu === "ShippingDelivery" ? "▲" : "▼"}</span>
          </div>

          {openSubMenu === "ShippingDelivery" && (
            <div className="ml-4 flex flex-col gap-1">
              <Link to="#" className={subMenuItem}>Shipping Zones</Link>
              <Link to="#" className={subMenuItem}>Delivery Methods</Link>
            </div>
          )}

          {/* Admin */}
          <div
            className={subMenuItem + " flex justify-between items-center cursor-pointer"}
            onClick={() => toggleSubMenu("ad")}
          >
            <span>Admin Management</span>
            <span>{openSubMenu === "ad" ? "▲" : "▼"}</span>
          </div>

          {openSubMenu === "ad" && (
            <div className="ml-4 flex flex-col gap-1">
              <Link to="#" className={subMenuItem}>Roles</Link>
              <Link to="#" className={subMenuItem}>Permissions</Link>
              <Link to="#" className={subMenuItem}>Activity Logs</Link>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
