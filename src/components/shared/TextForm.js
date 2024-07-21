import "./TextForm.css";

export default function TextForm({
  label,
  placeholder,
  value,
  onChange,
  type,
  validationMessage = "Enter a valid value",
  errorState = false,
}) {
  function highlghtAll(e) {
    e.target.select();
  }
  return (
    <div className="text-form">
      <label className="text-form__label">{label}</label>
      {errorState && (
        <span className="text-form__error">{validationMessage}</span>
      )}
      <input
        className={`text-form__input ${errorState && "error"}`}
        type={["text", "email", "tel"].includes(type) ? type : "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={highlghtAll}
      />
    </div>
  );
}
