import React from "react";

// assets
import SuccessCheck from "../../assets/icons/success-check.svg";
import "./Success.css";

import FormBody from "../FormBody/FormBody";

export default function Success() {
  return (
    <FormBody classes={["success-form-body"]}>
      <div className="success-container">
        <img
          className="success-container__img"
          alt="Success"
          src={SuccessCheck}
        />
        <h1 className="heading-1 success-container__heading"> Thank you!</h1>
        <p className="body success-container__body">
          Thanks for confirming your subscription! We hope you have fun using
          our platform. If you ever need support, please feel free to email us
          at support@loremgaming.com.
        </p>
      </div>
    </FormBody>
  );
}
