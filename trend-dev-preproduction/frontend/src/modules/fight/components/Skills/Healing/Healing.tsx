import React, { FC } from "react";
import styles from "./Healing.module.scss";

const Healing: FC = () => {
  return (
    <div className={styles.container}>
      <svg className={styles.why} viewBox="0 0 350 400">
        <g>
          <path
            className={styles.stem}
            d="M 0,150 C 180,80 170,80 350,150"
            stroke="green"
            strokeWidth="4"
            fill="transparent"
          />
        </g>
        <g>
          <linearGradient
            id="SVGID_1_"
            gradientUnits="userSpaceOnUse"
            x1="127.5017"
            y1="193.8015"
            x2="221.8669"
            y2="193.8015"
            gradientTransform="matrix(1 0 0 -1 0 400.1102)"
          >
            <stop offset="0" style={{ stopColor: "#F37767" }} />
            <stop offset="0.0431" style={{ stopColor: "#F37259" }} />
            <stop offset="0.0998" style={{ stopColor: "#F36E4A" }} />
            <stop offset="0.1579" style={{ stopColor: "#F36B3C" }} />
            <stop offset="0.2174" style={{ stopColor: "#F26A35" }} />
            <stop offset="0.2809" style={{ stopColor: "#F26933" }} />
            <stop offset="0.6685" style={{ stopColor: "#9A1C21" }} />
            <stop offset="0.896" style={{ stopColor: "#431610" }} />
            <stop offset="1" style={{ stopColor: "#502612" }} />
          </linearGradient>
        </g>

        <g transform="translate(-10,20)">
          <g className={styles.st1}>
            <path
              d="M97.77,124.89c0,0,12.42-45.97,56.71-46.98C154.48,77.91,160.18,98.71,97.77,124.89z"
              transform="scale(-1,1)"
              transform-origin="center"
            />
          </g>
        </g>
        <g transform="rotate(20 50 0) translate(-20,-15) ">
          <g className={styles.st2}>
            <path
              d="M97.77,124.89c0,0,12.42-45.97,56.71-46.98C154.48,77.91,160.18,98.71,97.77,124.89z"
              transform="scale(-1,1)"
              transform-origin="center"
            />
          </g>
        </g>
        <g transform="rotate(70 50 0) translate(-20,-105) ">
          <g className={styles.st5}>
            <path
              d="M97.77,124.89c0,0,12.42-45.97,56.71-46.98C154.48,77.91,160.18,98.71,97.77,124.89z"
              transform="scale(-1,1)"
              transform-origin="center"
            />
          </g>
        </g>
        <g transform="rotate(50 50 0) translate(-35,-20) ">
          <g className={styles.st4}>
            <path
              d="M97.77,124.89c0,0,12.42-45.97,56.71-46.98C154.48,77.91,160.18,98.71,97.77,124.89z"
              transform="scale(-1,1)"
              transform-origin="center"
            />
          </g>
        </g>
        <g transform="rotate(15 15 -15)translate(-54,-1)">
          <g className={styles.st3}>
            <path
              d="M97.77,124.89c0,0,12.42-45.97,56.71-46.98C154.48,77.91,160.18,98.71,97.77,124.89z"
              transform="scale(-1,1)"
              transform-origin="center"
            />
          </g>
        </g>
        <g transform="translate(95,-178)">
          <g className={styles.st0}>
            <path
              d="M97.77,124.89c0,0,12.42-45.97,56.71-46.98C154.48,77.91,160.18,98.71,97.77,124.89z"
              transform="scale(1,-1)"
              transform-origin="center"
            />
          </g>
        </g>
        <g transform="rotate(-15 -50 20) translate(24,-128)">
          <g className={styles.st0a}>
            <path
              d="M97.77,124.89c0,0,12.42-45.97,56.71-46.98C154.48,77.91,160.18,98.71,97.77,124.89z"
              transform="scale(1,-1)"
              transform-origin="center"
            />
          </g>
        </g>
        <g transform="rotate(-80 10 60)translate(-140,-140)">
          <g className={styles.st0b}>
            <path
              d="M97.77,124.89c0,0,12.42-45.97,56.71-46.98C154.48,77.91,160.18,98.71,97.77,124.89z"
              transform="scale(1,-1)"
              transform-origin="center"
            />
          </g>
        </g>
        <g transform=" rotate(-165 3 120) translate(-160,-140)">
          <g className={styles.st0l}>
            <path
              d="M97.77,124.89c0,0,12.42-45.97,56.71-46.98C154.48,77.91,160.18,98.71,97.77,124.89z"
              transform="scale(1,-1)"
              transform-origin="center"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Healing;
