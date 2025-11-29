import React, { useContext, useEffect } from 'react'
import Button from '../../buttons/Button'
import modalContext from '../../../context/modal/modalContext'
import globalContext from '../../../context/global/globalContext'
import { ButtonGroup } from '../../forms/ButtonGroup'
import { Form } from '../../forms/Form'
import { FormGroup } from '../../forms/FormGroup'
import { Input } from '../../forms/Input'
import gameContext from '../../../context/game/gameContext'
import { PositionedUISlot } from '../PositionedUISlot'
import { LastAction } from '../LastAction'
import PokerCard from '../PokerCard'
import ChipsAmountPill from '../ChipsAmountPill'
import ColoredText from '../../typography/ColoredText'
import PokerChip from '../../icons/PokerChip'
import { EmptySeat } from './EmptySeat'
import { OccupiedSeat } from './OccupiedSeat'
import { Hand } from '../Hand'
import { NameTag } from '../NameTag'
import Markdown from 'react-remarkable'
import DealerButton from '../../icons/DealerButton'
import SmallBlindButton from '../../icons/SmallBlindButton'
import BigBlindButton from '../../icons/BigBlindButton'
import { StyledSeat } from './StyledSeat'
import { convertOmittedAddress } from '../../../helpers/common'
import './Seat.scss'

export const Seat = ({ currentTable, seatNumber, sitDown }) => {
  const { chipsAmount } = useContext(globalContext)
  const { standUp, seatId, rebuy } = useContext(gameContext)
   

  const seat = currentTable.seats[seatNumber]
  const maxBuyin = currentTable.limit
  const minBuyIn = currentTable.minBet * 2 * 10

  useEffect(() => {
    console.log(currentTable, seatId, seatNumber, currentTable.seats[seatNumber])
    // eslint-disable-next-line
  }, [currentTable])

  const gameActions = {
    CS_CALL: {
      text: 'Call',
      bgColor: '#feaa33'
    },
    CS_FOLD: {
      text: 'Fold',
      bgColor: '#ff3332'
    },
    CS_CHECK: {
      text: 'Check',
      bgColor: '#48ff52'
    },    
    CS_RAISE: {
      text: 'Raise',
      bgColor: '#179ddc'
    },
  }

  return (
    <StyledSeat>
      {!seat ? (
        <>
          <EmptySeat>
            <div className="empty-set-wrapper">
              <Markdown><span className="empty-seat">Empty Seat</span></Markdown>
            </div>
          </EmptySeat>
        </>
      ) : (
        <PositionedUISlot
          style={{
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <PositionedUISlot
            top="-7.5rem"
            left="-75px"
            origin="top center"
            style={{ minWidth: '150px', zIndex: '55' }}
          >
            <ChipsAmountPill chipsAmount={seat.bet} />
            {!currentTable.handOver && seat.lastAction && (
              <LastAction bgColor={gameActions[seat.lastAction]['bgColor']}>{gameActions[seat.lastAction]['text']}</LastAction>
            )}
          </PositionedUISlot>
          <PositionedUISlot>
            <OccupiedSeat seatNumber={seatNumber} hasTurn={seat.turn} />
          </PositionedUISlot>
          <PositionedUISlot
            left="4vh"
            style={{
              display: 'flex',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            origin="center right"
          >
            <Hand>
              {seat.hand &&
                seat.hand.map((card, index) => (
                  <PokerCard
                    key={index}
                    card={card}
                    width="5vw"
                    maxWidth="60px"
                    minWidth="30px"
                  />
                ))}
            </Hand>
          </PositionedUISlot>

          {currentTable.button === seatNumber && (
            <PositionedUISlot
              top="-85px"
              left="-70px"
              origin="top left"
              style={{ zIndex: '55' }}
            >
              <DealerButton />
            </PositionedUISlot>
          )}

          {currentTable.bigBlind === seatNumber && (
            <PositionedUISlot
              top="-55px"
              left="-93px"
              origin="top left"
              style={{ zIndex: '55' }}            
            >
              <BigBlindButton />
            </PositionedUISlot>
          )}

          {currentTable.smallBlind === seatNumber && (
            <PositionedUISlot            
              top="-55px"
              left="-93px"
              origin="top left"
              style={{ zIndex: '55' }}
            >
              <SmallBlindButton />
            </PositionedUISlot>
          )}

          <PositionedUISlot
            top="6vh"
            style={{ minWidth: '150px', zIndex: '55' }}
            origin="bottom center"
          >
            <p className="seat-name">{seat.player.name}</p>
            {seat.stack && (
              <p className="seat-stack">
                {new Intl.NumberFormat(document.documentElement.lang).format(
                  seat.stack,
                )}
              </p>
            )}

            {/* <NameTag>
              <ColoredText primary textAlign="center">
                {convertOmittedAddress(seat.player.name)}
                <br />
                {seat.stack && (
                  <ColoredText secondary>
                    <PokerChip width="15" height="15" />{' '}
                    {new Intl.NumberFormat(
                      document.documentElement.lang,
                    ).format(seat.stack)}
                  </ColoredText>
                )}
              </ColoredText>
            </NameTag> */}
          </PositionedUISlot>
        </PositionedUISlot>
      )}
    </StyledSeat>
  )
}
