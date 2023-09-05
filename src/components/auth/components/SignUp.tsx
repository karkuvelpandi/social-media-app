import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import dudeBlack from "../../../ui/images/dude-black.png";
import dudeWhite from "../../../ui/images/dude-black.png";
import { isValidEmail } from "../../../utils/general.util";
import { RegisterFormData } from "../../../types/auth.types";
import { signUp } from "../auth.slice";
export const SignUp = () => {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const [validationActive, setValidationActive] = useState<boolean>(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    fullName: "",
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    fullName: "",
    username: "",
    password: "",
  });
  const validateForm = () => {
    let isValid = true;
    const newErrorMessages = {
      email: "",
      fullName: "",
      username: "",
      password: "",
    };

    // Validate email
    if (!isValidEmail(formData.email)) {
      newErrorMessages.email = "Invalid email format";
      isValid = false;
    }
    // Validate name
    if (formData.fullName.trim() === "") {
      newErrorMessages.fullName = "Name is required";
      isValid = false;
    } else if (formData.fullName.trim().length < 6) {
      newErrorMessages.fullName = "Minimum 6 Character";
      isValid = false;
    }

    if (formData.username.trim() === "") {
      newErrorMessages.username = "Username is required";
      isValid = false;
    } else if (formData.username.trim().length < 6) {
      newErrorMessages.username = "Minimum 6 Character";
      isValid = false;
    } else if (/[A-Z]/.test(formData.username.trim())) {
      newErrorMessages.username = "Use small letters";
      isValid = false;
    }
    // Validate status
    if (formData.password.trim() === "") {
      newErrorMessages.password = "Password is required";
      isValid = false;
    } else if (formData.password.trim().length < 6) {
      newErrorMessages.password = "Minimum 6 Character";
      isValid = false;
    }
    setErrorMessage(newErrorMessages);
    return isValid;
  };
  const submitHandler = (e: any) => {
    e.preventDefault();
    setValidationActive(true);
    if (validateForm()) {
      dispatch(signUp(formData));
      setFormData({
        email: "",
        fullName: "",
        username: "",
        password: "",
      });
      setValidationActive(false);
    } else {
      console.log("Invalid data");
    }
  };

  return (
    <section className="max-w-[350px] w-full h-auto space-y-2">
      <div className="border-[1px] p-5 rounded-lg">
        <div className="w-full flex justify-center mb-2">
          <Link to="/">
            <img src={dudeBlack} width="120px" height="120px" alt="" />
          </Link>
        </div>
        <div className=" space-y-5">
          <Toast ref={toast} />
          <span className="p-float-label p-input-icon-right w-full">
            {validationActive && (
              <i
                className={
                  errorMessage.email
                    ? "pi pi-times border-2 border-red-600 text-red-600 rounded-md"
                    : "pi pi-check border-2 border-green-500 text-green-500 rounded-md"
                }
              />
            )}
            <InputText
              tooltip={errorMessage.email}
              value={formData.email}
              onBlur={(e) =>
                isValidEmail(e.target.value)
                  ? setErrorMessage({ ...errorMessage, email: "" })
                  : setErrorMessage({
                      ...errorMessage,
                      email: "Please enter valid email.",
                    })
              }
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              className={
                classNames({
                  "p-invalid": errorMessage.email !== "",
                }) + " w-full h-1/2 p-inputtext-sm"
              }
            />
            <label htmlFor="input_value">Email</label>
          </span>
          <span className="p-float-label p-input-icon-right w-full">
            {validationActive && (
              <i
                className={
                  errorMessage.fullName
                    ? "pi pi-times border-2 border-red-600 text-red-600 rounded-md"
                    : "pi pi-check border-2 border-green-500 text-green-500 rounded-sm"
                }
              />
            )}
            <InputText
              tooltip={errorMessage.fullName}
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
          <span className="p-float-label p-input-icon-right w-full">
            {validationActive && (
              <i
                className={
                  errorMessage.username
                    ? "pi pi-times border-2 border-red-600 text-red-600 rounded-md"
                    : "pi pi-check border-2 border-green-500 text-green-500 rounded-sm"
                }
              />
            )}
            <InputText
              tooltip={errorMessage.username}
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
              }}
              onBlur={(e) =>
                e.target.value
                  ? setErrorMessage({ ...errorMessage, username: "" })
                  : setErrorMessage({
                      ...errorMessage,
                      username: "Please enter username.",
                    })
              }
              className={
                classNames({
                  "p-invalid": errorMessage.username !== "",
                }) + " w-full h-1/2 p-inputtext-sm"
              }
            />
            <label htmlFor="input_value">Username</label>
          </span>
          <span className="p-float-label p-input-icon-right w-full">
            {validationActive && (
              <i
                className={
                  errorMessage.password
                    ? "pi pi-times border-2 border-red-600 text-red-600 rounded-md"
                    : "pi pi-check border-2 border-green-500 text-green-500 rounded-sm"
                }
              />
            )}
            <InputText
              tooltip={errorMessage.password}
              type="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              onBlur={(e) =>
                e.target.value
                  ? setErrorMessage({ ...errorMessage, password: "" })
                  : setErrorMessage({
                      ...errorMessage,
                      password: "Please enter password.",
                    })
              }
              className={
                classNames({
                  "p-invalid": errorMessage.password !== "",
                }) + " w-full h-1/2 p-inputtext-sm"
              }
            />
            <label htmlFor="input_value">Password</label>
          </span>
          <Button
            onClick={submitHandler}
            label="Submit"
            disabled={
              (formData.email &&
                formData.username &&
                formData.fullName &&
                formData.password) === ""
            }
            className="w-full bg-blue-500 rounded-xl"
          />
        </div>
        <div></div>
        <div></div>
      </div>
      <div className="border-[1px] py-4 flex justify-center rounded-lg">
        Have an account?&nbsp;
        <Link to={"/login"} className="text-blue-500">
          Login
        </Link>
      </div>
    </section>
  );
};
