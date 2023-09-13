import React, { useState } from "react";
import {
  CommentFormData,
  CommentInterface,
  PostInterface,
} from "../../../types/post.types";
import { InputText } from "primereact/inputtext";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../post.slice";
import { RootState } from "../../../redux";
import { timeAgoShort } from "../../../utils/general.util";
import { ReplyComment } from "./ReplyComment";
import { Link } from "react-router-dom";
import { ReplyCard } from "./ReplyCard";

type CommentsSectionProps = {
  comments: CommentInterface[];
  post: PostInterface;
};

export const CommentsSection: React.FC<CommentsSectionProps> = ({
  comments,
  post,
}) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState<string>("");
  const [commentError, setCommentError] = useState<string>();
  const [activeReplyTab, setActiveReplyTab] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>();
  const [viewReply, setViewReply] = useState<boolean>(false);
  //
  const userProfile = useSelector((state: RootState) => state.user.userProfile);
  //
  const commentHandler = () => {
    const data: CommentFormData = {
      comment: commentText,
      commentAuthorInfo: {
        userId: userProfile.id,
        fullName: userProfile.fullName,
        userImageUrl: userProfile.userImageUrl,
      },
      postId: post.id,
      posterId: userProfile.id,
    };
    dispatch(addComment(data));
    setCommentText("");
  };

  return (
    <section className="w-full mt-2">
      <div className="w-full flex items-center gap-2 h-10">
        <input
          value={commentText}
          placeholder="Add a comment..."
          onChange={(e) => {
            setCommentText(e.target.value);
          }}
          onBlur={(e) =>
            e.target.value
              ? setCommentError("")
              : setCommentError("Please enter comment.")
          }
          className="w-full h-10  border-b-2 focus:outline-none"
        />
        {commentText.length > 0 && !commentError && (
          <i
            onClick={commentHandler}
            className="pi pi-angle-right bg-blue-500 text-xl h-7 min-w-[28px] flex justify-center text-white rounded-full"
          />
        )}
      </div>
      {post.comments.length > 0 && (
        <>
          {post.comments.map((comment, index) => {
            return (
              <div key={index} className="mt-2">
                <div className="flex gap-1">
                  <Link to={`profile/${comment.commentAuthorInfo.userId}`}>
                    <img
                      src={comment.commentAuthorInfo.userImageUrl}
                      className="h-7 max-w-[28px] border-2 rounded-full"
                      alt="profile"
                    />
                  </Link>
                  <div className="flex-1">
                    <p>
                      <Link
                        className="font-bold"
                        to={`profile/${comment.commentAuthorInfo.userId}`}
                      >
                        {comment.commentAuthorInfo.fullName} &nbsp;
                      </Link>
                      {comment.comment}
                    </p>
                    <div className="italic text-sm text-gray-400 space-x-3">
                      <span className="cursor-default">
                        {timeAgoShort(comment.createdAt)}
                      </span>
                      <span className="cursor-pointer">
                        {comment.commentLikes.length > 1
                          ? comment.commentLikes.length + " likes"
                          : "like"}
                      </span>
                      <span
                        onClick={() => {
                          setActiveIndex(index);
                          setActiveReplyTab(!activeReplyTab);
                        }}
                        className="cursor-pointer"
                      >
                        Reply
                      </span>
                    </div>
                    {comment.replies.length > 0 && (
                      <span
                        className="cursor-pointer italic text-sm text-gray-400"
                        onClick={() => {
                          setActiveIndex(index);
                          setViewReply(!viewReply);
                        }}
                      >
                        View replies ({comment.replies.length})
                      </span>
                    )}
                    {viewReply &&
                      activeIndex === index &&
                      comment.replies.length > 0 && (
                        <>
                          {comment.replies.map((reply, index) => {
                            return (
                              <div key={index}>
                                <ReplyCard
                                  comment={comment}
                                  reply={reply}
                                  setActiveReplyTab={setActiveReplyTab}
                                  activeReplyTab={activeReplyTab}
                                />
                              </div>
                            );
                          })}
                        </>
                      )}
                    {comment && activeReplyTab && activeIndex === index && (
                      <ReplyComment comment={comment} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </section>
  );
};
