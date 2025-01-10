const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    shopName: { type: String, required: true },
    items: [
      {
        name: { type: String, required: true },
      },
    ],
    deadline: { type: Date, required: true },
    quoteReceived:[{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
  },
  { timestamps: true } // This will automatically add `createdAt` and `updatedAt`
);

const Post = mongoose.model("Posts", postSchema);

module.exports = Post;
