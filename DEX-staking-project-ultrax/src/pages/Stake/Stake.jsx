import React from "react";

import { getConstant } from "config/chains";

import StakeV1 from "./StakeV1";
import StakeV2 from "./StakeV2";

export default function Stake(props) {
  const isV2 = true;
  return isV2 ? <StakeV2 {...props} /> : <StakeV1 {...props} />;
}
