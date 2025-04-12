import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["pickupPartner", "microCollectionPartner"],
    required: true,
  },

  profileImage: {
    type: String,
  },

  // For MCPs: array of assigned pickup partners
  assignedPickupPartners: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    validate: {
      validator: function (value) {
        return this.role === "microCollectionPartner" || value.length === 0;
      },
      message: "Only microCollectionPartners can have assigned pickup partners.",
    },
    default: undefined, // Keeps it out of pickupPartner docs
  },

  
 

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-update updatedAt field
UserSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model("User", UserSchema);
export default User;
