import React from 'react';
import PokerChip from '../icons/PokerChip';
import { Input } from '../forms/Input';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import chipImg from '../../assets/game/gglab_green.png'


const ChipsAmountPill = ({ chipsAmount }) => {
  return (
    <div className="chip-amount-pill">
      <img className="chip-amount-img" src={chipImg} />
      <span className="chip-amount-text">{chipsAmount}</span>
    </div>
  );
};

ChipsAmountPill.propTypes = {
  chipsAmount: PropTypes.number,
};

export default ChipsAmountPill;
