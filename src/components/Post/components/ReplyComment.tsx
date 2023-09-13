import React, { useState } from "react";
import {
  CommentInterface,
  CommentReplyFormData,
} from "../../../types/post.types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { replyComment } from "../post.slice";
type ReplyCommentProps = {
  comment: CommentInterface;
};
export const ReplyComment: React.FC<ReplyCommentProps> = ({ comment }) => {
  const dispatch = useDispatch();
  const [replyText, setReplyText] = useState<string>("");
  //
  const userProfile = useSelector((state: RootState) => state.user.userProfile);
  //
  const replyHandler = () => {
    console.log(comment);
    const replyData: CommentReplyFormData = {
      commentId: comment.id,
      postId: comment.postId,
      replyAuthorInfo: {
        userId: userProfile.id,
        fullName: userProfile.fullName,
        userImageUrl: userProfile.userImageUrl,
      },
      replyComment: replyText,
    };
    dispatch(replyComment(replyData));
    setReplyText("");
  };
  return (
    <div className="flex relative">
      <input
        value={replyText}
        type="text"
        placeholder="Add reply..."
        className="border-b-2 focus:outline-none"
        onChange={(e: any) => setReplyText(e.target.value)}
      />
      {replyText.length > 0 && (
        <i
          onClick={replyHandler}
          className="pi pi-angle-right h-5 bg-blue-500 text-sm w-[20px] flex justify-center text-white rounded-full"
        />
      )}
    </div>
  );
};
