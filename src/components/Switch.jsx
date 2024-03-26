import "../sass/Switch.scss";

// eslint-disable-next-line react/prop-types
const Switch = ({ isOn, handleToggle }) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: isOn && "#D91A4D" }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      ></label>
    </>
  );
};

export default Switch;
