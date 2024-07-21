import React, { useReducer } from "react";

const formSchema = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
  },
  plan: {
    name: "Arcade",
    price: {
      perYear: 90,
      perMonth: 9,
    },
    promo: "2 months free",
    color: "orange",
    index: 0,
  },
  addOns: {
    "Online service": {
      description: "Access to multiplayer games",
      value: true,
      price: {
        perYear: 10,
        perMonth: 1,
      },
    },
    "Larger storage": {
      description: "Access to multiplayer games",
      value: true,
      price: {
        perYear: 20,
        perMonth: 2,
      },
    },
    "Customizable profile": {
      description: "Access to multiplayer games",
      value: false,
      price: {
        perYear: 20,
        perMonth: 2,
      },
    },
  },
  scheme: 0,
};

export const FormContext = React.createContext(formSchema);

export default function FormContextProvider(props) {
  const [FormState, dispatchForm] = useReducer((currentState, action) => {
    const state = { ...currentState };
    switch (action.type) {
      case "personalInfo":
        state.personalInfo = action.payload;
        break;
      case "plan":
        state.plan = action.payload;
        break;
      case "addOns":
        state.addOns = action.payload;
        break;
      case "scheme":
        state.scheme = action.payload;
        break;
      default:
        console.log("provide a valid action type");
        break;
    }

    return state;
  }, formSchema);
  return (
    <FormContext.Provider
      value={{
        FormState,
        dispatchForm,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
}
