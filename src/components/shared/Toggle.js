// Styles
import "./Toggle.css";

export default function Toggle({ onValue, offValue, id, onChange, value }) {
  return (
    <label className="toggle" htmlFor={id}>
      <input
        id={id}
        className="toggle__checkbox"
        type="checkbox"
        onChange={onChange}
        checked={value}
      />
      <span className="toggle__off toggle__text">{offValue}</span>
      <span className="toggle__wrapper">
        <span className="wrapper__switch"></span>
      </span>
      <span className="toggle__on toggle__text">{onValue}</span>
    </label>
  );
}
