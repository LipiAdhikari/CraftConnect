Dear AI Agent: You are tasked with generating a full-stack MERN (MongoDB, Express, React, Node.js) web application. This project is a hackathon prototype for a Direct-to-Consumer (D2C) platform designed to eliminate middlemen for local craftsmen and prove product authenticity.

Read this entire document before generating any code. Strict adherence to these architectural choices, schemas, and UI/UX guidelines is mandatory.

1. Tech Stack
   Frontend: React 18 (initialized via Vite), Tailwind CSS, React Router DOM v6, Zustand (State Management), Axios, React Hot Toast, Lucide-React (Icons), React-QR-Code.

Backend: Node.js, Express.js.

Database: MongoDB Atlas, Mongoose.

Security & Utils: JWT (jsonwebtoken), bcryptjs, express-validator, CORS, dotenv.

Image Storage: Cloudinary (via multer).

2. Project Architecture & Folder Structure
   Use a monorepo-style structure with completely separate frontend and backend directories.

Plaintext
/
├── backend/
│ ├── config/ # db.js
│ ├── controllers/ # userController.js, productController.js, orderController.js
│ ├── middleware/ # authMiddleware.js, errorMiddleware.js, asyncHandler.js
│ ├── models/ # User.js, Product.js, Order.js
│ ├── routes/ # userRoutes.js, productRoutes.js, orderRoutes.js
│ ├── utils/ # generateToken.js
│ ├── .env
│ └── server.js
│
└── frontend/
├── src/
│ ├── components/
│ │ ├── ui/ # Button.jsx, Input.jsx (Dumb components)
│ │ ├── layout/ # MainLayout.jsx (Navbar/Footer wrapper)
│ │ └── shared/ # ProductCard.jsx
│ ├── pages/
│ │ ├── shop/ # HomePage.jsx, ProductDetail.jsx, CartPage.jsx, Login.jsx, Register.jsx
│ │ ├── admin/ # Dashboard.jsx
│ │ └── error/ # NotFound.jsx (404)
│ ├── store/ # cartStore.js (Zustand)
│ ├── App.jsx # Router setup
│ ├── main.jsx
│ └── index.css # Tailwind directives 3. Database Schema Requirements (Mongoose)
User Schema:

name (String, required)

email (String, required, unique, indexed for fast login)

password (String, required, select: false to hide from frontend)

role (String, enum: ['customer', 'admin'], default: 'customer')

Hook: Pre-save hook using bcryptjs to hash password.

Method: matchPassword for login verification.

Product Schema:

name, description, category (Strings, required)

imageUrl (String, required - assumes Cloudinary URL)

Authenticity Fields: artisanName, artisanLocation, artisanStory (Strings, required).

Transparent Pricing Fields: price (Number, total). priceBreakdown (Object containing artisanCut, materialsCost, platformFee - all Numbers).

inStock (Boolean, default true).

Indexing: Text index on name and category for future search optimization.

Order Schema:

customer (ObjectId ref 'User', required, indexed).

orderItems (Array of objects: product ref 'Product', quantity Number, priceAtPurchase Number). Locking in priceAtPurchase is mandatory for historic accuracy.

totalAmount (Number).

status (String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered']).

4. Backend Rules & Best Practices
   Centralized Error Handling: Do NOT use try...catch blocks in controllers. Wrap all controller functions in a custom asyncHandler middleware. Send errors to a global errorHandler middleware that formats standard 500s and Mongoose CastErrors (404 invalid IDs) into clean JSON responses.

Authentication Middleware: Implement two middlewares: protect (verifies JWT token from Bearer <token> header) and admin (verifies req.user.role === 'admin').

Route Protection:

Products: GET is public. POST, PUT, DELETE require protect + admin.

Orders: POST requires protect. GET (all) and PUT (status update) require protect + admin.

5. Frontend Rules & UI/UX Aesthetics
   Tailwind Configuration (Mandatory Theme): Do NOT use default blue/tech colors. Use this exact earthy palette in tailwind.config.js:

craft: { 50: '#faf9f7', 100: '#f0ece1', 800: '#3e3a35', 900: '#2c2926' }

accent: { DEFAULT: '#d97745', hover: '#c26231' }

Font: Inter (sans).

Component Modularity: Abstract base UI elements (Button, Input) into src/components/ui/ with full prop support (className, disabled, variants).

State Management (Zustand): Use zustand with the persist middleware for the Cart (useCartStore). The cart must survive page reloads via localStorage. Include methods: addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal.

Routing & Layout:

Use nested routes. Public routes (Home, Product Detail, Cart, Login) must be wrapped in <MainLayout/> which includes a Navbar and Footer.

Admin routes must omit the public Navbar and use a dedicated Admin sidebar layout.

Include a custom 404 <NotFound/> component for unmatched routes.

6. Standout Hackathon Features (Implementation Details)
   When generating the ProductDetail.jsx page, you must prominently include these two features:

The "Transparent Price Tag":

Render a UI card displaying the priceBreakdown from the Product schema.

Generate a visual CSS flex-basis/width bar chart dynamically showing the ratio of artisanCut, materialsCost, and platformFee compared to the total price.

The "Authenticity Passport":

Use react-qr-code to render a QR code containing window.location.href.

Place this next to the artisanName, artisanLocation, and artisanStory to act as a digital certificate of origin.

7. The "Checkout Redirect" Flow
   Buyers must be able to add items to their cart without logging in. The system must only prompt for login when they click "Checkout" on the Cart page.

Cart Checkout Button Logic: Check localStorage for token. If null, navigate('/login?redirect=checkout').

Login/Register Logic: Parse location.search for redirect. On successful auth, navigate(redirect).

End of Instructions
AI Agent, acknowledge these instructions and await the user's prompt to begin generating specific files. Start with the backend database schemas and server configuration.
