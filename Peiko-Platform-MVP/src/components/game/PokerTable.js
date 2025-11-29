import React from 'react';
import styled from 'styled-components';
import table from '../../assets/game/table.webp';

const StyledPokerTable = styled.img`
  display: block;
  pointer-events: none;
  width: 88%;
  height: 65%;
  margin: 32px auto 0px;
  z-index: 2;
`;

const PokerTable = () => <StyledPokerTable src={table} alt="Poker Table" />;

export default PokerTable;
