import styled from 'styled-components';

export const EmptySeat = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 120px;
  height: 120px;
  padding: 0px;
  border-radius: 100%;
  border: 10px double transparent;
  backdrop-filter: blur(10px);
  background-clip: content-box, border-box;
  background-origin: border-box;
  background-image: linear-gradient(rgba(0,0,0, 0), rgba(0,0,0, 0)), linear-gradient(to bottom, #a5a5a5, #4d4d4d);
  transition: all 0.1s;
  overflow: hidden;

  p {
    margin-bottom: 0;
  }
`;
