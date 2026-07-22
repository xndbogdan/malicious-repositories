import React from 'react';
import styled, { keyframes } from 'styled-components';

const StyledLoadingScreen = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const FrostedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(6px) brightness(0.6);
  background: rgba(0, 0, 0, 0.3);
`;

const LoaderWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const GlowingSpinner = styled.div`
  border: 8px solid rgba(255, 255, 255, 0.1);
  border-top: 8px solid #00ffff;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: ${spin} 1.2s linear infinite;
  box-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff66;
`;

const LoadingText = styled.div`
  margin-top: 20px;
  color: white;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1px;
  text-shadow: 0 0 10px #00ffff44;
`;

const LoadingScreen = () => (
  <StyledLoadingScreen>
    <BackgroundVideo
      autoPlay
      muted
      loop
      playsInline
      src="https://d1i6zd1p5d75mw.cloudfront.net/images/s/headervideo/1/3306010965.mp4"
      type="video/mp4"
    />
    <FrostedOverlay />
    <LoaderWrapper>
      <GlowingSpinner />
      <LoadingText>Loading experience...</LoadingText>
    </LoaderWrapper>
  </StyledLoadingScreen>
);

export default LoadingScreen;
