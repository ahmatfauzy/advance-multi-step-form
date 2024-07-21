"use client";

import React, { useReducer, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

import { FormContext } from "./context/form-context";

import "./App.css";

// Components
import FormHeader from "./components/FormHeader/FormHeader.js";
import FormFooter from "./components/FormFooter/FormFooter";
import PersonalInfo from "./components/Steps/PersonalInfo";
import Plan from "./components/Steps/Plan";
import AddOns from "./components/Steps/AddOns";
import FinishUp from "./components/Steps/FinishUp.js";
import Success from "./components/Steps/Success.js";

let queuedAction = null;

function notify(text = "Hello", icon = "😅") {
  toast(text, { icon });
}

function App(props) {
  const { dispatchForm: dispatchFormContext } = useContext(FormContext);

  function dispatchActionToContext(actions) {
    if (!actions) return;
    if (Array.isArray(actions)) {
      actions.forEach((action) => {
        dispatchFormContext(action);
      });
    } else {
      dispatchFormContext(actions);
    }
  }

  const [formFlow, dispatchFormFlow] = useReducer(
    (currentState, action) => {
      const state = { ...currentState };
      function resetState() {
        dispatchActionToContext(queuedAction);
        state.validForm = false;
        state.attemptedSubmit = false;
        queuedAction = null;
      }
      function checkForUnvisitedPreviousSteps(target, current, stepsData) {
        // allow user go to previous steps
        if (target < current) return false;

        for (let i = current + 1; i < target; i++) {
          if (!stepsData[i].visited) return true;
        }

        return false;
      }
      switch (action.type) {
        case "next":
          if (state.validForm || state.step === 3) {
            state.stepsData[state.step].visited = true;
            state.step = state.step + 1;
            resetState();
          } else {
            state.attemptedSubmit = true;
          }
          break;
        case "prev":
          if (state.validForm || state.step === 3) {
            state.stepsData[state.step].visited = true;
            state.step = state.step - 1;
            resetState();
          } else {
            state.attemptedSubmit = true;
          }
          break;
        case "step":
          if (state.validForm || state.step === 3) {
            if (
              !checkForUnvisitedPreviousSteps(
                action.payload,
                state.step,
                state.stepsData
              )
            ) {
              state.stepsData[state.step].visited = true;
              state.step = action.payload;
              resetState();
            } else if (state.validForm) {
              state.stepsData[state.step].visited = true;
              state.step = state.step + 1;
              notify(`Complete leading steps to reach that stage`);
              resetState();
            }
          } else {
            state.attemptedSubmit = true;
          }
          break;
        case "validity":
          state.validForm = action.payload;
          break;
        default:
          console.log("provide a valid action");
      }

      return state;
    },
    {
      step: 0,
      validForm: false,
      attemptedSubmit: false,
      stepsData: [
        { visited: false },
        { visited: false },
        { visited: false },
        { visited: false },
      ],
    }
  );

  function goNext() {
    dispatchFormFlow({
      type: "next",
    });
  }

  function goPrev() {
    dispatchFormFlow({
      type: "prev",
    });
  }

  function goStep(step) {
    dispatchFormFlow({
      type: "step",
      payload: step,
    });
  }

  function setFlowValidity(value, contextAction) {
    dispatchFormFlow({
      type: "validity",
      payload: value,
    });
    queuedAction = contextAction;
  }

  return (
    <>
      <div className="app container-spacing">
        <FormHeader formFlow={formFlow} goStep={goStep} />
        {
          [
            <PersonalInfo
              formFlow={formFlow}
              setFlowValidity={setFlowValidity}
            />,
            <Plan formFlow={formFlow} setFlowValidity={setFlowValidity} />,
            <AddOns formFlow={formFlow} setFlowValidity={setFlowValidity} />,
            <FinishUp
              formFlow={formFlow}
              setFlowValidity={setFlowValidity}
              goStep={goStep}
            />,
            <Success
              formFlow={formFlow}
              setFlowValidity={setFlowValidity}
              goStep={goStep}
            />,
          ][formFlow?.step]
        }
        {formFlow.step !== 4 && (
          <FormFooter formFlow={formFlow} goNext={goNext} goPrev={goPrev} />
        )}
      </div>
      <Toaster
        toastOptions={{
          style: {
            background: "white",
            color: "var(--denim)",
          },
        }}
      />
    </>
  );
}

export default App;
