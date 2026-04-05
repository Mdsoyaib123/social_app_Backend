"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCommentTree = void 0;
const buildCommentTree = (comments) => {
    const map = new Map();
    const roots = [];
    // Step 1: map সব comment
    comments.forEach((comment) => {
        map.set(comment._id.toString(), Object.assign(Object.assign({}, comment.toObject()), { replies: [] }));
    });
    // Step 2: tree build
    comments.forEach((comment) => {
        if (comment.parentCommentId) {
            const parent = map.get(comment.parentCommentId.toString());
            if (parent) {
                parent.replies.push(map.get(comment._id.toString()));
            }
        }
        else {
            roots.push(map.get(comment._id.toString()));
        }
    });
    return roots;
};
exports.buildCommentTree = buildCommentTree;
