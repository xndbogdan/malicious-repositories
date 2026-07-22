import React, { useContext } from 'react'
 
import Button from '../buttons/Button'
import { BetSlider } from './Betslider/BetSlider'
import { UIWrapper } from './UIWrapper'
import { Row, Col } from 'react-bootstrap'

export const GameUI = ({
  currentTable,
  seatId,
  bet,
  setBet,
  raise,
  standUp,
  fold,
  check,
  call,
}) => {
   

  return (
    <UIWrapper style={{ display: 'flex' }}>
      <Row>
        <Col sm={12} md={6}>
          <Row>
            <Col sm={4}>
              <Button
                small
                secondary
                onClick={fold}
                style={{ minHeight: '100%' }}
              >
                Fold
              </Button>
            </Col>
            <Col sm={4}>
              <Button
                small
                secondary
                disabled={
                  currentTable.callAmount !== currentTable.seats[seatId].bet &&
                  currentTable.callAmount > 0
                }
                onClick={check}
                style={{ minHeight: '100%' }}
              >
                Check
              </Button>
            </Col>
            <Col sm={4}>
              <Button
                small
                disabled={
                  currentTable.callAmount === 0 ||
                  currentTable.seats[seatId].bet >= currentTable.callAmount
                }
                onClick={call}
              >
                Call{' '}
                {/* {currentTable.callAmount &&
                currentTable.seats[seatId].bet < currentTable.callAmount &&
                currentTable.callAmount <= currentTable.seats[seatId].stack
                  ? currentTable.callAmount - currentTable.seats[seatId].bet
                  : ''} */}
              </Button>
            </Col>
          </Row>
        </Col>
        <Col sm={12} md={6}>
          <Row>
            <Col sm={4}>
              <Button
                small
                onClick={() => raise(bet + currentTable.seats[seatId].bet)}
                style={{ minHeight: '100%' }}
              >
                Raise
              </Button>
            </Col>
            <Col
              sm={{span: 7, offset: 1}}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid',
                borderImage: 'linear-gradient(to bottom, #21a68e, #0d3733) 2',
                backgroundImage: 'linear-gradient(to bottom, #187969, #081c1c)',
                backgroundOrigin: 'border-box',
                padding: '0px 5px',
                clipPath: `polygon(
    0 5px,
    5px 0,
    calc(100% - 5px) 0,
    100% 5px,
    100% calc(100% - 5px),
    calc(100% - 5px) 100%,
    5px 100%,
    0% calc(100% - 5px),
    0% 5px
  )`,
              }}
            >
              <BetSlider
                currentTable={currentTable}
                seatId={seatId}
                bet={bet}
                setBet={setBet}
                style={{ display: 'flex', alignItems: 'center' }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {/* <Button
        small
        hidden
        onClick={() =>
          raise(
            currentTable.seats[seatId].stack + currentTable.seats[seatId].bet,
          )
        }
      >
        All In (
        {currentTable.seats[seatId].stack})
      </Button> */}
    </UIWrapper>
  )
}
