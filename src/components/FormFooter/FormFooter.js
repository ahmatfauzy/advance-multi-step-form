// Styles
import "./FormFooter.css";

// Components
import Button from "../shared/Button.js";

export default function formFooter(props) {
  return (
    <footer className="form-footer container-spacing">
      {0 !== props?.formFlow?.step && (
        <Button
          variant="secondary prev-button container"
          onClick={props.goPrev}
        >
          Go Back
        </Button>
      )}
      <Button variant="primary next-button" onClick={props.goNext}>
        {props.formFlow.step === 3 ? "Confirm" : "Next Step"}
      </Button>
    </footer>
  );
}
