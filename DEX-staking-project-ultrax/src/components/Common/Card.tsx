import { ReactNode } from "react";
import Tooltip from "../Tooltip/Tooltip";
import "./Card.css";

type Props = {
  title: string | ReactNode;
  children: ReactNode;
  className?: string;
  tooltipText?: string;
};

function Card({ title, children, className, tooltipText }: Props) {
  return (
    <div
      className={`card ${className ? className : ""}`}
      style={{
        boxShadow: "4px 4px 0px 0px #090D13",
        background: "var(--bg-default)",
      }}
    >
      {tooltipText ? (
        <Tooltip
          handle={<div className="card-header">{title}</div>}
          position="left-bottom"
          renderContent={() => tooltipText}
        />
      ) : (
        <div className="card-header">{title}</div>
      )}
      {title && <div className="card-divider"></div>}
      <div className="card-body">{children}</div>
    </div>
  );
}

export default Card;
