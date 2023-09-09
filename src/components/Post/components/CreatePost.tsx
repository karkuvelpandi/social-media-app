import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { CreatePostData, PostInterface } from "../../../types/post.types";
import { FileUploader } from "../../../ui/FileUploader/FileUploader";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import { Modal } from "../../../ui/Modal/Modal";
import { createPost } from "../post.slice";
import { AsyncState } from "../../../types";
import { addUserPost } from "../../User/user.slice";
import {
  AddUserPostData,
  UserProfileInterface,
} from "../../../types/user.types";

export const CreatePost = () => {
  const dispatch = useDispatch();
  const [percent, setPercent] = useState<number>(0);
  const [collectionName, setCollectionName] = useState<string>("");
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [formData, setFormData] = useState<CreatePostData>({
    description: "",
    postImages: [],
    postVideos: [],
    authorInfo: {
      userId: "",
      fullName: "",
      userImageUrl: "",
    },
  });

  const userProfile: UserProfileInterface = useSelector(
    (state: RootState) => state.user.userProfile
  );
  const createPostStatus = useSelector(
    (state: RootState) => state.post.createPostStatus
  );
  const currentCreatedPost = useSelector(
    (state: RootState) => state.post.currentCreatedPost
  );

  const firebaseFileUpload = (event: any, collectionName: string) => {
    const file = event.target.files[0];
    if (!file) {
      alert("Please choose a file first!");
    }
    if (file) {
      const storageRef = ref(storage, `/${collectionName}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setIsFileUploaded(true);
            collectionName === "photos" &&
              setFormData({
                ...formData,
                postImages: [...formData.postImages, url],
              });
            collectionName === "videos" &&
              setFormData({
                ...formData,
                postVideos: [...formData.postVideos, url],
              });
            return url;
          });
        }
      );
    }
  };
  const submitHandler = (e: any) => {
    e.preventDefault();
    setIsFileUploaded(false);
    const data: CreatePostData = {
      ...formData,
      authorInfo: {
        userId: userProfile.id,
        fullName: userProfile.fullName,
        userImageUrl: userProfile.userImageUrl,
      },
    };
    dispatch(createPost(data));
  };

  // Adding the created post to the userProfile
  useEffect(() => {
    const data: AddUserPostData = {
      userId: userProfile.id,
      postId: currentCreatedPost.id,
    };
    if (createPostStatus === AsyncState.FULFILLED && currentCreatedPost) {
      dispatch(addUserPost(data));
      setFormData({
        description: "",
        postImages: [],
        postVideos: [],
        authorInfo: {
          userId: "",
          fullName: "",
          userImageUrl: "",
        },
      });
    }
  }, [createPostStatus, currentCreatedPost, dispatch, userProfile.id]);

  return (
    <section className="mt-3 m-auto bg-myPrimary rounded-md p-3 shadow-gray-500 shadow-md">
      <span className="text-gray-500 font-semibold">
        <i className="pi pi-pencil" />
        &nbsp; CreatePost
      </span>
      <div className="flex border-2 border-gray-300 p-1 rounded-md gap-1.5 mt-1">
        {userProfile.userImageUrl ? (
          <img
            src={userProfile.userImageUrl}
            className="h-7 rounded-full min-w-[28px] border-[1px] border-mySecondary"
            alt="profile"
          />
        ) : (
          <i className="pi pi-user p-1 h-7 rounded-full min-w-[28px] bg-orange-500 inline" />
        )}
        <textarea
          placeholder="What's on your mind?"
          className="focus:outline-none w-full h-12 sm:h-20 bg-transparent"
          name=""
          id=""
          onBlur={(e) =>
            e.target.value
              ? setDescriptionError("")
              : setDescriptionError("Please enter name.")
          }
          onChange={(e: any) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>
      <div className="flex justify-between mt-2">
        <div className="flex gap-3">
          <span
            onClick={() => setCollectionName("photos")}
            className="flex items-center gap-2 hover:cursor-pointer"
          >
            <i className="pi pi-image text-[#10d876] font-bold" />
            <p>Add photo</p>
          </span>
          <span
            onClick={() => setCollectionName("videos")}
            className="flex items-center gap-2 hover:cursor-pointer"
          >
            <i className="pi pi-video text-[#d81010] font-bold" />
            <p>Add video</p>
          </span>
        </div>
        <button
          disabled={descriptionError !== ""}
          onClick={submitHandler}
          className="px-4 font-semibold py-1 bg-blue-500 text-white rounded-md hover:cursor-pointer"
        >
          Post
        </button>
      </div>
      {collectionName && (
        <Modal
          allCentered
          withShade
          ghostClose
          onBackdropClick={() => {
            setCollectionName("");
            setIsFileUploaded(false);
          }}
        >
          <FileUploader
            onChange={(e: any) => firebaseFileUpload(e, collectionName)}
            onOk={() => {
              setCollectionName("");
              setIsFileUploaded(false);
            }}
            progress={percent !== 0 && percent !== 100}
            value={collectionName === "photos" ? formData.postImages[0] : ""}
            isUploadCompleted={isFileUploaded}
            accept="image/*"
            label={
              collectionName === "photos" ? "Select Image" : "Select Video"
            }
          />
        </Modal>
      )}
    </section>
  );
};