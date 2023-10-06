import React from "react";
import { Post } from "../Post";
import { RootState } from "../../redux";
import { AsyncState } from "../../types";
import { useSelector } from "react-redux";
import { QuickAccessBar } from "../QuickAccessBar";
import { CreatePost } from "../Post/components/CreatePost";
import { PostLoader } from "../../ui/PostLoader";
// Props type
type FeedsProps = {
  /* Here context decide what to render according 
to the place where Feeds component get rendered*/
  context?: "profile";
};

// Feeds component renders all available post according to the place.
export const Feeds: React.FC<FeedsProps> = ({ context }) => {
  // Access the store
  const userPosts = useSelector((state: RootState) => state.post.userPosts);
  const userFeedPosts = useSelector(
    (state: RootState) => state.post.userFeedPosts
  );
  const getUserPostsStatus = useSelector(
    (state: RootState) => state.post.getUserPostsStatus
  );
  const getFeedPostsStatus = useSelector(
    (state: RootState) => state.post.getFeedPostsStatus
  );
  //  Prepare posts according to the place of render
  const posts = context === "profile" ? userPosts : userFeedPosts;
  const isLoading =
    context === "profile"
      ? getUserPostsStatus === AsyncState.PENDING
      : getFeedPostsStatus === AsyncState.PENDING;
  const isPostsAvailable =
    context === "profile"
      ? getUserPostsStatus === AsyncState.FULFILLED
      : getFeedPostsStatus === AsyncState.FULFILLED;
  //
  return (
    <section className="w-full h-full flex justify-between">
      <div
        className={`flex-1 max-w-[700px] md:mx-auto  pb-10 ${
          context === "profile" ? "" : "overflow-y-auto"
        }`}
      >
        <CreatePost />
        {isPostsAvailable &&
          posts &&
          posts.map((post, index) => {
            return (
              <div key={index}>
                <Post post={post} />
              </div>
            );
          })}
        {isLoading && <PostLoader />}
        {isLoading && <PostLoader />}
      </div>
      <QuickAccessBar context={context === "profile" ? "profile" : ""} />
    </section>
  );
};
