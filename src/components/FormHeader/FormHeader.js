// assets
import "./FormHeader.css";
import MobileBackground from "../../assets/bg-sidebar-mobile.svg";
import DestktopBackground from "../../assets/bg-sidebar-desktop.svg";

export default function FormHeader({ formFlow, goStep }) {
  const allSteps = [1, 2, 3, 4];
  const stepTexts = ["Your Info", "Select Plan", "Add-Ons", "Summary"];
  return (
    <header
      className="form-header"
      style={{
        "--background": `url(${MobileBackground})`,
        "--background-desktop": `url(${DestktopBackground})`,
      }}
    >
      <ul className="form-nav">
        {allSteps.map((step) => {
          return (
            <li
              className="form-nav__step"
              key={step}
              onClick={() => goStep(step - 1)}
            >
              <button
                className={`step__button-indicator ${
                  (formFlow.step + 1 === step ||
                    (step === 4 && formFlow.step === 4)) &&
                  "active"
                } `}
              >
                {step}
              </button>

              <div className="step__details">
                <span className="details__step-name"> Step {step}</span>
                <span className="details__step-desc">
                  {" "}
                  {stepTexts[step - 1]}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
