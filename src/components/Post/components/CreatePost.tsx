import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { RootState } from "../../../redux";
import { CreatePostData } from "../../../types/post.types";
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

// Component to create new post
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

  // Access the store
  const userProfile: UserProfileInterface = useSelector(
    (state: RootState) => state.user.userProfile
  );
  const getUserProfileStatus = useSelector(
    (state: RootState) => state.user.getUserProfileStatus
  );
  const createPostStatus = useSelector(
    (state: RootState) => state.post.createPostStatus
  );
  const currentCreatedPost = useSelector(
    (state: RootState) => state.post.currentCreatedPost
  );
  const darkMode = useSelector((state: RootState) => state.visibility.darkMode);
  //
  const isLoading = createPostStatus === AsyncState.PENDING;
  //
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
                postImages: [url],
              });
            collectionName === "videos" &&
              setFormData({
                ...formData,
                postVideos: [
                  ...formData.postVideos,
                  { src: url, viewCount: 0 },
                ],
              });
            return url;
          });
        }
      );
    }
  };
  // Function for validate the form
  const validateForm = () => {
    let isValid = true;
    let descriptionError = "";
    if (formData.description.trim() === "") {
      descriptionError = "Description is required";
      isValid = false;
    }
    setDescriptionError(descriptionError);
    return isValid;
  };
  const submitHandler = (e: any) => {
    e.preventDefault();
    setIsFileUploaded(false);
    if (validateForm()) {
      const data: CreatePostData = {
        ...formData,
        authorInfo: {
          userId: userProfile.id,
          fullName: userProfile.fullName,
          userImageUrl: userProfile.userImageUrl,
        },
      };
      dispatch(createPost(data));
    }
  };

  // Adding the created post to the userProfile
  useEffect(() => {
    if (createPostStatus === AsyncState.FULFILLED) {
      console.log(currentCreatedPost);
      const data: AddUserPostData = {
        userId: userProfile.id,
        postId: currentCreatedPost.id,
      };
      // Currently we are filter post by author name and getting the post
      // This particular addUserPost is saving the post data on user profile.
      console.log(data);
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
  }, [createPostStatus, currentCreatedPost.id, dispatch, userProfile.id]);
  //
  console.log(formData);
  return (
    <section className="mt-3 m-auto bg-myPrimary rounded-md p-3 shadow-myShadowColor shadow-md">
      <span className="text-gray-500 font-semibold">
        <i className="pi pi-pencil" />
        &nbsp; CreatePost
      </span>
      <div className="flex border-2 border-gray-300 p-1 rounded-md gap-1.5 mt-1">
        {getUserProfileStatus === AsyncState.PENDING && (
          <div
            className={`h-7 rounded-full min-w-[28px] border-[1px] border-mySecondary ${
              darkMode ? "loader-bg-dark" : "loader-bg"
            }`}
          />
        )}
        {getUserProfileStatus === AsyncState.FULFILLED && (
          <>
            {userProfile.userImageUrl ? (
              <img
                src={userProfile.userImageUrl}
                className="h-7 rounded-full min-w-[28px] border-[1px] border-mySecondary"
                alt="profile"
              />
            ) : (
              <i className="pi pi-user h-7 flex justify-center items-center rounded-full min-w-[28px] text-md bg-mySecondary" />
            )}
          </>
        )}
        <textarea
          value={formData.description}
          placeholder="What's on your mind?"
          className="focus:outline-none w-full h-12 sm:h-20 bg-transparent"
          name=""
          id=""
          onChange={(e: any) => {
            setFormData({ ...formData, description: e.target.value });
            e.target.value
              ? setDescriptionError("")
              : setDescriptionError("Please enter name.");
          }}
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
        <Button
          loading={isLoading}
          disabled={descriptionError !== ""}
          onClick={submitHandler}
          className="px-4 font-semibold py-1 bg-blue-500 text-white rounded-md hover:cursor-pointer"
        >
          Post
        </Button>
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
