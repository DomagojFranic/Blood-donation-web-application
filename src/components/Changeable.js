import React, { useState, useImperativeHandle } from "react";
import PropTypes from 'prop-types'

const Changeable = React.forwardRef((props, ref) => {
  const [visible, setVisibility] = useState(false);

  const hide = { display: visible ? "none" : "" };
  const show = { display: visible ? "" : "none" };

  const changeVisibility = () => {
    setVisibility(!visible);
  };

  useImperativeHandle(ref, () => {
    return { changeVisibility };
  });

  return (
    <div>
      <div style={hide}>
        <button onClick={changeVisibility}>{props.title}</button>
      </div>
      <div style={show}>
        {props.children}
        <button onClick={changeVisibility}>Odustani</button>
      </div>
    </div>
  );
});

Changeable.propTypes = {
    title: PropTypes.string.isRequired
}
export default Changeable;
