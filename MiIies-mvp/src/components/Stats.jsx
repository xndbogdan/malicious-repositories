import { useState } from "react";
import { parseBigNumber } from "../utils/ethereum";
import { BigNumber } from "@ethersproject/bignumber";
import Container from "./Container";

const Stats = ({ stats, users }) => {
  const [global, setGlobal] = useState(true);

  const stakedPercentage = (_global) => {
    return (((parseInt(_global?.sheepMinted) + parseInt(_global?.wolvesMinted)) / parseInt(_global?.totalSupply)) * 100).toFixed(2)
  }

  return (
    <Container>
      <div className="flex flex-col items-center font-pixel gap-4 text-center">
        <div className="w-full flex justify-around items-center">
          <div
            className={`${
              global ? "underline text-red text-xl" : "text-gray"
            } font-console cursor-pointer`}
            onClick={() => setGlobal(true)}
          >
            Game Status
          </div>
          <div
            className={`${
              !global ? "underline text-red text-xl" : "text-gray"
            } font-console cursor-pointer`}
            onClick={() => setGlobal(false)}
          >
            Leaderboard
          </div>
        </div>

        {global ? (
          <div className="w-full flex flex-col xl:flex-row justify-between items-center">
            <div className="w-full flex flex-col xl:items-start items-center">
              <div className="font-console">
                Sheep Minted: {stats?.sheepMinted}
              </div>
              {/* <div className="font-console">
                Sheep Staked: {stats?.sheepStaked}
              </div> */}
              <div className="font-console">
                Wolves Minted: {stats?.wolvesMinted}
              </div>
              {/* <div className="font-console">
                Wolves Staked: {stats?.wolvesStaked}
              </div> */}
              <div className="font-console">
                Staked: {stakedPercentage(stats)} %
              </div>
            </div>
            <div className="w-full flex flex-col xl:items-start items-center">
              {/* <div className="font-console">
                Sheep Stolen: {stats?.sheepStolen}
              </div>
              <div className="font-console">
                Wolves Stolen: {stats?.wolvesStolen}
              </div> */}
              <div className="font-console">
                $aWOOL Claimed:{" "}
                {stats?.woolClaimed
                  ? parseBigNumber(BigNumber.from(stats?.woolClaimed))
                  : 0}
              </div>
            </div>
          </div>
        ) : (
          <ol type="1" className="w-full font-console">
            {users ? (
                users.map((user, index) => {
                if (BigNumber.from(user.claimedWool).eq(BigNumber.from("0")))
                  return null;
                return (
                  <li>
                    <div className="flex justify-between mb-2">
                      <a
                        className="cursor-pointer"
                        href={`https://nftrade.com/users/avalanche/${user.id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="text-red text-xl mr-4">
                          {index + 1 + "."}
                        </span>
                        {user.id.slice(0, 2) +
                          " " +
                          user.id.slice(2, 6) +
                          " ... " +
                          user.id.slice(-4)}{" "}
                        ↗
                      </a>
                      <div>{parseBigNumber(user.claimedWool, 0)} $aWOOL</div>
                    </div>
                  </li>
                );
              })
            ) : (
              <div>Fetching...</div>
            )}
          </ol>
        )}
      </div>
    </Container>
  );
};

export default Stats;
