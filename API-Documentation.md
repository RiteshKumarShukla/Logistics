## API Documentation

### User Routes

#### Signup
- **URL:** `/api/users/signup`
- **Method:** `POST`
- **Request Body:** `{ username, email, password }`
- **Response:** `201 Created` with `{ message: "User registered successfully" }`

#### Login
- **URL:** `/api/users/login`
- **Method:** `POST`
- **Request Body:** `{ email, password }`
- **Response:** `200 OK` with `{ token }`

### Customers Routes

#### Get Customers
- **URL:** `/api/customers`
- **Method:** `GET`
- **Response:** `200 OK` with array of customer objects

#### Create Customer
- **URL:** `/api/customers`
- **Method:** `POST`
- **Request Body:** `{ name, ...other properties }`
- **Response:** `201 Created` with created customer object

#### Update Customer
- **URL:** `/api/customers/:id`
- **Method:** `PUT`
- **Request Parameters:** `id`
- **Request Body:** `{ name, ...other updated properties }`
- **Response:** `200 OK` with updated customer object

#### Delete Customer
- **URL:** `/api/customers/:id`
- **Method:** `DELETE`
- **Request Parameters:** `id`
- **Response:** `200 OK` with `{ message: "Customer deleted successfully" }`

### Delivery Vehicle Routes

#### Get Delivery Vehicles
- **URL:** `/api/delivery-vehicles`
- **Method:** `GET`
- **Response:** `200 OK` with array of delivery vehicle objects

#### Create Delivery Vehicle
- **URL:** `/api/delivery-vehicles`
- **Method:** `POST`
- **Request Body:** `{ type, ...other properties }`
- **Response:** `201 Created` with created delivery vehicle object

#### Update Delivery Vehicle
- **URL:** `/api/delivery-vehicles/:id`
- **Method:** `PUT`
- **Request Parameters:** `id`
- **Request Body:** `{ type, ...other updated properties }`
- **Response:** `200 OK` with updated delivery vehicle object

#### Delete Delivery Vehicle
- **URL:** `/api/delivery-vehicles/:id`
- **Method:** `DELETE`
- **Request Parameters:** `id`
- **Response:** `200 OK` with `{ message: "Delivery vehicle deleted successfully" }`

### Item Routes

#### Get Items
- **URL:** `/api/items`
- **Method:** `GET`
- **Response:** `200 OK` with array of item objects

#### Get Item by ID
- **URL:** `/api/items/:id`
- **Method:** `GET`
- **Request Parameters:** `id`
- **Response:** `200 OK` with item object or `404 Not Found`

#### Create Item
- **URL:** `/api/items`
- **Method:** `POST`
- **Request Body:** `{ name, ...other properties }`
- **Response:** `201 Created` with created item object

#### Update Item
- **URL:** `/api/items/:id`
- **Method:** `PUT`
- **Request Parameters:** `id`
- **Request Body:** `{ name, ...other updated properties }`
- **Response:** `200 OK` with updated item object

#### Delete Item
- **URL:** `/api/items/:id`
- **Method:** `DELETE`
- **Request Parameters:** `id`
- **Response:** `200 OK` with `{ message: "Item deleted successfully" }`

### Order Routes

#### Get Orders
- **URL:** `/api/orders`
- **Method:** `GET`
- **Response:** `200 OK` with array of order objects

#### Create Order
- **URL:** `/api/orders`
- **Method:** `POST`
- **Request Body:** `{ customer, ...other properties }`
- **Response:** `201 Created` with created order object

#### Update Order
- **URL:** `/api/orders/:id`
- **Method:** `PUT`
- **Request Parameters:** `id`
- **Request Body:** `{ customer, ...other updated properties }`
- **Response:** `200 OK` with updated order object

#### Delete Order
- **URL:** `/api/orders/:id`
- **Method:** `DELETE`
- **Request Parameters:** `id`
- **Response:** `200 OK` with `{ message: "Order deleted successfully" }`

#### Patch Order
- **URL:** `/api/orders/:id`
- **Method:** `PATCH`
- **Request Parameters:** `id`
- **Request Body:** `{ isDelivered }`
- **Response:** `200 OK` with updated order object
