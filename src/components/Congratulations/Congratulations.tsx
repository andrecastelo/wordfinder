import React from 'react';
import styled from '@emotion/styled';

type CongratulationsProps = {
  visible?: boolean;
}

const Wrapper = styled.div<CongratulationsProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ visible }) => visible ? 1 : 0};
  z-index: ${({ visible }) => visible ? 9 : -1};
`;

const WhiteBackground = styled.div<CongratulationsProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: white;
  height: 100vh;
  width: 100vw;
  transition: opacity 0.2s linear;
  opacity: ${({ visible }) => visible ? 1 : 0};
`;

const CongratsText = styled.p<CongratulationsProps>`
  color: black;
  font-size: 48px;
  font-weight: bold;
  position: relative;
  z-index: 9;
  opacity: ${({ visible }) => visible ? 1 : 0};
  transition: opacity 0.2s linear;
`;

export const Congratulations: React.FC<CongratulationsProps> = ({ visible = false, children }) => {
  const randomCongrats = () => {
    const congrats = [
      'Well done!',
      'Great job!',
      'Awesome!',
    ];

    return congrats[Math.floor(Math.random() * congrats.length)];
  }

  return (
    <Wrapper visible={visible}>
      <WhiteBackground visible={visible} />

      <div css={{ position: 'relative', zIndex: 9 }}>
        {children || (
          <CongratsText visible={visible}>
            {randomCongrats()}
          </CongratsText>
        )}
      </div>
    </Wrapper>
  );
};
