import React, { useState, useEffect } from "react";
import { Modal } from "../../../ui/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toggleProfileEditModal, updateUserProfile } from "../user.slice";
import { HealthyImage } from "../../../ui/HealthyImage/HealthyImage";
import { RootState } from "../../../redux";
import defaultProfile from "../../../ui/images/defaultImages/defaultProfile.jpg";
import defaultCover from "../../../ui/images/defaultImages/defaultCover.jpg";
import { EditFormData } from "../../../types/user.types";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FileUploader } from "../../../ui/FileUploader/FileUploader";

export const EditProfile = () => {
  const dispatch = useDispatch();
  const [collectionName, setCollectionName] = useState<string>();
  const [percent, setPercent] = useState<number>(0);
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [formData, setFormData] = useState<EditFormData>({
    fullName: "",
    userImageUrl: "",
    coverImageUrl: "",
    location: { city: "", long: 0, lati: 0 },
  });
  const [errorMessage, setErrorMessage] = useState({
    fullName: "",
    userImageUrl: "",
    coverImageUrl: "",
    location: "",
  });
  //   Access the store
  const userProfile = useSelector((state: RootState) => state.user.userProfile);
  //
  useEffect(() => {
    setFormData({
      fullName: userProfile.fullName,
      userImageUrl: userProfile.userImageUrl,
      coverImageUrl: userProfile.coverImageUrl,
      location: userProfile.location,
    });
  }, [userProfile]);
  //
  const firebaseFileUpload = (event: any, collectionName: string) => {
    const file = event.target.files[0];
    if (!file) {
      alert("Please choose a file first!");
    }
    if (file) {
      const storageRef = ref(storage, `/${collectionName}/${userProfile.id}`);
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
            collectionName === "profile" &&
              setFormData({ ...formData, userImageUrl: url });
            collectionName === "cover" &&
              setFormData({ ...formData, coverImageUrl: url });
            return url;
          });
        }
      );
    }
  };
  // Function for validate the form
  const validateForm = () => {
    let isValid = true;
    const newErrorMessages = {
      fullName: "",
      userImageUrl: "",
      coverImageUrl: "",
      location: "",
    };

    // Validate name
    if (formData.fullName.trim() === "") {
      newErrorMessages.fullName = "Name is required";
      isValid = false;
    } else if (formData.fullName.trim().length < 6) {
      newErrorMessages.fullName = "Minimum 6 Character";
      isValid = false;
    }
    // Validate location
    if (formData.location.city.trim() === "") {
      newErrorMessages.location = "Name is required";
      isValid = false;
    }

    setErrorMessage(newErrorMessages);
    return isValid;
  };
  const submitHandler = (e: any) => {
    e.preventDefault();
    setIsFileUploaded(false);
    const data = {
      ...userProfile,
      fullName: formData.fullName,
      userImageUrl: formData.userImageUrl,
      coverImageUrl: formData.coverImageUrl,
      location: formData.location,
    };
    if (validateForm()) {
      dispatch(updateUserProfile(data));
    } else {
      console.log("Invalid data");
    }
  };
  return (
    <>
      {" "}
      <Modal
        zIndex="z-20"
        allCentered
        withShade
        ghostClose
        onBackdropClick={() => dispatch(toggleProfileEditModal(false))}
      >
        <section className=" w-11/12 sm:min-w-[500px] sm:w-[700px] bg-myPrimary rounded-md overflow-hidden p-3 space-y-4">
          <div
            style={{
              backgroundImage: `url(${formData.coverImageUrl || defaultCover})`,
            }}
            className="bg-center bg-cover h-32 sm:h-44 relative rounded-md"
          >
            <div className="absolute bg-black inset-0 -z-0 opacity-40 rounded-md" />
            <img
              className=" absolute top-6 sm:top-8 left-2 rounded-full h-20 sm:h-28"
              src={formData.userImageUrl || defaultProfile}
              alt="profile"
            />
            <button
              onClick={() => setCollectionName("cover")}
              className="absolute right-5 top-3 text-white"
            >
              <i className="pi pi-pencil font-extrabold" />
            </button>
            <button
              onClick={() => setCollectionName("profile")}
              className="absolute left-28 top-4 text-white"
            >
              <i className="pi pi-pencil font-extrabold" />
            </button>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <span className="p-float-label p-input-icon-right w-full h-fit">
              <InputText
                tooltip={errorMessage.fullName}
                tooltipOptions={{ position: "bottom" }}
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                }}
                onBlur={(e) =>
                  e.target.value
                    ? setErrorMessage({ ...errorMessage, fullName: "" })
                    : setErrorMessage({
                        ...errorMessage,
                        fullName: "Please enter name.",
                      })
                }
                className={
                  classNames({
                    "p-invalid": errorMessage.fullName !== "",
                  }) + " w-full h-1/2 p-inputtext-sm"
                }
              />
              <label htmlFor="input_value">Full name</label>
            </span>
            <span className="p-float-label p-input-icon-right w-full h-fit">
              <InputText
                tooltip={errorMessage.location}
                tooltipOptions={{ position: "bottom" }}
                value={formData.location.city}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    location: {
                      ...formData.location,
                      city: e.target.value,
                    },
                  });
                }}
                onBlur={(e) =>
                  e.target.value
                    ? setErrorMessage({ ...errorMessage, location: "" })
                    : setErrorMessage({
                        ...errorMessage,
                        location: "Please enter name.",
                      })
                }
                className={
                  classNames({
                    "p-invalid": errorMessage.location !== "",
                  }) + " w-full h-1/2 p-inputtext-sm"
                }
              />
              <label htmlFor="input_value">Location</label>
            </span>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={submitHandler}
              label="Submit"
              className="w-40 bg-blue-500 rounded-xl"
            />
          </div>

          {collectionName && (
            <Modal
              zIndex="z-50"
              modalRoot="spareModal"
              ghostClose
              allCentered
              withShade
              onBackdropClick={() => setCollectionName("")}
            >
              <FileUploader
                progress={percent !== 0 && percent !== 100}
                onChange={(e: any) => firebaseFileUpload(e, collectionName)}
                value={
                  collectionName === "profile"
                    ? formData.userImageUrl
                    : formData.coverImageUrl
                }
                isUploadCompleted={isFileUploaded}
                onOk={() => setCollectionName("")}
                accept="images/*"
              />
            </Modal>
          )}
        </section>
      </Modal>
    </>
  );
};
