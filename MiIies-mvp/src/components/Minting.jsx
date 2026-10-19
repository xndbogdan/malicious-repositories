import { useState } from "react";
import WoodButton from "./WoodButton";
import Container from "./Container";
import MintProgress from "./MintProgress";
import LoadingModal from "./LoadingModal";
import OutcomeModal from "./OutcomeModal";
import EthereumInteraction from "./EthereumInteraction";
import { mint, mintWithJoe, mintWithTractor, parseMint } from "../utils/woolf";
import { approve } from "../utils/erc20";
// import { mint, parseMint, tokenURI, isInvalidWoolf } from '../utils/woolf'
import { watchTransaction } from "../utils/ethereum";
// import { decodeTokenURI, isSheep } from '../utils/uri'
import { decodeTokenURI } from "../utils/uri";
// import MintNStakeModal from './MintNStakeModal'
import { utils, BigNumber } from "ethers";

// todo: change these prices in woolf.js as well
const PLACEHOLDER =
    "data:application/json;base64,eyJuYW1lIjogIldvbGYgIzI5IiwgImRlc2NyaXB0aW9uIjogIlRob3VzYW5kcyBvZiBTaGVlcCBhbmQgV29sdmVzIGNvbXBldGUgb24gYSBmYXJtIGluIHRoZSBtZXRhdmVyc2UuIEEgdGVtcHRpbmcgcHJpemUgb2YgJFdPT0wgYXdhaXRzLCB3aXRoIGRlYWRseSBoaWdoIHN0YWtlcy4gQWxsIHRoZSBtZXRhZGF0YSBhbmQgaW1hZ2VzIGFyZSBnZW5lcmF0ZWQgYW5kIHN0b3JlZCAxMDAlIG9uLWNoYWluLiBObyBJUEZTLiBOTyBBUEkuIEp1c3QgdGhlIEF2YWxhbmNoZSBibG9ja2NoYWluLiIsICJpbWFnZSI6ICJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlhWE52TFRnNE5Ua3RNU0kvUGcwS1BDRXRMU0JIWlc1bGNtRjBiM0k2SUVGa2IySmxJRWxzYkhWemRISmhkRzl5SURFNExqRXVNU3dnVTFaSElFVjRjRzl5ZENCUWJIVm5MVWx1SUM0Z1UxWkhJRlpsY25OcGIyNDZJRFl1TURBZ1FuVnBiR1FnTUNrZ0lDMHRQZzBLUEhOMlp5QjJaWEp6YVc5dVBTSXhMakVpSUdsa1BTSkRZWEJoWHpFaUlIaHRiRzV6UFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1EQXdMM04yWnlJZ2VHMXNibk02ZUd4cGJtczlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5MekU1T1RrdmVHeHBibXNpSUhnOUlqQndlQ0lnZVQwaU1IQjRJZzBLQ1NCMmFXVjNRbTk0UFNJd0lEQWdNeklnTXpJaUlITjBlV3hsUFNKbGJtRmliR1V0WW1GamEyZHliM1Z1WkRwdVpYY2dNQ0F3SURNeUlETXlPeUlnZUcxc09uTndZV05sUFNKd2NtVnpaWEoyWlNJK0RRbzhaejROQ2drOFp5QnBaRDBpY1hWbGMzUnBiMjVmZURWR1gyMWhjbXNpUGcwS0NRazhaejROQ2drSkNUeHdZWFJvSUhOMGVXeGxQU0ptYVd4c09pTXdNekF4TURRN0lpQmtQU0pOTVRjdU5pd3pNR013TERFdU1UQXlMVEF1T0RrMUxESXRNaXd5Y3kweUxUQXVPRGs0TFRJdE1tTXdMVEV1TVRBNUxEQXVPRGsxTFRJc01pMHlVekUzTGpZc01qZ3VPRGt4TERFM0xqWXNNekI2SWk4K0RRb0pDUWs4Y0dGMGFDQnpkSGxzWlQwaVptbHNiRG9qTURNd01UQTBPeUlnWkQwaVRURTFMalkzTml3eU5TNDVOemRqTFRFdU16TTJMREF0TWk0MU9TMHdMalV5TXkwekxqVXpOUzB4TGpRMk9XTXRNQzQ1TkRVdE1TNHhNRFV0TVM0ME5qVXRNaTR6TlRrdE1TNDBOalV0TXk0Mk9UVU5DZ2tKQ1Fsek1DNDFNaTB5TGpVNUxERXVORFkxTFRNdU16Y3hiRFl1TmpnNExUWXVOamc0UXpFNUxqVTROQ3c1TGprNU5pd3lNQ3c0TGprNU1pd3lNQ3czTGpreU5tTXdMVEV1TURjdE1DNDBNVFl0TWk0d056UXRNUzR4TnpJdE1pNDRNamdOQ2drSkNRbGpMVEV1TlRVNUxURXVOVFU1TFRRdU1EazJMVEV1TlRZeUxUVXVOalUwTERCRE1USXVOREUyTERVdU9EVXlMREV5TERZdU9EVTFMREV5TERjdU9USTJTRGhqTUMweUxqRXpOeXd3TGpnek5DMDBMakUwT0N3eUxqTTBPQzAxTGpZMkRRb0pDUWtKWXpNdU1ESXRNeTR3TWpNc09DNHlPRFV0TXk0d01pd3hNUzR6TURrc01DNHdNRFJETWpNdU1UWTRMRE11TnpjM0xESTBMRFV1TnpnMUxESTBMRGN1T1RJMll6QXNNaTR4TXpjdE1DNDRNeklzTkM0eE5EVXRNaTR6TkRRc05TNDJOVFpzTFRZdU5qZzRMRFl1TlRJekRRb0pDUWtKWXkwd0xqTTRPU3d3TGpNNU1TMHdMak00T1N3eExqQXlNeXd3TERFdU5ERTBZekF1TXpreExEQXVNemt4TERFdU1ESXpMREF1TXpreExERXVOREUwTERCak1DNHlOVFF0TUM0eU5UZ3NNQzR5T1RNdE1DNDFOVFVzTUM0eU9UTXRNQzQzTVRGb05BMEtDUWtKQ1dNd0xERXVNek0yTFRBdU5USXNNaTQxT1RRdE1TNDBOalVzTXk0Mk9UbERNVGd1TWpZMkxESTFMalExTXl3eE55NHdNVElzTWpVdU9UYzNMREUxTGpZM05pd3lOUzQ1TnpkTU1UVXVOamMyTERJMUxqazNOM29pTHo0TkNna0pQQzluUGcwS0NUd3ZaejROQ2p3dlp6NE5DanhuUGcwS1BDOW5QZzBLUEdjK0RRbzhMMmMrRFFvOFp6NE5Dand2Wno0TkNqeG5QZzBLUEM5blBnMEtQR2MrRFFvOEwyYytEUW84Wno0TkNqd3ZaejROQ2p4blBnMEtQQzluUGcwS1BHYytEUW84TDJjK0RRbzhaejROQ2p3dlp6NE5DanhuUGcwS1BDOW5QZzBLUEdjK0RRbzhMMmMrRFFvOFp6NE5Dand2Wno0TkNqeG5QZzBLUEM5blBnMEtQR2MrRFFvOEwyYytEUW84Wno0TkNqd3ZaejROQ2p3dmMzWm5QZzBLIiwgImF0dHJpYnV0ZXMiOlt7InRyYWl0X3R5cGUiOiJGdXIiLCJ2YWx1ZSI6IkdyYXkifSx7InRyYWl0X3R5cGUiOiJIZWFkIiwidmFsdWUiOiJCZXRhIn0seyJ0cmFpdF90eXBlIjoiRXllcyIsInZhbHVlIjoiQ2xvc2VkIn0seyJ0cmFpdF90eXBlIjoiTW91dGgiLCJ2YWx1ZSI6IlNtaXJrIn0seyJ0cmFpdF90eXBlIjoiTmVjayIsInZhbHVlIjoiVGllIn0seyJ0cmFpdF90eXBlIjoiQWxwaGEgU2NvcmUiLCJ2YWx1ZSI6IjcifSx7InRyYWl0X3R5cGUiOiJHZW5lcmF0aW9uIiwidmFsdWUiOiJHZW4gMCJ9LHsidHJhaXRfdHlwZSI6IlR5cGUiLCJ2YWx1ZSI6IldvbGYifV19";
const MINT_PRICE = "2";
const TRACTOR_PRICE = "32000";
const JOE_PRICE = "62";
const PAY_WITH = {
    AVAX: "AVAX",
    TRACTOR: "TRACTOR",
    JOE: "JOE",
};

const paymentOptions = [
    { id: PAY_WITH.AVAX, title: "AVAX" },
    { id: PAY_WITH.TRACTOR, title: "TRACTOR" },
    { id: PAY_WITH.JOE, title: "JOE" },
];

const Minting = ({ wallet, chain, stats, reload, woolBalance }) => {
    const [amount, setAmount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [transacting, setTransacting] = useState(false);
    const [error, setError] = useState(null);
    const [outcomes, setOutcomes] = useState([]);
    // const [mintingAndStaking, setMintingAndStaking] = useState(false)
    const [, setMintingAndStaking] = useState(false);
    const [paymentToken, setPaymentToken] = useState(PAY_WITH.AVAX);

    const onPaymentToken = (e) => {
        setPaymentToken(e.target.id);
    };

    const onMint = async (stake) => {
        setLoading(true);
        setError(null);
        try {
            let hash;

            if (paymentToken === PAY_WITH.AVAX) {
                hash = (await mint(stake, amount, requiresEth())).hash;
            } else if (paymentToken === PAY_WITH.TRACTOR) {
                await approve("0x542fa0b261503333b90fe60c78f2beed16b7b7fd", process.env.REACT_APP_WOOLF);
                hash = (await mintWithTractor(amount)).hash;
            } else if (paymentToken === PAY_WITH.JOE) {
                await approve("0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd", process.env.REACT_APP_WOOLF);
                hash = (await mintWithJoe(amount)).hash;
            } else {
                return;
            }

            setTransacting(true);
            setMintingAndStaking(false);

            watchTransaction(hash, (receipt, success) => {
                if (!success) {
                    setLoading(false);
                    setTransacting(false);
                    return setError("Mint failed. Check transaction.");
                }

                const results = parseMint(stake, receipt);

                setTimeout(async () => {
                    await presentOutcomes(results);
                    setLoading(false);
                    setTransacting(false);
                }, 2000);
            });
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };

    // const delay = (time) => {
    //   return new Promise(res => setTimeout(res, time))
    // }

    // const getWoolf = async (tokenId) => {
    //   try {
    //     let u = await tokenURI(tokenId)
    //     while (isInvalidWoolf(decodeTokenURI(u))) {
    //       console.log('RETRYING')
    //       await delay(1000)
    //       u = await tokenURI(tokenId)
    //     }
    //     return u
    //   } catch (e) {
    //     console.log('READ FAILED. RETRYING')
    //     return getWoolf(tokenId)
    //   }
    // }

    const presentOutcomes = async (results) => {
        const o = [];
        for (let i in results) {
            // const { tokenId, recipient, stake } = results[i]
            const { tokenId, recipient } = results[i];

            // let u = await getWoolf(tokenId)
            let u = PLACEHOLDER;

            const stolen = recipient.toLowerCase() !== wallet.toLowerCase();

            if (stolen) {
                const shortRecipient = `${recipient.slice(0, 6)}...${recipient.slice(-4)}`;
                o.push(
                    {
                        message: `You minted a sheep or a woolf #${tokenId.toString()} BUT...`,
                        source: decodeTokenURI(u).image,
                        link: "",
                        linkMessage: "",
                    },
                    {
                        message: `It was stolen by a Wolf! It's now owned by ${shortRecipient}`,
                        source: "/images/mint-stolen.gif",
                    }
                );
            } else {
                // * og
                // o.push({
                //   message:`You arrived safely at home with ${isSheep(u) ? 'Sheep' : 'Wolf'} #${tokenId.toString()}...`,
                //   source: decodeTokenURI(u).image,
                //   link:`${process.env.REACT_APP_OPENSEA}/${process.env.REACT_APP_WOOLF}/${tokenId.toString()}`,
                //   linkMessage:'View on OpenSea'
                // })
                o.push({
                    message: `You arrived safely at home with a sheep or a woolf #${tokenId.toString()}...`,
                    source: decodeTokenURI(u).image,
                    link: "",
                    linkMessage: "",
                });
            }
        }
        setOutcomes(o);
    };

    const totalMinted = () => {
        if (!stats) return 0;
        // return parseInt(stats.sheepMinted) + parseInt(stats.wolvesMinted)
        return parseInt(stats.totalSupply);
    };

    const maxTokens = () => {
        if (!stats) return 50000;
        return stats.maxTokens;
    };

    const requiresEth = () => {
        if (!stats) return true;
        return totalMinted() < parseInt(stats.maxTokens) / 5;
    };

    const ethCost = () => {
        return utils.formatUnits(utils.parseUnits(MINT_PRICE, "gwei").mul(BigNumber.from(amount)), "gwei") + " AVAX";
    };

    const tractorCost = () => {
        return utils.formatUnits(utils.parseUnits(TRACTOR_PRICE, "gwei").mul(BigNumber.from(amount)), "gwei") + " TRACTOR";
    };

    const joeCost = () => {
        return utils.formatUnits(utils.parseUnits(JOE_PRICE, "ether").mul(BigNumber.from(amount)), "ether") + " JOE";
    };

    const woolCost = (tokenId) => {
        if (!stats) return 0;
        let maxTokens = parseInt(stats.maxTokens);
        if (tokenId <= (maxTokens * 2) / 5) return 20000;
        if (tokenId <= (maxTokens * 4) / 5) return 40000;
        return 80000;
    };

    const totalWoolCost = () => {
        if (!stats) return 0;
        let total = 0;
        let currentId = totalMinted();
        for (let i = 1; i <= amount; i++) {
            total += woolCost(currentId + i);
        }
        return total;
    };

    const preCheck = () => {
        if (requiresEth()) return undefined;
        if (!woolBalance || woolBalance === "?") return "Insufficient $aWOOL";
        if (utils.parseUnits("" + totalWoolCost(), "gwei").gt(woolBalance)) return "Insufficient $aWOOL";
        return undefined;
    };

    return (
        <Container>
            <div className="flex flex-col items-center font-pixel gap-5">
                <div className="subtitle mt-5">MINTING</div>
                <MintProgress minted={totalMinted()} maxTokens={maxTokens()} />
                <div className="mt-2"></div>

                {totalMinted() >= maxTokens() ? (
                    <div className="text-red text-2xl">Sold out!</div>
                ) : (
                    <EthereumInteraction wallet={wallet} chain={chain}>
                        <div className="flex justify-center items-center gap-2" style={{ height: "50px" }}>
                            <div className="font-console text-lg pt-2 mr-3">Amount</div>
                            <img
                                src="/images/arrow-down.svg"
                                alt="decrease"
                                className="cursor-pointer"
                                style={{ minWidth: "25px" }}
                                onClick={() => {
                                    setAmount(Math.max(1, amount - 1));
                                }}
                            />
                            <div className="font-console text-red text-3xl pt-2">{amount}</div>
                            <img
                                src="/images/arrow-up.svg"
                                alt="decrease"
                                className="cursor-pointer"
                                style={{ minWidth: "25px" }}
                                onClick={() => {
                                    setAmount(Math.min(10, amount + 1));
                                }}
                            />
                        </div>
                        <div className="mb-2">
                            Cost:
                            <br />
                            <span className="text-red">{requiresEth() ? ethCost() : `${totalWoolCost()} $aWOOL`}</span>
                            <br />
                            {requiresEth() && (
                                <span>
                                    <span className="text-red"> {tractorCost()} </span>&nbsp; or
                                    <br />
                                </span>
                            )}
                            {requiresEth() && (
                                <span>
                                    <span className="text-red"> {joeCost()} </span>
                                    <br />
                                </span>
                            )}
                        </div>
                        {preCheck() ? (
                            <div className="text-red text-2xl">{preCheck()}</div>
                        ) : (
                            <div className="flex xl:flex-row flex-col justify-center items-center gap-5">
                                <div className="flex flex-col justify-center items-center">
                                    <WoodButton
                                        width={250}
                                        height={40}
                                        title={"MINT"}
                                        fontSize={20}
                                        loading={loading}
                                        onClick={() => {
                                            onMint(false);
                                        }}
                                    />
                                    {/* <span className="mt-4">WITH</span>
                  <fieldset className="mt-4">
                    <legend className="sr-only">Notification method</legend>
                    <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                      {paymentOptions.map((paymentOption) => (
                        <div
                          key={paymentOption.id}
                          className="flex items-center"
                        >
                          <input
                            id={paymentOption.id}
                            name="notification-method"
                            type="radio"
                            defaultChecked={paymentOption.id === PAY_WITH.AVAX}
                            className="focus:ring-black h-4 w-4 text-balck border-black"
                            onClick={onPaymentToken}
                          />
                          <label
                            htmlFor={paymentOption.id}
                            className="ml-3 block text-sm font-medium text-black"
                          >
                            {paymentOption.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset> */}
                                    <div className="mt-2" style={{ height: "20px" }}></div>
                                </div>
                                {/* <div className="flex flex-col justify-center items-center">
                  <WoodButton width={250} height={40} title={'MINT & STAKE'} fontSize={20} loading={loading} onClick={() => {
                    setMintingAndStaking(true)
                  }}/>
                  <div className="font-console text-xs mt-2 text-center" style={{height:'20px'}}>
                    (saves gas)
                  </div>
                </div> */}
                            </div>
                        )}

                        {error && <div className="text-sm text-red font-console">{error}</div>}
                    </EthereumInteraction>
                )}
            </div>
            <LoadingModal
                loadingScenes={[
                    {
                        message: "Bringing a baby sheep (or wolf?) back home",
                        source: "/images/minting.gif",
                    },
                ]}
                modalIsOpen={!!transacting}
            />
            <OutcomeModal
                outcomes={outcomes}
                modalIsOpen={outcomes.length > 0}
                closeModal={() => {
                    setOutcomes([]);
                    reload();
                }}
            />
        </Container>
    );
};

export default Minting;
