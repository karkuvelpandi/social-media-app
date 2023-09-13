import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addVideoView } from "../post.slice";
import { VideoInfo } from "../../../types/post.types";
type VideoPlayerProps = {
  source: string;
  postId: string;
  viewCount: number;
};
export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  source,
  postId,
  viewCount,
}) => {
  const dispatch = useDispatch();
  const videoRef = useRef<any>();
  // Observe the video
  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px",
      threshold: 0.5, // Trigger when 50% of the video is visible
    };
    const handleIntersection = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && videoRef.current) {
          // Video is in the viewport, start playing
          videoRef.current.play();
        } else if (videoRef.current) {
          // Video is out of the viewport, pause it
          videoRef.current.pause();
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersection, options);
    // Observe the video element
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    // Clean up the observer when the component unmounts
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);
  return (
    <section className="max-h-[600px] mx-auto mt-2">
      <video
        className="max-h-[600px] mx-auto"
        ref={videoRef}
        onEnded={() => dispatch(addVideoView(postId))}
        controls
        muted
      >
        <source src={source} type="video/mp4" />
      </video>
      {/* <p>
        <i className="pi pi-eye" />
        {video.viewCount}
      </p> */}
    </section>
  );
};
