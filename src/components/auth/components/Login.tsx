import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
// import dudeBlack from "../../../ui/images/dude-black.png";
// import dudeWhite from "../../../ui/images/dude-black.png";
import { LoginFormData } from "../../../types/auth.types";
import { isValidEmail } from "../../../utils/general.util";
import { login } from "../auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { AsyncState } from "../../../types";

export const Login = () => {
  const dispatch = useDispatch();

  const [validationActive, setValidationActive] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });
  // Access the store data
  const loginStatus = useSelector((state: RootState) => state.auth.loginStatus);
  const isMobileView = useSelector(
    (state: RootState) => state.visibility.isMobileView
  );

  //
  const validateForm = () => {
    let isValid = true;
    const newErrorMessages = {
      email: "",
      password: "",
    };

    // Validate email
    if (!isValidEmail(formData.email)) {
      newErrorMessages.email = "Invalid email format";
      isValid = false;
    }

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
    setValidationActive(true);
    e.preventDefault();
    if (validateForm()) {
      dispatch(login(formData));
      setFormData({
        email: "",
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
            <p className="logo-font text-myTextColor font-bold text-7xl my-1">
              Dude
            </p>
          </Link>
        </div>
        <div className=" space-y-5">
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
              tooltipOptions={{ position: isMobileView ? "bottom" : "right" }}
              onBlur={(e) => {
                isValidEmail(e.target.value)
                  ? setErrorMessage({ ...errorMessage, email: "" })
                  : setErrorMessage({
                      ...errorMessage,
                      email: "Please enter valid email.",
                    });
                validationActive && validateForm();
              }}
              value={formData.email}
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
                  errorMessage.password
                    ? "pi pi-times border-2 border-red-600 text-red-600 rounded-md"
                    : "pi pi-check border-2 border-green-500 text-green-500 rounded-sm"
                }
              />
            )}
            <InputText
              tooltip={errorMessage.password}
              tooltipOptions={{ position: isMobileView ? "bottom" : "right" }}
              type="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              onBlur={(e) => {
                e.target.value
                  ? setErrorMessage({ ...errorMessage, password: "" })
                  : setErrorMessage({
                      ...errorMessage,
                      password: "Please enter password.",
                    });
                validationActive && validateForm();
              }}
              className={
                classNames({
                  "p-invalid": errorMessage.password !== "",
                }) + " w-full h-1/2 p-inputtext-sm"
              }
            />
            <label htmlFor="input_value">Password</label>
          </span>
          <Button
            loading={loginStatus === AsyncState.PENDING}
            disabled={(formData.email && formData.password) === ""}
            onClick={submitHandler}
            label="Submit"
            className="w-full bg-blue-500 rounded-xl"
          />
        </div>
        <div></div>
        <div></div>
      </div>
      <div className="border-[1px] py-4 flex justify-center rounded-lg">
        <span>
          Don't have an account?&nbsp;
          <Link to={"/sign_up"} className="text-blue-500">
            sign up
          </Link>
        </span>
      </div>
    </section>
  );
};
