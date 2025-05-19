import { t, Trans } from "@lingui/macro";
import StatsTooltipRow from "components/StatsTooltip/StatsTooltipRow";
import { BigNumber } from "ethers";
import { formatKeyAmount } from "lib/numbers";

type Props = {
  processedData: {
    utxAprForEsUtx: BigNumber;
    utxAprForNativeToken: BigNumber;
    utxAprForNativeTokenWithBoost: BigNumber;
    utxBoostAprForNativeToken?: BigNumber;
  };
  nativeTokenSymbol: string;
};

function renderEscrowedUTXApr(processedData) {
  if (!processedData?.utxAprForEsUtx?.gt(0)) return;
  return (
    <StatsTooltipRow
      label={t`Escrowed UTX APR`}
      showDollar={false}
      value={`${formatKeyAmount(processedData, "utxAprForEsUtx", 2, 2, true)}%`}
    />
  );
}

export default function UTXAprTooltip({ processedData, nativeTokenSymbol }: Props) {
  return (
    <>
      {(!processedData.utxBoostAprForNativeToken || processedData.utxBoostAprForNativeToken.eq(0)) && (
        <StatsTooltipRow
          label={t`${nativeTokenSymbol} APR`}
          showDollar={false}
          value={`${formatKeyAmount(processedData, "utxAprForNativeToken", 2, 2, true)}%`}
        />
      )}
      {processedData?.utxBoostAprForNativeToken?.gt(0) ? (
        <div>
          <StatsTooltipRow
            label={t`${nativeTokenSymbol} Base APR`}
            showDollar={false}
            value={`${formatKeyAmount(processedData, "utxAprForNativeToken", 2, 2, true)}%`}
          />
          <StatsTooltipRow
            label={t`${nativeTokenSymbol} Boosted APR`}
            showDollar={false}
            value={`${formatKeyAmount(processedData, "utxBoostAprForNativeToken", 2, 2, true)}%`}
          />
          <div className="Tooltip-divider" />
          <StatsTooltipRow
            label={t`${nativeTokenSymbol} Total APR`}
            showDollar={false}
            value={`${formatKeyAmount(processedData, "utxAprForNativeTokenWithBoost", 2, 2, true)}%`}
          />
          <br />
          {renderEscrowedUTXApr(processedData)}
          <br />
          <Trans>The Boosted APR is from your staked Multiplier Points.</Trans>
        </div>
      ) : (
        renderEscrowedUTXApr(processedData)
      )}
      <div>
        <br />
        <Trans>APRs are updated weekly on Wednesday and will depend on the fees collected for the week.</Trans>
      </div>
    </>
  );
}
