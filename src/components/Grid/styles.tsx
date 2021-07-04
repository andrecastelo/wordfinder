
import styled from '@emotion/styled';

const Sizes = {
  Item: 48,
  Margin: 12,
  Font: 24,
};

const maxWidth = (gridSize: number) => (Sizes.Item * gridSize) + (Sizes.Margin * (gridSize - 1));

type StyledGridProps = {
  size: number;
}

export const StyledGrid = styled.div<StyledGridProps>`
  display: grid;
  margin: 0 auto;
  grid-template-columns: ${props => `repeat(${props.size}, ${Sizes.Item}px)`};
  grid-template-rows: ${props => `repeat(${props.size}, ${Sizes.Item}px)`};
  grid-gap: ${Sizes.Margin}px;
  max-width: ${props => maxWidth(props.size)}px;
  user-select: none;
`;

export const StyledGridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${Sizes.Item}px;
  height: ${Sizes.Item}px;
  font-size: ${Sizes.Font}px;
  cursor: pointer;
`;