import { PostModel } from "./post.model";
import { TPost } from "./post.interface";

const createPost = async (payload: TPost, postImg: string, userId: string) => {
  return await PostModel.create({
    ...payload,
    authorId: userId,
    image: postImg,
  });
};


const getFeed = async (userId: string, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const posts = await PostModel.find({
    $or: [
      { isPrivate: false }, // public posts
      { authorId: userId }, // user's own private posts
    ],
  })
    .populate("authorId", "firstName lastName email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await PostModel.countDocuments({
    $or: [
      { isPrivate: false },
      { authorId: userId },
    ],
  });

  return {
    data: posts,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getSinglePost = async (postId: string, userId: string) => {
  const post = await PostModel.findById(postId).populate(
    "authorId",
    "firstName lastName email"
  );

  if (!post) throw new Error("Post not found");

  // 🔒 private check
  if (post.isPrivate && post.authorId.toString() !== userId) {
    throw new Error("Unauthorized access to private post");
  }

  return post;
};

// UPDATE
const updatePost = async (postId: string, userId: string, payload: Partial<TPost>, postImg?: string) => {
  const post = await PostModel.findById(postId);

  if (!post) throw new Error("Post not found");

  if (post.authorId.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  if (postImg) {
    payload.image = postImg;
  }
  return await PostModel.findByIdAndUpdate(postId, payload, {
    new: true,
    runValidators: true,
  });
};
const updatePostVisibility = async (postId: string, userId: string, isPrivate: boolean) => {
  const post = await PostModel.findById(postId);

  if (!post) throw new Error("Post not found");

  if (post.authorId.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  return await PostModel.findByIdAndUpdate(postId, { isPrivate }, {
    new: true,
    runValidators: true,
  });
}

// DELETE
const deletePost = async (postId: string, userId: string) => {
  const post = await PostModel.findById(postId);

  if (!post) throw new Error("Post not found");

  if (post.authorId.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  return await PostModel.findByIdAndDelete(postId);
};

export const PostService = {
  createPost,
  getFeed,
  getSinglePost,
  updatePostVisibility,
  updatePost,
  deletePost,
};