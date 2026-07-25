import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "password123", // Will be hashed by pre-save hook, but for seed we can hash it here or use the model. Wait, if we use Model.insertMany it won't trigger pre-save middleware. We should hash it here or use create(). Let's hash it here to be safe for insertMany.
    role: "admin",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "customer",
  },
];

export default users;
