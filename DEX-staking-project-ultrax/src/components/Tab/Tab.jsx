import React from "react";
import cx from "classnames";
import "./Tab.css";

export default function Tab(props) {
  const { options, option, setOption, onChange, type = "block", className, optionLabels, icons } = props;
  const onClick = (opt) => {
    if (setOption) {
      setOption(opt);
    }
    if (onChange) {
      onChange(opt);
    }
  };



  return (
    <div className={cx("Tab", type, className)}>
      {options.map((opt) => {
        const label = optionLabels && optionLabels[opt] ? optionLabels[opt] : opt;
       
        return (
          <div
            className={cx("Tab-option", "muted", { active: opt === option }, `style-label-${opt?.split(" ").join('')}`)}
            onClick={() => onClick(opt)}
            key={opt}
          >
            {label}
            {icons &&
              icons[opt] &&
              (opt === option && icons[opt + "_active"] ? (
                <img className="Tab-option-icon" src={icons[opt + "_active"]} alt={option} />
              ) : (
                <img className="Tab-option-icon" src={icons[opt]} alt={option} />
              ))}
          </div>
        );
      })}
    </div>
  );
}
