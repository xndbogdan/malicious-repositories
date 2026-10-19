import { useEffect, useState } from "react";
import WoodButton from "./WoodButton";
import Container from "./Container";
import TokenList from "./TokenList";
import LoadingModal from "./LoadingModal";
import OutcomeModal from "./OutcomeModal";
import UnstakeModal from "./UnstakeModal";
import EthereumInteraction from "./EthereumInteraction";
import { parseClaims, stake, claim } from "../utils/barn";
import { parseBigNumber, watchTransaction } from "../utils/ethereum";
import { BigNumber } from "@ethersproject/bignumber";

const Staking = ({
  fetching,
  tokens,
  stakes,
  wallet,
  chain,
  reload,
  stats,
  wool,
}) => {
  const [loadingScenes, setLoadingScenes] = useState([]);
  const [outcomes, setOutcomes] = useState([]);
  const [operation, setOperation] = useState(null);
  const [selected, setSelected] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);

  const [isUnstaking, setIsUnstaking] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transacting, setTransacting] = useState(false);

  useEffect(() => {
    if (selected.length === 0) setOperation(null);
  }, [selected]);

  const onStake = async () => {
    setLoading(true);
    setError(null);
    try {
      const hash = (
        await stake(
          wallet,
          selected.map((x) => x.number)
        )
      ).hash;
      setTransacting(true);
      watchTransaction(hash, async (receipt, success) => {
        if (!success) {
          setLoading(false);
          setTransacting(false);
          return setError("Stake failed. Check transaction.");
        }
        const o = [];
        for (let i = 0; i < selected.length; i++) {
          const message = selected[i].isSheep
            ? `Sheep #${selected[i].number} entered the barn`
            : `Wolf #${selected[i].number} joined the pack`;
          const source = selected[i].isSheep
            ? "/images/staked-barn.gif"
            : "/images/staked-pack.gif";
          o.push({ message, source });
        }
        setOutcomes(o);
        setLoading(false);
        setTransacting(false);
      });
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const onClaim = async (unstake) => {
    setLoading(true);
    setError(null);
    try {
      const hash = (
        await claim(
          selected.map((x) => x.number),
          unstake
        )
      ).hash;
      setTransacting(true);
      setIsUnstaking(false);
      watchTransaction(hash, async (receipt, success) => {
        if (!success) {
          setLoading(false);
          setTransacting(false);
          return setError("Unstake failed. Check transaction.");
        }
        presentOutcomes(receipt);
        setLoading(false);
        setTransacting(false);
      });
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const canUnstake = () => {
    const timestamp = Math.floor(Date.now() / 1000);
    for (let i in selected) {
      if (!selected[i].isSheep) continue;
      if (parseInt(selected[i].value) + 2 * 24 * 60 * 60 > timestamp)
        return false;
    }
    return true;
  };

  const presentOutcomes = (receipt) => {
    const claims = parseClaims(receipt);
    const o = [];
    for (let i = 0; i < claims.length; i++) {
      const token = selected.find(
        (el) => el.number === claims[i].tokenId.toString()
      );
      if (token.isSheep) {
        if (claims[i].unstaked) {
          if (claims[i].earned.eq(BigNumber.from(0))) {
            o.push({
              message: `Sheep #${token.number} left the barn, but all its $aWOOL was stolen by wolves!`,
              source: "/images/unstaked-notsafe.gif",
            });
          } else {
            o.push({
              message: `Sheep #${
                token.number
              } left the barn and evaded the Wolves, earning ${parseBigNumber(
                claims[i].earned
              )} $aWOOL`,
              source: "/images/unstaked-safe.gif",
            });
          }
        } else {
          o.push({
            message: `Sheep #${token.number} was sheared for ${parseBigNumber(
              claims[i].earned
            )} $aWOOL, after paying a 20% tax to the Wolves.`,
            source: "/images/sheared.gif",
          });
        }
      } else {
        if (claims[i].unstaked) {
          o.push({
            message: `Wolf #${
              token.number
            } left the pack, and received ${parseBigNumber(
              claims[i].earned
            )} $aWOOL!`,
            source: "/images/unstaked-pack.gif",
          });
        } else {
          o.push({
            message: `Wolf #${token.number} collected a tax of ${parseBigNumber(
              claims[i].earned
            )} $aWOOL!`,
            source: "/images/claimed-pack.gif",
          });
        }
      }
    }
    setOutcomes(o);
  };

  return (
    <Container>
      <div className="flex flex-col items-center font-pixel gap-5">
        <div className="flex justify-between items-center font-console gap-2">
          <div>$aWOOL in your wallet:</div>
          <div>{parseBigNumber(wool)} $aWOOL</div>
        </div>
        <div className="subtitle mt-5">Unstaked</div>
        <EthereumInteraction wallet={wallet} chain={chain}>
          {fetching ? (
            <div className="text-center text-red font-console">Fetching...</div>
          ) : (
            <TokenList
              title={"Can Stake"}
              active={operation !== "CLAIM"}
              items={tokens}
              selected={selected}
              toggleSelected={(item, select) => {
                if (operation !== "STAKE" && operation !== null) return;
                setOperation("STAKE");
                setSelected((current) => {
                  return select
                    ? current.concat(item)
                    : current.filter((el) => el.id !== item.id);
                });
              }}
            />
          )}
          {/* <div style={{height:'80px'}} className="text-sm font-console flex items-center text-red text-center">
            Your sheep, or woolf will be revealed after staking into the barn
          </div> */}
        </EthereumInteraction>
        <div className="subtitle mt-5">Staked</div>
        <EthereumInteraction wallet={wallet} chain={chain}>
          {fetching ? (
            <div className="text-center text-red font-console">Fetching...</div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center gap-2">
              <TokenList
                title={"BARN"}
                active={operation !== "STAKE"}
                items={stakes?.filter((el) => el.isSheep)}
                selected={selected}
                stats={stats}
                toggleSelected={(item, select) => {
                  if (operation !== "CLAIM" && operation !== null) return;
                  setOperation("CLAIM");
                  setSelected((current) => {
                    return select
                      ? current.concat(item)
                      : current.filter((el) => el.id !== item.id);
                  });
                }}
              />
              <TokenList
                title={"Wolfpack"}
                active={operation !== "STAKE"}
                items={stakes?.filter((el) => !el.isSheep)}
                selected={selected}
                stats={stats}
                toggleSelected={(item, select) => {
                  if (operation !== "CLAIM" && operation !== null) return;
                  setOperation("CLAIM");
                  setSelected((current) => {
                    return select
                      ? current.concat(item)
                      : current.filter((el) => el.id !== item.id);
                  });
                }}
              />
              <div className="w-full flex flex-col md:flex-row justify-center items-center gap-1">
                {/* {selected.length === 1 && (
                   <WoodButton width={150} height={80} fontSize="16px" title={'View on OpenSea'} loading={loading} onClick={() => {
                     window.open(`${process.env.REACT_APP_OPENSEA}/${process.env.REACT_APP_WOOLF}/${parseInt(selected[0].id)}`, "_blank")
                  }}/>
                )} */}
                {operation === "CLAIM" && (
                  <>
                    <WoodButton
                      width={150}
                      height={80}
                      fontSize="16px"
                      title={"SHEAR $aWOOL"}
                      loading={loading}
                      onClick={() => {
                        const isClaimingSheep = !!selected.find(
                          (el) => el.isSheep
                        );
                        const isClaimingWolf = !!selected.find(
                          (el) => !el.isSheep
                        );
                        const scenes = [];
                        if (isClaimingSheep)
                          scenes.push({
                            message: "Shearing sheep",
                            source: "/images/shearing.gif",
                          });
                        if (isClaimingWolf)
                          scenes.push({
                            message: "Collecting 20% tax",
                            source: "/images/claiming-pack.gif",
                          });
                        setLoadingScenes(scenes);
                        onClaim(false);
                      }}
                    />
                    <div className={canUnstake() ? "" : "opacity-50"}>
                      <WoodButton
                        width={150}
                        height={80}
                        fontSize="16px"
                        title={"SHEAR $aWOOL AND UNSTAKE"}
                        disabled={!canUnstake()}
                        loading={loading}
                        onClick={() => {
                          if (!canUnstake()) return;
                          const isUnstakingSheep = !!selected.find(
                            (el) => el.isSheep
                          );
                          if (isUnstakingSheep) {
                            setIsUnstaking(true);
                            return;
                          }
                          const isUnstakingWolf = !!selected.find(
                            (el) => !el.isSheep
                          );
                          const scenes = [];
                          if (isUnstakingSheep)
                            scenes.push({
                              message: "Shearing and leaving the barn",
                              source: "/images/unstaking-barn.gif",
                            });
                          if (isUnstakingWolf)
                            scenes.push({
                              message: "Collecting tax and leaving the pack",
                              source: "/images/unstaking-pack.gif",
                            });
                          setLoadingScenes(scenes);
                          onClaim(true);
                        }}
                      />
                    </div>
                  </>
                )}
                {operation === "STAKE" && (
                  <WoodButton
                    width={150}
                    height={80}
                    fontSize="16px"
                    title={"STAKE"}
                    loading={loading}
                    onClick={() => {
                      const isStakingSheep = !!selected.find(
                        (el) => el.isSheep
                      );
                      const isStakingWolf = !!selected.find(
                        (el) => !el.isSheep
                      );
                      const scenes = [];
                      if (isStakingSheep)
                        scenes.push({
                          message: "Entering the Barn",
                          source: "/images/staking-barn.gif",
                        });
                      if (isStakingWolf)
                        scenes.push({
                          message: "Joining the Wolfpack",
                          source: "/images/staking-pack.gif",
                        });
                      setLoadingScenes(scenes);
                      onStake(selected);
                    }}
                  />
                )}
                {operation === null && (
                  <div>
                    <div
                      style={{ height: "80px" }}
                      className="text-sm font-console flex items-center text-red text-center"
                    >
                      Select tokens to stake, shear, or unstake
                      </div>
                      <div className="mb-5">
                        <WoodButton title={!selectedAll ? "Select ALL" : "Deselect ALL"} fontSize="16px" loading={loading} onClick={
                          () => {
                            if (!selectedAll) {
                              setSelected(stakes);
                              setSelectedAll(true);
                            } else {
                              setSelected([]);
                              setSelectedAll(false);
                            }
                          }
                        } />
                      </div>
                      {selectedAll && (<WoodButton title={"Shear and collect ALL"} fontSize="16px" loading={loading} onClick={
                        () => {
                          const isClaimingSheep = !!selected.find(
                            (el) => el.isSheep
                          );
                          const isClaimingWolf = !!selected.find(
                            (el) => !el.isSheep
                          );
                          const scenes = [];
                          if (isClaimingSheep)
                            scenes.push({
                              message: "Shearing sheep",
                              source: "/images/shearing.gif",
                            });
                          if (isClaimingWolf)
                            scenes.push({
                              message: "Collecting 20% tax",
                              source: "/images/claiming-pack.gif",
                            });
                          setLoadingScenes(scenes);
                          onClaim(false);
                          setSelectedAll(false);
                        }
                      } />)}
                  </div>
                )}
              </div>
              {operation === "CLAIM" && !canUnstake() && (
                <div
                  className="text-xs text-center text-red"
                  style={{ width: "300px" }}
                >
                  You can only unstake a Sheep if it has at least 2 days worth
                  of $aWOOL.
                </div>
              )}
            </div>
          )}
        </EthereumInteraction>
      </div>
      {error && <div className="text-sm text-red font-console">{error}</div>}
      <LoadingModal loadingScenes={loadingScenes} modalIsOpen={transacting} />
      <OutcomeModal
        outcomes={outcomes}
        modalIsOpen={outcomes.length > 0}
        closeModal={() => {
          reload();
          setOutcomes([]);
          setSelected([]);
        }}
      />
      <UnstakeModal
        modalIsOpen={isUnstaking}
        closeModal={() => {
          setIsUnstaking(false);
        }}
        loading={loading}
        onClick={() => {
          const isUnstakingSheep = !!selected.find((el) => el.isSheep);
          const isUnstakingWolf = !!selected.find((el) => !el.isSheep);
          const scenes = [];
          if (isUnstakingSheep)
            scenes.push({
              message: "Shearing and leaving the Barn",
              source: "/images/unstaking-barn.gif",
            });
          if (isUnstakingWolf)
            scenes.push({
              message: "Collecting tax and leaving the Wolfpack",
              source: "/images/unstaking-pack.gif",
            });
          setLoadingScenes(scenes);
          onClaim(true);
        }}
      />
    </Container>
  );
};

export default Staking;
