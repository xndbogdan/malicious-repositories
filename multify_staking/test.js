import "./styles/App.css";
import { ConnectButton } from "web3uikit";
import { useMoralis, useChain } from "react-moralis";
import { useNotification } from "web3uikit";
import { React, useEffect, useState } from "react";
import { Abi } from "./abi";
import { ethers } from "ethers";
import { Modal } from "antd";
import Navbar from "./navbar";
import UAuth from "@uauth/js";

const uauth = new UAuth({
  clientID: "129f3864-6a9c-4688-90d6-3fb52dcd2f91",
  redirectUri: "https://udminesweeper.netlify.app/callback",
});

function App() {
  const dispatch = useNotification();
  const { chainId, Moralis, web3, isAuthenticated, authenticate, logout } =
    useMoralis();
  const { switchNetwork } = useChain();
  const [connected, setConnected] = useState();
  const [Uauth, setUauth] = useState();
  const [gameState, setgameState] = useState();

  const [open, setOpen] = useState();
  const [open1, setOpen1] = useState();
  const [time, setTime] = useState(60);

  const handleOk = () => {
    Restart();
    setOpen1(false);
    window.location.reload();
  };

  const handleCan = () => {
    Restart();
    setOpen1(false);
    window.location.reload();
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const handleNewNotification = (type, icon, position, message, title) => {
    dispatch({
      type,
      message: message,
      title: title,
      icon,
      position: position || "topR",
    });
  };

  const handleCancel = (e) => {
    console.log("Do not interrupt the process");
    handleNewNotification(
      "error",
      undefined,
      "topR",
      "Do not interrupt the process",
      "Invalid Click"
    );
  };

  // Connect to prof chainLink oracle
  ////////////////////////// START Oracle /////////////////////////////
  function ModalOpen() {
    let secondsToGo = 60;

    const timer = setInterval(() => {
      secondsToGo -= 1;
      setTime(secondsToGo);
    }, 1000);

    setTimeout(async () => {
      clearInterval(timer);
      setOpen(false);
      delay(2000);
      startGame();
    }, secondsToGo * 1000);
  }

  async function connectToOracle() {
    if (chainId === "0x4" && isAuthenticated) {
      Restart();
      const options = {
        contractAddress: "0x1851aFeEF0838DB95A66d7ecE14CFB2bCbC9e34D",
        functionName: "GetRandomNum",
        abi: Abi,
        msgValue: "",
      };
      const transaction = await Moralis.executeFunction(options);

      const receipt = await transaction.wait();
      handleNewNotification(
        "success",
        undefined,
        "topR",
        `https://rinkeby.etherscan.io/tx/${JSON.stringify(
          receipt.transactionHash
        ).replace(/^"(.*)"$/, "$1")}`,
        "Transaction Successful"
      );
      console.log(
        `https://rinkeby.etherscan.io/tx/${JSON.stringify(
          receipt.transactionHash
        ).replace(/^"(.*)"$/, "$1")}`
      );
      setOpen(true);
      ModalOpen();
    } else if (isAuthenticated) {
      handleNewNotification(
        "error",
        undefined,
        "topR",
        "Change chain to rinkeby (0x4)",
        "Chain Not Supported"
      );
    } else {
      alert("Connect your wallet and be on the right chain (rinkeby)");
    }
  }
  ////////////////////////// END Oracle /////////////////////////////

  // Start game
  async function startGame() {
    if (chainId === "0x4" && isAuthenticated) {
      const options = {
        contractAddress: "0x1851aFeEF0838DB95A66d7ecE14CFB2bCbC9e34D",
        functionName: "capMinesTiles",
        abi: Abi,
        msgValue: "",
      };
      const transaction = await Moralis.executeFunction(options);
      const receipt = await transaction.wait();
      handleNewNotification(
        "success",
        undefined,
        "topR",
        `https://rinkeby.etherscan.io/tx/${JSON.stringify(
          receipt.transactionHash
        ).replace(/^"(.*)"$/, "$1")}`,
        "Transaction Successful"
      );
      setConnected(true);
      setgameState(true);
      console.log(
        `https://rinkeby.etherscan.io/tx/${JSON.stringify(
          receipt.transactionHash
        ).replace(/^"(.*)"$/, "$1")}`
      );
    } else if (isAuthenticated) {
      handleNewNotification(
        "error",
        undefined,
        "topR",
        "Change chain to rinkeby (0x4)",
        "Chain Not Supported"
      );
    } else {
      alert("Connect your wallet and be on the right chain (rinkeby)");
    }
  }

  ///// End or Start game //////////////

  useEffect(() => {
    Moralis.onChainChanged((chain) => {
      if (chain !== "0x4") {
        handleNewNotification(
          "error",
          undefined,
          "topR",
          "Change chain to rinkeby (0x4)",
          "Chain Not Supported"
        );
      }
    });
  }, []);

  //////////////////////////////////////////////////

  // RESTART UI LOGIC ////
  function Restart() {
    for (let index = 0; index <= 35; index++) {
      if (
        document.getElementById(`${index}`).style.backgroundColor === "blue"
      ) {
        document.getElementById(`${index}`).style.backgroundColor = "lightgray";
      }
    }
  }

  // END RESTART UI LOGIC ////

  /////////////// MOVE LOGIC //////////////////////

  async function Move(id) {
    if (isAuthenticated && connected === true && gameState === true) {
      if (
        chainId === "0x4" &&
        document.getElementById(`${id}`).style.backgroundColor !== "blue"
      ) {
        try {
          const contractABI = [
            "function gaslessMoveCheckAvailability(uint _id) external view returns (bool b)",
          ];
          const MineChecker = new ethers.Contract(
            "0x1851aFeEF0838DB95A66d7ecE14CFB2bCbC9e34D",
            contractABI,
            web3.getSigner()
          );
          console.log(id);
          const result = await MineChecker.gaslessMoveCheckAvailability(id);
          document.getElementById(`${id}`).style.backgroundColor = "blue";
          console.log(result);
          if (result === true) {
            document.getElementById(`${id}`).style.backgroundColor =
              "lightgray";
            setgameState(false);
            alert("Steped On Mine, Restart");
            setOpen1(true);
            return;
          } else if (result === false) {
            //
            const options = {
              contractAddress: "0x1851aFeEF0838DB95A66d7ecE14CFB2bCbC9e34D",
              functionName: "move",
              abi: Abi,
              params: {
                _id: id,
              },
            };
            const transaction = await Moralis.executeFunction(options);
            const receipt = await transaction.wait();
            document.getElementById(`${id}`).style.backgroundColor = "blue";
            console.log(
              `https://rinkeby.etherscan.io/tx/${JSON.stringify(
                receipt.transactionHash
              ).replace(/^"(.*)"$/, "$1")}`
            );
          }
        } catch (err) {
          document.getElementById(`4`).style.backgroundColor = "lightgray";
          handleNewNotification("error", undefined, "topR", `${err}`, "ERROR");
        }
      } else {
        await switchNetwork("0x4");
      }
    } else {
      alert("Press Start Game Below");
    }
  }

  /////////////// END OF MOVE LOGIC //////////////////////
  const getEllipsisTxt = (str, n = 6) => {
    if (str) {
      return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
  };
  //////////// Login ////////////////
  async function Connect() {
    try {
      const authorization = await uauth.loginWithPopup();
      //   console.log(
      //    JSON.parse(JSON.stringify(authorization))["idToken"]["sub"],
      //   JSON.parse(JSON.stringify(authorization))["idToken"]["wallet_address"]
      //   );
      setUauth(JSON.parse(JSON.stringify(authorization))["idToken"]);

      await authenticate();
    } catch (error) {
      console.error(error);
    }
  }

  async function logOut() {
    uauth.logout();
    logout();
    // setUauth();
  }

  function log() {
    if (Uauth === null || Uauth === undefined) {
      Connect();
    } else {
      logOut();
    }
  }

  return (
    <div>
      <Navbar />
      <h2>Mine Sweeper</h2>

      <div style={{ display: "flex", justifyContent: "right", margin: "5px" }}>
        <button onClick={log}>
          {Uauth != null
            ? Uauth["sub"] +
              " connected as " +
              getEllipsisTxt(Uauth["wallet_address"])
            : "Connect"}
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "left", margin: "5px" }}>
        {" "}
        {gameState === true ? (
          <h3>--- Game Started ---</h3>
        ) : (
          <h3>--- Game Not Started ---</h3>
        )}{" "}
      </div>

      <>
        {/* Modal For STEPPING ON A MINE */}
        <Modal visible={open1} onOk={handleOk} onCancel={handleCan}>
          <h2>LOL terrible guess</h2>
          <br />
          <h3>
            {" "}
            <p>Damm it, you stepped on a mine !!! 🤯</p>
            <p>Better luck Next Time !!!</p>
            <p>HINT : It is imposible to win</p>
          </h3>
        </Modal>
        {/* Modal For CONNECTING TO THE ORACLE AND STARTING A GAME */}
        <Modal
          visible={open}
          onOk={{ disabled: true }}
          onCancel={handleCancel}
          okButtonProps={{ disabled: true }}
          cancelButtonProps={{ disabled: true }}
        >
          <div>
            <h2>Connecting to Oracle & Starting Game</h2>
            <br />
            <h3>
              <p>Dont interrupt the process !!!</p>
              <p>Connecting To Oracle and Starting Game</p>
              <p>Establishing a secure connection to the Oracle</p>
              <p>Modal will automatically close in {time} seconds ⏳</p>
              <p>When Modal is closed, accept all trasactions 💸</p>
            </h3>
          </div>
        </Modal>
        <div className="App">
          <div>
            <div className="button-container">
              <button
                onClick={() => {
                  Move(0);
                }}
                id="0"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(1);
                }}
                id="1"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(2);
                }}
                id="2"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(3);
                }}
                id="3"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(4);
                }}
                id="4"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(5);
                }}
                id="5"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(6);
                }}
                id="6"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(7);
                }}
                id="7"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(8);
                }}
                id="8"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(9);
                }}
                id="9"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(10);
                }}
                id="10"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(11);
                }}
                id="11"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(12);
                }}
                id="12"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(13);
                }}
                id="13"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(14);
                }}
                id="14"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(15);
                }}
                id="15"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(16);
                }}
                id="16"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(17);
                }}
                id="17"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(18);
                }}
                id="18"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(19);
                }}
                id="19"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(20);
                }}
                id="20"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(21);
                }}
                id="21"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(22);
                }}
                id="22"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(23);
                }}
                id="23"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(24);
                }}
                id="24"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(25);
                }}
                id="25"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(26);
                }}
                id="26"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(27);
                }}
                id="27"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(28);
                }}
                id="28"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(29);
                }}
                id="29"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(30);
                }}
                id="30"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(31);
                }}
                id="31"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(32);
                }}
                id="32"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(33);
                }}
                id="33"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(34);
                }}
                id="34"
                className="button"
              ></button>
              <button
                onClick={() => {
                  Move(35);
                }}
                id="35"
                className="button"
              ></button>
            </div>
          </div>
        </div>
      </>

      <div className="oracle">
        <button
          className="or"
          style={{
            margin: "14px",
            width: "150px",
            height: "60px",
            textAlign: "center",
          }}
          onClick={() => {
            connectToOracle();
          }}
        >
          {gameState === true ? "Restart" : "Start Game"}
        </button>
        {/*}
         <button
          className="or"
          style={{
            margin: "20px",
            width: "150px",
            height: "60px",
            textAlign: "center",
          }}
          onClick={test}
        >
          Start Game lolol
        </button>*/}
      </div>
    </div>
  );
}

export default App;
