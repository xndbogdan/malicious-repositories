import Slider, { SliderTooltip } from "rc-slider";
import cx from "classnames";
import { BASIS_POINTS_DIVISOR, MAX_ALLOWED_LEVERAGE } from "lib/legacy";
import "rc-slider/assets/index.css";

const leverageMarks = {
  1: "1x",
  10: "10x",
  20: "20x",
  30: "30x",
  40: "40x",
  50: "50x",
};

const leverageSliderHandle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${parseFloat(value).toFixed(2)}x`}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Slider.Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

type Props = {
  isLong: boolean;
  setLeverageOption: (value: number) => void;
  leverageOption: number;
};

export default function LeverageSlider({ isLong, setLeverageOption, leverageOption }: Props) {
  return (
    <div
      className={cx("Exchange-leverage-slider", "App-slider", {
        positive: isLong,
        negative: !isLong,
      })}
    >
      <Slider
        min={1}
        max={MAX_ALLOWED_LEVERAGE / BASIS_POINTS_DIVISOR}
        step={0.1}
        marks={leverageMarks}
        handle={leverageSliderHandle}
        onChange={(value) => setLeverageOption(value)}
        defaultValue={leverageOption}
      />
    </div>
  );
}
