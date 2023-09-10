import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { PostInterface } from "../../types/post.types";
import { timeAgo } from "../../utils/general.util";
import { likePost, unlikePost } from "./post.slice";
import { Link } from "react-router-dom";
import { VideoPlayer } from "./components/VideoPlayer";
//
type PostProps = {
  // All details about the particular post
  post: PostInterface;
};
// Post component used for displaying the details of a post.
export const Post: React.FC<PostProps> = ({ post }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState<boolean>(false);
  const [expandContent, setExpandContent] = useState<boolean>(false);
  const userProfile = useSelector((state: RootState) => state.user.userProfile);
  // Update likes
  useEffect(() => {
    if (post.likes.includes(userProfile.id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [post.likes]);

  // Function to dispatch actions while onClick
  const handleLike = () => {
    console.log("Triggering");
    if (post.likes.includes(userProfile.id)) {
      dispatch(unlikePost({ postId: post.id, userId: userProfile.id }));
    } else {
      dispatch(likePost({ postId: post.id, userId: userProfile.id }));
    }
    setLiked(!liked);
  };

  return (
    <section className="mt-3 m-auto bg-myPrimary rounded-md p-3 shadow-myShadowColor shadow-md">
      <section className="flex justify-between items-center">
        <Link
          to={`/profile/${post.authorInfo.userId}`}
          className="flex gap-3 items-center"
        >
          {post.authorInfo.userImageUrl ? (
            <img
              src={post.authorInfo.userImageUrl}
              className="p-1 h-10 rounded-full min-w-[40px]"
              alt="profile"
            />
          ) : (
            <div className=" h-10 w-fit min-w-[40px] rounded-full bg-blue-500 flex justify-center items-center">
              <i className="pi pi-user" />
            </div>
          )}
          <div>
            <p className="font-semibold">{post.authorInfo.fullName}</p>
            <p className="font-semibold text-gray-500 text-sm italic">
              {post.createdAt &&
                typeof post.createdAt === "number" &&
                timeAgo(post.createdAt)}
            </p>
          </div>
        </Link>

        <i className="pi pi-ellipsis-h hover:cursor-pointer font-bold text-lg" />
      </section>
      <section className="mt-2">
        <p className="inline">
          {post.description.length > 150 && !expandContent
            ? post.description.slice(0, 147)
            : post.description}
        </p>
        {post.description.length > 100 && (
          <span
            onClick={() => setExpandContent(!expandContent)}
            className="text-blue-600 hover:cursor-pointer"
          >
            &nbsp; {!expandContent ? "...see more" : "collapse"}
          </span>
        )}
      </section>
      {post.postImages && (
        <section className="w-full mt-2">
          <img className="w-full rounded-md" src={post.postImages[0]} alt="" />
        </section>
      )}
      {post.postVideos.length > 0 && (
        <VideoPlayer source={post.postVideos[0].src} postId={post.id} />
      )}
      <section className="flex justify-between mt-2">
        <div className="flex gap-3">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 active:animate-bounce hover:cursor-pointer"
          >
            {post.likes.length > 0 && (
              <p className="text-blue-500">{post.likes.length}</p>
            )}
            <i
              className={`text-blue-500 font-bold pi ${
                liked ? "pi-thumbs-up-fill" : "pi-thumbs-up"
              }`}
            />
            <p className={`font-semibold ${liked ? "text-blue-500" : ""}`}>
              {liked ? "Liked" : "Like"}
            </p>
          </button>
          <span className="flex items-center gap-2 hover:cursor-pointer">
            <i className="pi pi-comment text-gray-600 font-bold" />
            <p className="font-semibold">Comment</p>
          </span>
        </div>
        <span className="flex items-center gap-2 hover:cursor-pointer">
          <i className="pi pi-share-alt text-gray-600 font-bold" />
          <p className="font-semibold">Share</p>
        </span>
      </section>
    </section>
  );
};
