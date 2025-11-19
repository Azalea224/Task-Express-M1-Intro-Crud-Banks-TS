// src/models/Account.ts
import { Schema, model } from "mongoose";

const accountSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ],
    },
    funds: {
      type: Number,
      required: [true, "Funds are required"],
      min: [0, "Funds cannot be negative"],
      validate: {
        validator: Number.isFinite,
        message: "Funds must be a valid number",
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Prevent NoSQL injection
accountSchema.set("toJSON", {
  transform: (doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Account = model("Account", accountSchema);
