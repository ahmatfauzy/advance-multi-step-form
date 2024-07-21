import React, { useContext } from "react";

import FormBody from "../FormBody/FormBody";

import { FormContext } from "../../context/form-context";

// Style
import "./FinishUp.css";

// Utils
import { convertSchemeToText } from "../../utils";

export default function FinishUp({ goStep }) {
  const { FormState: formContext } = useContext(FormContext);

  const schemeData = convertSchemeToText(formContext.scheme);

  function getFormTotal(formObject) {
    const addOnTotal = Object.keys(formObject.addOns).reduce(
      (total, currentKey) => {
        if (formObject.addOns[currentKey].value) {
          return (
            total + formObject.addOns[currentKey].price[`per${schemeData.name}`]
          );
        } else {
          return 0 + total;
        }
      },
      0
    );
    return formObject.plan.price[`per${schemeData.name}`] + addOnTotal;
  }

  const total = getFormTotal(formContext);

  return (
    <FormBody
      headerText="Finishing up"
      bodyText="Double-check everything looks OK before confirming."
    >
      <div className="finish-up">
        <div className="finish-up__plan">
          <span className="plan__description">
            <span className="description__name heading-2">
              {formContext.plan.name}{" "}
              <span className="name__scheme">({schemeData.longForm})</span>
            </span>
            <button
              className="name__action"
              onClick={(e) => {
                e.preventDefault();
                goStep(1);
              }}
            >
              Change
            </button>
          </span>
          <span className="plan__price">
            ${formContext.plan.price[`per${schemeData.name}`]}/
            {schemeData.shortForm}
          </span>
        </div>
        {(formContext.addOns["Online service"].value ||
          formContext.addOns["Larger storage"].value ||
          formContext.addOns["Customizable profile"].value) && (
          <ul className="finish-up__add-ons">
            {Object.keys(formContext.addOns).map((keyName) => {
              return formContext.addOns[keyName].value ? (
                <li className="add-on" key={keyName}>
                  <span className="add-on__name">{keyName}</span>
                  <span className="add-on__price">
                    +$
                    {formContext.addOns[keyName].price[`per${schemeData.name}`]}
                    /{schemeData.shortForm}
                  </span>
                </li>
              ) : (
                ""
              );
            })}
          </ul>
        )}
      </div>

      <div className="finish-up__total">
        <span className="total__text">
          Total (per {schemeData.name.toLowerCase()})
        </span>
        <span className="total__price">
          +${`${total}`}/{schemeData.shortForm}
        </span>
      </div>
    </FormBody>
  );
}
