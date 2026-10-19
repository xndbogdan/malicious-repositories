import React from "react";
import Modal from "react-modal";
import Container from "./Container";
import WoodButton from "./WoodButton";

const UnstakeModal = ({ modalIsOpen, onClick, loading, closeModal }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          border: "none",
          background: "transparent",
        },
      }}
      contentLabel="Mint & Stake Modal"
      onRequestClose={closeModal}
    >
      <Container>
        <div
          className="w-full flex flex-col items-center overflow-hidden"
          style={{ zIndex: 1000 }}
        >
          <div className="font-console text-2xl drop-text text-center mb-5">
            REMINDER
          </div>
          <div
            className="font-console text-center"
            style={{ maxWidth: "500px" }}
          >
            You pay 0% tax when unstaking your Sheep and your Sheep are returned
            to your wallet.
            <br />
            <br />
            <span className="text-red">HOWEVER</span>
            <br />
            <br />
            Each Sheep you unstake has a 50% chance of having{" "}
            <span className="text-red">ALL</span> their $aWOOL stolen by Wolves
            that are lurking outside the Barn. This chance is rerolled for every
            Sheep you unstake.
          </div>
          <WoodButton
            title={"SHEAR $aWOOL AND UNSTAKE"}
            width={250}
            height={80}
            onClick={onClick}
            loading={loading}
            fontSize={20}
          />
        </div>
      </Container>
    </Modal>
  );
};

export default UnstakeModal;
