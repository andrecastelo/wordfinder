import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';


const Wrapper = styled.div<{ visible: boolean }>`
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

const WhiteBackground = styled.div<{ visible: boolean }>`
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

const CongratsText = styled.p<{ visible: boolean }>`
  color: black;
  font-size: 48px;
  font-weight: bold;
  position: relative;
  z-index: 9;
  opacity: ${({ visible }) => visible ? 1 : 0};
  transition: opacity 0.2s linear;
`;

type CongratulationsProps = PropsWithChildren<{
  visible?: boolean;
}>

export const Congratulations = ({ visible = false, children }: CongratulationsProps) => {
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

      <div className="tw-relative tw-z-10">
        {children || (
          <CongratsText visible={visible}>
            {randomCongrats()}
          </CongratsText>
        )}
      </div>
    </Wrapper>
  );
};
