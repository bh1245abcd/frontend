<!-- COMMON API'S  -->
1) Register(POST) => /login/v1/signup

Json Body
{
    "username":"bhav",
    "password":"bhav48",
    "email":"bhav42@gmail.com",
    "role":"user"
}

Json Response
{
    "status": "success",
    "message": "User registered successfully",
    "data": {
        "userId": 4
    },
    "meta": null
}

2) login => /login/v1/login

Json Body
{
    "username":"bhav",
    "password":"bhav48",
    "role":"user"
}

Json Response
{
    "status": "success",
    "message": "Authentication successful",
    "data": {
        "role": "USER",
        "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiaGF2Iiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImN1c3RvbWVySWQiOiJDVVNUMjAyNjEwMDEiLCJ1c2VySWQiOjMsInVzZXJuYW1lIjoiYmhhdiIsImlhdCI6MTc2NzY3ODAwNSwiZXhwIjoxNzY3NjgxNjA1fQ.iJBUC3t013uNL_ZuP_cdMC3e_ne5msYLEjvcsMR80KU"
    },
    "meta": null
}

3) logout => /login/v1/logout

headers - Authorization(token) 
json body - null

json response
{
    "status": "success",
    "message": "Logout successful",
    "data": null,
    "meta": null
}

4) setnewpassowrd => /login/v1/setNewPassword

headers - Authorization(token) 
json body
{
  "username": "bhav",
  "password": "bhav48",
  "role": "user",
  "newPassword": "bhavyajain48"
}

json response
{
    "message": "Required request parameter 'token' for method parameter type String is not present",
    "statusCode": 500,
    "timestamp": "2026-01-06T18:23:41.162422588"
}

5) refrsh token => /login/v1/refreshToken

headers - Authorization(token) 
json body - null

json reponse(bad request)
{
    "status": "error",
    "message": "Token refresh failed: Token is not a refresh token",
    "data": null,
    "meta": {
        "errorName": "TOKEN_REFRESH_FAILED",
        "errorCode": 7008
    }
}
<!-- USER  API'S  -->

<!-- ORDER API'S -->
1) Create Order's(POST) => /vasaae/user/orders

headers - Authorization(token) 
json body
{
    "customerId": "CUST20261000",
    "items": [
        {
            "productId": 23,
            "quantity": 2,
            "unitPrice": 12345
        }
    ],
    "shippingAddress": {
        "street": "ramzan ji ka hatha",
        "city": "rajsthan",
        "state": "California",
        "zipCode": "32441",
        "country": "USA"
    }
    "paymentMethod": "CASH_ON_DELIVERY"
}
 
json response
{
    "message": "JSON parse error: Cannot deserialize value of type `java.lang.Long` from String \"CUST20261000\": not a valid `java.lang.Long` value",
    "statusCode": 500,
    "timestamp": "2026-01-06T18:18:44.043428085"
}

2)Get Orders's(GET) => 
3)Order Return(POST) =>
4)Get order by Id(GET) =>
5)Track Order(GET) =>
6)Order History(GET) =>
7)Order Cancel(PUT) =>

<!-- CART API'S -->
8) Add to Cart(POST) => /vasaae/user/cart/add

headers - Authorization(token) 
json body
{
  "itemId": 2,
  "productId": 2,
  "quantity": 2,
  "variantId": "default",
  "promoCode": "",
  "userId": 3
}

json response
{
    "status": "success",
    "message": "Item added to cart successfully",
    "data": {
        "items": [
            {
                "id": 2,
                "cartId": 1,
                "productId": 2,
                "quantity": 8,
                "unitPrice": 167400.0,
                "userId": 3,
                "totalPrice": 1339200.0
            },
            {
                "id": 3,
                "cartId": 1,
                "productId": 3,
                "quantity": 2,
                "unitPrice": 45000.0,
                "userId": 3,
                "totalPrice": 90000.0
            }
        ],
        "subtotal": 1429200.0,
        "tax": 142920.000,
        "shipping": 5.00,
        "discount": 0,
        "total": 1572125.000,
        "promoApplied": false
    },
    "meta": null
}

9) Apply Promo(POST) => /vasaae/user/cart/apply-promo

headers - Authorization(token) 
json body
{
  "productId": 2, 
  "quantity": 8, 
  "variantId": "",
  "promoCode": "",
  "itemId": 2, 
  "userId": 3
}

json response
{
    "status": "success",
    "message": "Promo code applied successfully",
    "data": {
        "subtotal": 0,
        "tax": 0.00,
        "shipping": 5.00,
        "total": 5.00,
        "promoApplied": false
    },
    "meta": null
}

10) Update Cart(PUT) => /vasaae/user/cart/update

headers - Authorization(token) 
json body
{
  "productId": 2, 
  "quantity": 8, 
  "variantId": "",
  "promoCode": "",
  "itemId": 2, 
  "userId": 3
}

json response
{
    "status": "success",
    "message": "Cart item updated successfully",
    "data": {
        "subtotal": 0,
        "tax": 0.00,
        "shipping": 5.00,
        "total": 5.00,
        "promoApplied": false
    },
    "meta": null
}

11) Get Cart items(GET) => /vasaae/user/cart

headers - Authorization(token) 
json body - null  

json response
{
    "status": "success",
    "message": "Cart retrieved successfully",
    "data": {
        "totalItems": 2,
        "totalPages": 1,
        "currentPage": 0,
        "items": [
            {
                "id": 2,
                "cartId": 1,
                "productId": 2,
                "quantity": 8,
                "unitPrice": 167400.0,
                "userId": 3,
                "totalPrice": 1339200.0
            },
            {
                "id": 3,
                "cartId": 1,
                "productId": 3,
                "quantity": 2,
                "unitPrice": 45000.0,
                "userId": 3,
                "totalPrice": 90000.0
            }
        ]
    },
    "meta": null
}

12) Remove Cartitems by Id(DELETE) => /vasaae/user/cart/remove/{itemId}

headers - Authorization(token) 
json body - null  

json response
{
    "status": "success",
    "message": "Item removed from cart successfully",
    "data": {
        "success": true
    },
    "meta": null
}

13) Clear Cartitems(DELETE) => /vasaae/user/cart/clear

headers - Authorization(token) 
json body - null  

json response
{
    "status": "success",
    "message": "Cart cleared successfully",
    "data": {
        "success": true
    },
    "meta": null
}

<!-- WISHLIST API'S -->
14) toggle favourite(POST) => 

json body - null 


15) Add to Wishlist(POST) => /vasaae/user/wishlist/add/{productId}

headers - Authorization(token) 
json body - null 

json response
{
    "message": "could not execute statement [Column 'user_id' cannot be null] [insert into wishlist_items (added_at,is_favorite,product_id,user_id) values (?,?,?,?)]; SQL [insert into wishlist_items (added_at,is_favorite,product_id,user_id) values (?,?,?,?)]; constraint [null]",
    "statusCode": 500,
    "timestamp": "2026-01-06T17:52:45.416582596"
}

16) See Wishlist(GET) =>

json body - Authorization(token)

json response
{
    "status": "success",
    "message": "Wishlist retrieved successfully",
    "data": [],
    "meta": null
}

<!-- 17)Delete Wishlist(DELETE) => -->

<!-- CHECKOUT API'S -->
18) shipping(POST) => /vaasee/user/checkout/shipping

headers - Authorization(token) 
json body

{
  "firstName": "Aarav",
  "lastName": "Sharma",
  "addressLine1": "12 MG Road",
  "addressLine2": "Near City Mall",
  "city": "Bengaluru",
  "state": "Karnataka",
  "postalCode": "560001",
  "country": "India",
  "phoneNumber": "9845012345",
  "shippingMethod": "Standard Delivery"
}

json response
{
    "status": "success",
    "message": "Shipping information saved successfully",
    "data": null,
    "meta": null
}

19) payment(POST) => /vaasee/user/checkout/payment

headers - Authorization(token) 
json body
{
  "paymentMethod": "cod",
  "savePaymentInfo": true
}

josn response
{
    "status": "success",
    "message": "Payment processed successfully",
    "data": null,
    "meta": null
}

20) shipping(GET) => /vaasee/user/checkout/shipping/methods

headers - Authorization(token) 
json body - null

json reponse
{
    "status": "success",
    "message": "Shipping methods retrieved successfully",
    "data": null,
    "meta": null
}

21) payment(GET) => /vaasee/user/checkout/payment/methods

headers - Authorization(token) 
json body - null

json reponse
{
    "status": "success",
    "message": "Payment methods retrieved successfully",
    "data": null,
    "meta": null
}

<!-- USER SIDE PRODUDCT API'S -->
22) categories(GET) => /vasaae/categories

json body - null

json response
{
    "status": "success",
    "message": "Categories retrieved successfully",
    "data": {
        "content": [
            {
                "id": 2,
                "name": "gold",
                "description": "Premium gold pieces with timeless beauty ",
                "imageUrl": null,
                "active": true,
                "createdAt": null,
                "updatedAt": null,
                "productCount": null
            },
            {
                "id": 4,
                "name": "gift",
                "description": "best occasionel gift for all types of gift",
                "imageUrl": null,
                "active": true,
                "createdAt": null,
                "updatedAt": null,
                "productCount": null
            },
            {
                "id": 5,
                "name": "Diamond",
                "description": "Elegant diamond designs symbolizing luxury, beauty, and eternal love",
                "imageUrl": null,
                "active": true,
                "createdAt": null,
                "updatedAt": null,
                "productCount": null
            },
            {
                "id": 8,
                "name": "office wear",
                "description": "Minimal designs perfect for office ",
                "imageUrl": null,
                "active": true,
                "createdAt": null,
                "updatedAt": null,
                "productCount": null
            }
        ],
        "pageable": {
            "pageNumber": 0,
            "pageSize": 10,
            "sort": {
                "sorted": false,
                "empty": true,
                "unsorted": true
            },
            "offset": 0,
            "paged": true,
            "unpaged": false
        },
        "totalElements": 4,
        "totalPages": 1,
        "last": true,
        "size": 10,
        "number": 0,
        "sort": {
            "sorted": false,
            "empty": true,
            "unsorted": true
        },
        "numberOfElements": 4,
        "first": true,
        "empty": false
    },
    "meta": null
}

23) category by id(GET) => /vasaae/categories/{categoryId}

json body - null

json response
{
    "status": "success",
    "message": "Category details retrieved successfully",
    "data": null,
    "meta": null
}

24) category product(GET) => /vasaae/categories/{categoryId}/products

json body - null

json response
{
    "status": "success",
    "message": "Products retrieved successfully",
    "data": [
        {
            "id": 3,
            "description": "fist product",
            "price": 45000.0,
            "subCategoryId": 4,
            "createdAt": "2026-01-05T10:29:58.047989",
            "updatedAt": "2026-01-05T10:29:58.048004",
            "category": null,
            "productName": "premuim gift matirel",
            "primaryImageUrl": null,
            "imageCount": null
        }
    ],
    "meta": null
}

25) subcategories(GET) => /vasaae/categories/subcategories

json body - null

json response

{
    "status": "success",
    "message": "Subcategory retrieved successfully",
    "data": {
        "content": [
            {
                "id": 3,
                "name": "gold nackelases",
                "description": "Elegant gold necklaces perfect for weddings",
                "categoryId": 2
            },
            {
                "id": 4,
                "name": "birthday gift",
                "description": "second subcateogry",
                "categoryId": 4
            },
            {
                "id": 5,
                "name": "Rings",
                "description": "Elegant diamond rings crafted for love, promise, and celebrations",
                "categoryId": 5
            },
            {
                "id": 6,
                "name": "Stud Earrings",
                "description": "Small elegant studs suitable for office",
                "categoryId": 8
            }
        ],
        "pageable": {
            "pageNumber": 0,
            "pageSize": 10,
            "sort": {
                "sorted": false,
                "empty": true,
                "unsorted": true
            },
            "offset": 0,
            "paged": true,
            "unpaged": false
        },
        "totalElements": 4,
        "totalPages": 1,
        "last": true,
        "size": 10,
        "number": 0,
        "sort": {
            "sorted": false,
            "empty": true,
            "unsorted": true
        },
        "numberOfElements": 4,
        "first": true,
        "empty": false
    },
    "meta": null
}

26) subcategory by id(GET) => /vasaae/categories/subcategory/{categoryId}

json body - null

json reponse
{
    "status": "success",
    "message": "Subcategories retrieved successfully",
    "data": {
        "currentPage": 0,
        "content": [
            {
                "id": 6,
                "name": "Stud Earrings",
                "description": "Small elegant studs suitable for office",
                "categoryId": 8
            }
        ],
        "totalPages": 1,
        "totalElements": 1
    },
    "meta": null
}

27) subcategory product(GET) => /vasaae/categories/{categoryId}/subcategories/{subCategoryId}/products

json body - null

json response
{
    "status": "success",
    "message": "Products retrieved successfully",
    "data": {
        "category": {
            "id": 2,
            "name": "gold",
            "description": "Premium gold pieces with timeless beauty ",
            "imageUrl": null,
            "active": true,
            "createdAt": null,
            "updatedAt": null,
            "productCount": null
        },
        "subcategory": null,
        "pagination": {
            "totalItems": 1,
            "totalPages": 1,
            "currentPage": 1,
            "pageSize": 20
        },
        "products": [
            {
                "id": 2,
                "name": "Elegant Gold Necklace",
                "description": "Elegant gold necklaces perfect for weddings and special occasion",
                "price": 167400.0,
                "stockQuantity": 14,
                "imageUrl": null,
                "active": true,
                "uploadBy": "admin",
                "createdAt": "2026-01-05T06:04:56.119584",
                "updatedAt": "2026-01-05T17:52:42.64671",
                "attributes": null,
                "categoryId": 2,
                "categoryName": "gold",
                "subCategoryId": 3,
                "subCategoryName": "gold nackelases",
                "images": [],
                "variants": []
            }
        ]
    },
    "meta": null
}

28) get categores by hierchy(GET) => /vasaae/categories/hierarchy

json body - null

json response
{
    "status": "success",
    "message": "Categories with subcategories retrieved successfully",
    "data": null,
    "meta": null
}

28) get categores by featured(GET) => /vasaae/categories/featured

json body - null

json response
{
    "status": "success",
    "message": "Featured categories retrieved successfully",
    "data": null,
    "meta": null
}

<!----------------------------------------------------------------------------------------------------->

<!-- ADMIN API'S  -->

<!-- CATEGORY API'S -->
1) Create Categorie(POST) => api/admin/categories

headers - Authorization(token) 
Json Body
{
    "name":"office wear",
    "description":"Minimal and classy designs perfect for office and workdays",
    "active":true
}

Json Response
{
    "status": "success",
    "message": "Category created successfully",
    "data": {
        "id": 6,
        "name": "office wear",
        "description": "Minimal and classy designs perfect for office and workdays",
        "imageUrl": null,
        "active": true,
        "createdAt": null,
        "updatedAt": null,
        "productCount": null
    },
    "meta": null
}


2) Get Categorie(GET) => /api/admin/categories


headers - Authorization(token) 
Json Body

json reponse
{
    "status": "success",
    "message": "Categories retrieved successfully",
    "data": {
        "content": [
            {
                "id": 2,
                "name": "gold",
                "description": "Premium gold pieces with timeless beauty ",
                "imageUrl": null,
                "active": true,
                "createdAt": null,
                "updatedAt": null,
                "productCount": null
            },
            {
                "id": 4,
                "name": "gift",
                "description": "best occasionel gift for all types of gift",
                "imageUrl": null,
                "active": true,
                "createdAt": null,
                "updatedAt": null,
                "productCount": null
            },
            {
                "id": 5,
                "name": "Diamond",
                "description": "Elegant diamond designs symbolizing luxury, beauty, and eternal love",
                "imageUrl": null,
                "active": true,
                "createdAt": null,
                "updatedAt": null,
                "productCount": null
            },
            {
                "id": 6,
                "name": "office wear",
                "description": "Minimal and classy designs perfect for office and workdays",
                "imageUrl": null,
                "active": true,
                "createdAt": null,
                "updatedAt": null,
                "productCount": null
            }
        ],
        "pageable": {
            "pageNumber": 0,
            "pageSize": 10,
            "sort": {
                "sorted": false,
                "empty": true,
                "unsorted": true
            },
            "offset": 0,
            "paged": true,
            "unpaged": false
        },
        "totalElements": 4,
        "totalPages": 1,
        "last": true,
        "size": 10,
        "number": 0,
        "sort": {
            "sorted": false,
            "empty": true,
            "unsorted": true
        },
        "numberOfElements": 4,
        "first": true,
        "empty": false
    },
    "meta": null
}

3) update Categorie (PUT) => api/admin/categories/{id}

headers - Authorization(token) 
json body

json reponse
{
    "status": "success",
    "message": "Category updated successfully",
    "data": {
        "id": 6,
        "name": "office wear",
        "description": "Minimal designs perfect for office ",
        "imageUrl": null,
        "active": true,
        "createdAt": null,
        "updatedAt": null,
        "productCount": null
    },
    "meta": null
}

4) delete Categorie(DELETE) => api/admin/categories/{id}

headers - Authorization(token) 
json body

json response
{
    "status": "success",
    "message": "Category deleted successfully",
    "data": null,
    "meta": null
}

5) Get Category By id(GET) =>  api/admin/categories/{id}

headers - Authorization(token) 
json body

json response
{
    "status": "success",
    "message": "Category Retrieved SuccessFully",
    "data": {
        "id": 6,
        "name": "office wear",
        "description": "Minimal designs perfect for office ",
        "imageUrl": null,
        "active": true,
        "createdAt": null,
        "updatedAt": null,
        "productCount": null
    },
    "meta": null
}

<!-- SUBCATEGORY API'S -->
6) Create SubCategorie(POST) => /api/admin/subcategories/category/{categoryId}

headers - Authorization(token) 
json body
{
    "name":"Stud Earrings",
    "description":"Small elegant studs suitable for office environments",
    "active":true
}

json response
{
    "status": "success",
    "message": "Subcategory created successfully",
    "data": {
        "id": 7,
        "name": "Stud Earrings",
        "description": "Small elegant studs suitable for office environments",
        "categoryId": 8
    },
    "meta": null
}

7) Get SubCategorie by id(GET) => /api/admin/subcategories/{id}

headers - Authorization(token) 
json body

json response
{
    "status": "success",
    "message": "Subcategory retrieved successfully",
    "data": {
        "id": 6,
        "name": "Lightweight Necklaces",
        "description": "Subtle necklaces designed for everyday office use ",
        "categoryId": 8
    },
    "meta": null
}

8) Get SubCategorie by Categoryid(GET) => /api/admin/subcategories/category/{categoryId}

headers - Authorization(token) 
json body


json response
{
    "status": "success",
    "message": "Subcategories retrieved successfully",
    "data": {
        "currentPage": 0,
        "content": [
            {
                "id": 6,
                "name": "Lightweight Necklaces",
                "description": "Subtle necklaces designed for everyday office use ",
                "categoryId": 8
            },
            {
                "id": 7,
                "name": "Stud Earrings",
                "description": "Small elegant studs suitable for office environments",
                "categoryId": 8
            }
        ],
        "totalPages": 1,
        "totalElements": 2
    },
    "meta": null
}

9) update SubCategorie(PUT) => /api/admin/subcategories/{id}

headers - Authorization(token) 
json body


json response
{
    "status": "success",
    "message": "Subcategory updated successfully",
    "data": {
        "id": 6,
        "name": "Stud Earrings",
        "description": "Small elegant studs suitable for office",
        "categoryId": 8
    },
    "meta": null
}

10) delete SubCategorie(DELETE) => /api/admin/subcategories/{id}

headers - Authorization(token) 
json body

json reponse
{
    "status": "success",
    "message": "Subcategory deleted successfully",
    "data": null,
    "meta": null
}

<!-- PRODUCT API'S -->
11) add Product(POST) => /api/admin/products

headers - Authorization(token) 
json body
{
    "name":"Classic Gold Stud Earrings",
    "description":"Minimal gold studs ideal for daily office wear",
    "price":14526,
    "stockQuantity":32,
    "categoryId":8,
    "subCategoryId":6
}

josn response
{
    "status": "success",
    "message": "Product created successfully",
    "data": {
        "id": 6,
        "name": "Classic Gold Stud Earrings",
        "description": "Minimal gold studs ideal for daily office wear",
        "price": 14526.0,
        "stockQuantity": 32,
        "imageUrl": null,
        "active": true,
        "createdAt": "2026-01-06T11:27:39.770777948",
        "updatedAt": "2026-01-06T11:27:39.770785718",
        "category": {
            "id": 8,
            "name": "office wear",
            "description": "Minimal designs perfect for office ",
            "active": true,
            "subcategories": []
        },
        "subCategory": {
            "id": 6,
            "name": "Stud Earrings",
            "description": "Small elegant studs suitable for office",
            "active": true
        }
    },
    "meta": null
}

12) Get Product(GET) => /api/admin/products

headers - Authorization(token) 
json body


json reponse
{
    "status": "success",
    "message": "Products retrieved successfully",
    "data": {
        "totalItems": 5,
        "totalPages": 1,
        "currentPage": 0,
        "items": [
            {
                "id": 2,
                "name": "Elegant Gold Necklace",
                "description": "Elegant gold necklaces perfect for weddings and special occasion",
                "price": 167400.0,
                "stockQuantity": 14,
                "imageUrl": null,
                "active": true,
                "createdAt": "2026-01-05T06:04:56.119584",
                "updatedAt": "2026-01-05T17:52:42.64671",
                "category": {
                    "id": 2,
                    "name": "gold",
                    "description": "Premium gold pieces with timeless beauty ",
                    "active": true,
                    "subcategories": []
                },
                "subCategory": {
                    "id": 3,
                    "name": "gold nackelases",
                    "description": "Elegant gold necklaces perfect for weddings",
                    "active": true
                }
            },
            {
                "id": 3,
                "name": "premuim gift matirel",
                "description": "fist product",
                "price": 45000.0,
                "stockQuantity": 21,
                "imageUrl": null,
                "active": true,
                "createdAt": "2026-01-05T10:29:58.047989",
                "updatedAt": "2026-01-05T10:29:58.048004",
                "category": {
                    "id": 4,
                    "name": "gift",
                    "description": "best occasionel gift for all types of gift",
                    "active": true,
                    "subcategories": []
                },
                "subCategory": {
                    "id": 4,
                    "name": "birthday gift",
                    "description": "second subcateogry",
                    "active": true
                }
            },
            {
                "id": 4,
                "name": "Diamond Rings",
                "description": "Elegant diamond rings crafted for timeless beauty and luxury",
                "price": 13000.0,
                "stockQuantity": 32,
                "imageUrl": null,
                "active": true,
                "createdAt": "2026-01-05T17:51:38.582392",
                "updatedAt": "2026-01-05T17:53:23.517677",
                "category": {
                    "id": 5,
                    "name": "Diamond",
                    "description": "Elegant diamond designs symbolizing luxury, beauty, and eternal love",
                    "active": true,
                    "subcategories": []
                },
                "subCategory": {
                    "id": 5,
                    "name": "Rings",
                    "description": "Elegant diamond rings crafted for love, promise, and celebrations",
                    "active": true
                }
            },
            {
                "id": 5,
                "name": "Solitaire Diamond Ring",
                "description": "Single diamond ring perfect for special occasions",
                "price": 35600.0,
                "stockQuantity": 32,
                "imageUrl": null,
                "active": true,
                "createdAt": "2026-01-06T05:31:04.56314",
                "updatedAt": "2026-01-06T05:31:04.563152",
                "category": {
                    "id": 5,
                    "name": "Diamond",
                    "description": "Elegant diamond designs symbolizing luxury, beauty, and eternal love",
                    "active": true,
                    "subcategories": []
                },
                "subCategory": {
                    "id": 5,
                    "name": "Rings",
                    "description": "Elegant diamond rings crafted for love, promise, and celebrations",
                    "active": true
                }
            },
            {
                "id": 6,
                "name": "Classic Gold Stud Earrings",
                "description": "Minimal gold studs ideal for daily office wear",
                "price": 14526.0,
                "stockQuantity": 32,
                "imageUrl": null,
                "active": true,
                "createdAt": "2026-01-06T11:27:39.770778",
                "updatedAt": "2026-01-06T11:27:39.770786",
                "category": {
                    "id": 8,
                    "name": "office wear",
                    "description": "Minimal designs perfect for office ",
                    "active": true,
                    "subcategories": []
                },
                "subCategory": {
                    "id": 6,
                    "name": "Stud Earrings",
                    "description": "Small elegant studs suitable for office",
                    "active": true
                }
            }
        ]
    },
    "meta": null
}

13) Get Product by Id(GET) => /api/admin/products/{id}

headers - Authorization(token) 
json body


josn response
{
    "status": "success",
    "message": "Products retrieved successfully",
    "data": {
        "id": 6,
        "name": "Classic Gold Stud Earrings",
        "description": "Minimal gold studs ideal for daily office wear",
        "price": 14526.0,
        "stockQuantity": 32,
        "imageUrl": null,
        "active": true,
        "createdAt": "2026-01-06T11:27:39.770778",
        "updatedAt": "2026-01-06T11:27:39.770786",
        "category": {
            "id": 8,
            "name": "office wear",
            "description": "Minimal designs perfect for office ",
            "active": true,
            "subcategories": []
        },
        "subCategory": {
            "id": 6,
            "name": "Stud Earrings",
            "description": "Small elegant studs suitable for office",
            "active": true
        }
    },
    "meta": null
}

14) Update Product(UPDATE) => /api/admin/products/{id}

headers - Authorization(token) 
json body

json response
{
    "status": "success",
    "message": "Products retrieved successfully",
    "data": {
        "id": 6,
        "name": "Classic Gold Stud Earrings",
        "description": "Minimal gold studs ideal for daily office wear",
        "price": 14526.0,
        "stockQuantity": 320,
        "imageUrl": null,
        "active": true,
        "createdAt": "2026-01-06T11:27:39.770778",
        "updatedAt": "2026-01-06T12:16:10.482798",
        "category": {
            "id": 8,
            "name": "office wear",
            "description": "Minimal designs perfect for office ",
            "active": true,
            "subcategories": []
        },
        "subCategory": {
            "id": 6,
            "name": "Stud Earrings",
            "description": "Small elegant studs suitable for office",
            "active": true
        }
    },
    "meta": null
}

15) delete Product(DELETE) => /api/admin/products/{id}

headers - Authorization(token) 
json body

json response
{
    "status": "success",
    "message": "Product deleted successfully",
    "data": null,
    "meta": null
}


