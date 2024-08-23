const mongoose = require("mongoose");
/* eslint-disable no-useless-escape */
const userDef = {
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // Enforce unique constraint
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  role: {
    type: String,
    enum: ["user", "admin", "super-admin"],
    default: "user",
    required: [true, "Role is required"],
  },
  status: {
    type: Boolean,
    required: [true, "Status is required"],
    default: true,
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
};
const discountDef = {
  name: {
    type: String,
    required: [true, "Discount name is required"],
    trim: true,
  },
  percentage: {
    type: Number,
    required: [true, "Discount percentage is required"],
    min: [0, "Percentage must be at least 0"],
    max: [100, "Percentage cannot exceed 100"],
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
  active: {
    type: Boolean,
    required: [true, "Active status is required"],
  },
};
const productBrandDef = {
  name: {
    type: String,
    required: [true, "Category name is required"],
    trim: true,
    unique: true, // Ensures that category names are unique
  },
  status: {
    type: Boolean,
    required: [true, "Status is required"],
    default: true, // Default to active if not specified
  },
};
const productCategoryDef = {
  name: {
    type: String,
    required: [true, "Category name is required"],
    trim: true,
    unique: true, // Ensures that category names are unique
  },
  status: {
    type: Boolean,
    required: [true, "Status is required"],
    default: true, // Default to active if not specified
  },
};
const serviceCategoryDef = {
  name: {
    type: String,
    required: [true, "Category name is required"],
    trim: true,
    unique: true, // Ensures that category names are unique
  },
  status: {
    type: Boolean,
    required: [true, "Status is required"],
    default: true, // Default to active if not specified
  },
};
const employeeDef = {
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  phone: {
    type: Number,
    required: [true, "Phone number is required"],
    match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
  },
  address: {
    type: String,
    required: false,
    trim: true,
  },
  startDate: {
    type: Date,
    required: false,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, "Please fill a valid email address"],
  },
  gender: {
    type: String,
    enum: {
      values: ["Male", "Female", "Other"],
      message: "{VALUE} is not a valid gender",
    },
    required: [true, "Gender is required"],
  },
  status: {
    type: Boolean,
    required: [true, "Status is required"],
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
};
const serviceDef = {
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceCategory",
    required: [true, "Category is required"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Unisex"], // Define acceptable gender values
    required: [true, "Gender is required"],
  },
  serviceName: {
    type: String,
    required: [true, "Service name is required"],
    trim: true,
  },
  cost: {
    type: Number,
    required: [true, "Cost is required"],
    min: [0, "Cost must be a positive number"],
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
};
const productDef = {
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productBrand",
    required: [true, "Brand is required"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productCategory",
    required: [true, "Category is required"],
  },
  productName: {
    type: String,
    required: [true, "Service name is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be a positive number"],
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
};
const billServiceDef = {
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service", // Reference to the Service model
    required: [true, "Service is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be a positive number"],
  },
  discount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Discount",
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Service representative is required"],
    ref: "Employee",
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Quantity must be at least 1"], // Ensure quantity is a positive number
  },
};

const billProductDef = {
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the Service model
    required: [true, "Product is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be a positive number"],
  },
  discount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Discount",
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Quantity must be at least 1"], // Ensure quantity is a positive number
  },
};
const billDef = {
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  paymentDate: {
    type: Date,
    required: [true, "Payment date is required"],
  },
  paymentMode: {
    type: String,
    required: [true, "Payment mode is required"],
    trim: true,
  },
  subtotal: {
    type: Number,
    required: [true, "Subtotal is required"],
    min: [0, "Subtotal must be a positive number"],
  },
  gst: {
    type: Number,
    required: [true, "GST is required"],
    min: [0, "GST must be a positive number"],
  },
  total: {
    type: Number,
    required: [true, "Total is required"],
    min: [0, "Total must be a positive number"],
  },
  services: {
    type: [new mongoose.Schema(billServiceDef)],
  },
  products: {
    type: [new mongoose.Schema(billProductDef)],
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: [true, "Branch is required"],
  },
};
const customerDef = {
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  phone: {
    type: Number,
    required: [true, "Phone number is required"],
    match: [/^\d{10}$/, "Phone number must be a 10-digit number"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    trim: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"], // Restrict gender to predefined options
    required: [true, "Gender is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  status: {
    type: Number,
    required: [true, "Status is required"],
    min: [0, "Status must be a non-negative number"],
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
  },
};
const branchDef = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Branch name is required"],
  },
  address: {
    type: String,
    required: [true, "Branch address is required"],
  },
  phone: {
    type: String,
    required: [true, "Branch phone number is required"],
  },
  status: {
    type: Boolean,
    default: [true, "Branch status is required"],
  },
});
module.exports = {
  userDef,
  employeeDef,
  billServiceDef,
  billDef,
  discountDef,
  customerDef,
  serviceCategoryDef,
  serviceDef,
  productCategoryDef,
  productBrandDef,
  productDef,
  branchDef,
};
