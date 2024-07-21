// Styles
import "./FormBody.css";

export default function FormBody({
  headerText,
  bodyText,
  children,
  classes = [""],
}) {
  return (
    <form className={`form-body ${classes.join(" ")}`}>
      <div className="form-body__wrapper">
        <header className="form-body__header">
          <h1 className="heading-1">{headerText}</h1>
          <p className="body">{bodyText}</p>
        </header>
        <div className="form-body__fields">{children}</div>
      </div>
    </form>
  );
}
