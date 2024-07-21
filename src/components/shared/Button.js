import "./Button.css";

export default function Button(props) {
  return (
    <button
      className={`form-button ubuntu-medium ${props?.variant}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
