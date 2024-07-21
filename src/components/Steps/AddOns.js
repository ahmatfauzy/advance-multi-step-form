import React, { useContext, useEffect, useState } from "react";
import { FormContext } from "../../context/form-context";

import { convertSchemeToText } from "../../utils";

// Components
import FormBody from "../FormBody/FormBody";
import ToggleOptions from "../shared/ToggleOptions";

let validityStore = null;

export default function AddOns({ setFlowValidity }) {
  const { FormState: formContext } = useContext(FormContext);
  const [addOnForm, setAddOnForm] = useState(formContext.addOns);

  const schemeData = convertSchemeToText(formContext.scheme);

  const updateValidity = () => {
    validityStore && clearTimeout(validityStore);
    setTimeout(() => {
      setFlowValidity(true, {
        type: "addOns",
        payload: addOnForm,
      });
    }, 500);
  };

  const handleAddOnChange = (event, keyName) => {
    const newValue = { ...addOnForm };
    newValue[keyName].value = event.target.checked;
    setAddOnForm(newValue);
  };

  useEffect(() => {
    updateValidity();
  }, [addOnForm]);

  return (
    <FormBody
      headerText="Pick add-ons"
      bodyText="Add-ons help enhance your gaming experience."
    >
      <ToggleOptions
        options={addOnForm}
        onChange={handleAddOnChange}
        durationData={schemeData}
      />
    </FormBody>
  );
}
