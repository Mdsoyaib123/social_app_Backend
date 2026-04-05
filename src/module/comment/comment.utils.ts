type CommentType = any;

export const buildCommentTree = (comments: CommentType[]) => {
  const map = new Map<string, any>();
  const roots: any[] = [];

  // Step 1: map সব comment
  comments.forEach((comment) => {
    map.set(comment._id.toString(), {
      ...comment.toObject(),
      replies: [],
    });
  });

  // Step 2: tree build
  comments.forEach((comment) => {
    if (comment.parentCommentId) {
      const parent = map.get(comment.parentCommentId.toString());
      if (parent) {
        parent.replies.push(map.get(comment._id.toString()));
      }
    } else {
      roots.push(map.get(comment._id.toString()));
    }
  });

  return roots;
};