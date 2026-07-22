import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../components/layout/Container'
import Button from '../components/buttons/Button'
import gameContext from '../context/game/gameContext'
import socketContext from '../context/websocket/socketContext'
import globalContext from '../context/global/globalContext'
import PokerTable from '../components/game/PokerTable'
import { RotateDevicePrompt } from '../components/game/RotateDevicePrompt'
import { PositionedUISlot } from '../components/game/PositionedUISlot'
import { PokerTableWrapper } from '../components/game/PokerTableWrapper'
import { Seat } from '../components/game/Seat/Seat'
import { InfoPill } from '../components/game/InfoPill'
import { GameUI } from '../components/game/GameUI'
import { GameStateInfo } from '../components/game/GameStateInfo'
import BrandingImage from '../components/game/BrandingImage'
import PokerCard from '../components/game/PokerCard'
import background from '../assets/img/background.png'
import Swal from 'sweetalert2'
import './Play.scss';

const toastMixin = Swal.mixin({
  toast: true,
  icon: 'success',
  title: 'General Title',
  animation: false,
  position: 'top-right',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
})

const Play = () => {
  const navigate = useNavigate()
  const { socket } = useContext(socketContext)
  const { walletAddress } = useContext(globalContext)
  const {
    messages,
    currentTable,
    seatId,
    joinTable,
    leaveTable,
    sitDown,
    standUp,
    fold,
    check,
    call,
    raise,
  } = useContext(gameContext)
   

  const [bet, setBet] = useState(0)


  useEffect(() => {
    console.log(socket, walletAddress)
    if(!socket){
      navigate("/")
    }

    // !walletAddress && navigate("/")
    socket && walletAddress && joinTable(1)

    if(socket){
      return () => leaveTable()
    }
    // eslint-disable-next-line
  }, [socket, walletAddress])

  useEffect(() => {
    currentTable &&
      (currentTable.callAmount > currentTable.minBet
        ? setBet(currentTable.callAmount)
        : currentTable.pot > 0
        ? setBet(currentTable.minRaise)
        : setBet(currentTable.minBet))
  }, [currentTable])

  useEffect(() => {
  }, [currentTable, seatId])

  return (
    <>
      <RotateDevicePrompt />
      <Container
        fullHeight
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed',
          backgroundColor: 'black',
        }}
        className="play-area"
      >
        {currentTable && (
          <>
            <PositionedUISlot
              top="2vh"
              left="1.5rem"
              scale="0.65"
              style={{ zIndex: '50' }}
            >
              <Button small secondary onClick={leaveTable}>
                Leave
              </Button>
            </PositionedUISlot>
          </>
        )}
        <PokerTableWrapper>
          <PokerTable />
          {currentTable && (
            <>
              <PositionedUISlot
                top="-5%"
                left="0"
                scale="0.55"
                origin="top left"
              >
                <Seat
                  seatNumber={1}
                  currentTable={currentTable}
                  sitDown={sitDown}
                />
              </PositionedUISlot>
              <PositionedUISlot
                top="-5%"
                right="2%"
                scale="0.55"
                origin="top right"
              >
                <Seat
                  seatNumber={2}
                  currentTable={currentTable}
                  sitDown={sitDown}
                />
              </PositionedUISlot>
              <PositionedUISlot
                bottom="15%"
                right="2%"
                scale="0.55"
                origin="bottom right"
              >
                <Seat
                  seatNumber={3}
                  currentTable={currentTable}
                  sitDown={sitDown}
                />
              </PositionedUISlot>
              <PositionedUISlot bottom="8%" scale="0.55" origin="bottom center">
                <Seat
                  seatNumber={4}
                  currentTable={currentTable}
                  sitDown={sitDown}
                />
              </PositionedUISlot>
              <PositionedUISlot
                bottom="15%"
                left="0"
                scale="0.55"
                origin="bottom left"
              >
                <Seat
                  seatNumber={5}
                  currentTable={currentTable}
                  sitDown={sitDown}
                />
              </PositionedUISlot>
              <PositionedUISlot
                top="-25%"
                scale="0.55"
                origin="top center"
                style={{ zIndex: '1' }}
              >
                <BrandingImage></BrandingImage>
              </PositionedUISlot>
              <PositionedUISlot
                width="100%"
                origin="center center"
                scale="0.60"
                style={{
                  display: 'flex',
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {currentTable.board && currentTable.board.length > 0 && (
                  <>
                    {currentTable.board.map((card, index) => (
                      <PokerCard key={index} card={card} />
                    ))}
                  </>
                )}
              </PositionedUISlot>
              <PositionedUISlot top="-5%" scale="0.60" origin="bottom center">
                {messages && messages.length > 0 && (
                  <>
                    <InfoPill>{messages[messages.length - 1]}</InfoPill>
                    {currentTable.winMessages.length > 0 && (
                      <InfoPill>
                        {
                          currentTable.winMessages[
                            currentTable.winMessages.length - 1
                          ]
                        }
                      </InfoPill>
                    )}
                  </>
                )}
              </PositionedUISlot>
              <PositionedUISlot top="12%" scale="0.60" origin="center center">
                {currentTable.winMessages.length === 0 && (
                  <GameStateInfo currentTable={currentTable} />
                )}
              </PositionedUISlot>
            </>
          )}
        </PokerTableWrapper>

        {currentTable &&
          currentTable.seats[seatId] &&
          currentTable.seats[seatId].turn && (
            <GameUI
              currentTable={currentTable}
              seatId={seatId}
              bet={bet}
              setBet={setBet}
              raise={raise}
              standUp={standUp}
              fold={fold}
              check={check}
              call={call}
            />
          )}
      </Container>
    </>
  )
}

export default Play
