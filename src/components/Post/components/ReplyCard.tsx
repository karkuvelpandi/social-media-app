import React from "react";
import {
  CommentInterface,
  CommentReply,
  LikeReplyFormData,
} from "../../../types/post.types";
import { Link } from "react-router-dom";
import { timeAgoShort } from "../../../utils/general.util";
import { useDispatch, useSelector } from "react-redux";
import { likeReply } from "../post.slice";
import { RootState } from "../../../redux";
type ReplyCardProps = {
  comment: CommentInterface;
  reply: CommentReply;
  setActiveReplyTab: (value: boolean) => void;
  activeReplyTab: boolean;
};
// Component to render each reply
export const ReplyCard: React.FC<ReplyCardProps> = ({
  reply,
  comment,
  setActiveReplyTab,
  activeReplyTab,
}) => {
  const dispatch = useDispatch();
  //
  const userProfile = useSelector((state: RootState) => state.user.userProfile);
  //
  const likeHandler = () => {
    const data: LikeReplyFormData = {
      postId: comment.postId,
      commentId: comment.id,
      userId: userProfile.id,
      replyId: reply.replyId,
    };
    if (!reply.replyLikes.includes(userProfile.id)) dispatch(likeReply(data));
    else {
      console.log("Already liked...");
    }
  };
  return (
    <div className="flex gap-1">
      <Link to={`profile/${reply.replyAuthorInfo.userId}`}>
        <img
          src={reply.replyAuthorInfo.userImageUrl}
          className="h-7 max-w-[28px] border-2 rounded-full"
          alt="profile"
        />
      </Link>
      <div className="flex-1">
        <p>
          <Link
            className="font-bold"
            to={`profile/${reply.replyAuthorInfo.userId}`}
          >
            {reply.replyAuthorInfo.fullName} &nbsp;
          </Link>

          {reply.replyComment}
        </p>
        <div className="italic text-sm text-gray-400 space-x-3">
          <span className="cursor-default">
            {timeAgoShort(reply.createdAt)}
          </span>
          <span
            onClick={likeHandler}
            className={`cursor-pointer ${
              reply.replyLikes.length > 0 && "text-blue-400"
            }`}
          >
            {reply.replyLikes.length > 0
              ? reply.replyLikes.length > 1
                ? +reply.replyLikes.length + " likes"
                : reply.replyLikes.length + " like"
              : "like"}
          </span>
          <span
            onClick={() => setActiveReplyTab(!activeReplyTab)}
            className="cursor-pointer"
          >
            Reply
          </span>
        </div>
      </div>
    </div>
  );
};
