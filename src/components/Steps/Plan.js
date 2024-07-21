import React, { useContext, useEffect, useState } from "react";

import FormBody from "../FormBody/FormBody";
import RadioSelect from "../shared/RadioSelect";
import Toggle from "../shared/Toggle";

import { FormContext } from "../../context/form-context";
import { convertSchemeToText } from "../../utils";

const planOptions = [
  {
    name: "Arcade",
    price: {
      perYear: 90,
      perMonth: 9,
    },
    promo: "2 months free",
    color: "orange",
  },
  {
    name: "Advanced",
    price: {
      perYear: 120,
      perMonth: 12,
    },
    promo: "2 months free",
    color: "pink",
  },
  {
    name: "Pro",
    price: {
      perYear: 150,
      perMonth: 15,
    },
    promo: "2 months free",
    color: "purple",
  },
];

let validityStore = null;

const validatePlan = (planIndex) => typeof Number(planIndex) === "number";

export default function Plan({ setFlowValidity }) {
  const { FormState: formContext } = useContext(FormContext);
  const [selectedPlan, setSelectedPlan] = useState({
    planIndex: formContext.plan.index,
    scheme: formContext.scheme,
  });

  const [schemeData, setSchemeData] = useState(
    convertSchemeToText(selectedPlan.scheme)
  );

  useEffect(() => {
    setSchemeData(convertSchemeToText(selectedPlan.scheme));
  }, [selectedPlan]);

  const [formValid, setFormValid] = useState({
    planIndex: true,
    scheme: true,
  });

  const updateValidity = () => {
    validityStore && clearTimeout(validityStore);
    setTimeout(() => {
      setFlowValidity(formValid.planIndex && formValid.scheme, [
        {
          type: "plan",
          payload: {
            ...planOptions[selectedPlan.planIndex],
            index: selectedPlan.planIndex,
          },
        },
        {
          type: "scheme",
          payload: selectedPlan.scheme,
        },
      ]);
    }, 500);
  };

  const handlePlanChange = (event) => {
    setSelectedPlan({ ...selectedPlan, planIndex: Number(event.target.value) });
    setFormValid({
      ...formValid,
      planIndex: validatePlan(selectedPlan.planIndex),
    });
  };

  const handleSchemeChange = (event) => {
    setSelectedPlan({ ...selectedPlan, scheme: Number(event.target.checked) });
    setFormValid({
      ...formValid,
      planIndex: validatePlan(selectedPlan.scheme),
    });
  };

  useEffect(() => {
    updateValidity();
  }, [formValid]);

  return (
    <FormBody
      headerText="Select your plan"
      bodyText="You have the option of monthly or yearly billing."
    >
      <RadioSelect
        options={planOptions}
        name="plans"
        keyName="name"
        onChange={handlePlanChange}
        selectedValue={selectedPlan.planIndex}
        durationData={schemeData}
      />
      <Toggle
        offValue="Monthly"
        onValue="Yearly"
        onChange={handleSchemeChange}
        value={selectedPlan.scheme}
      />
    </FormBody>
  );
}
