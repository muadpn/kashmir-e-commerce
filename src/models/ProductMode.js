import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  
    
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiration: Date,
  verifyToken: String,
  verifyTokenExpiration: Date,
});

const Products = mongoose.models.products || mongoose.model("products", productSchema);

export default User;
