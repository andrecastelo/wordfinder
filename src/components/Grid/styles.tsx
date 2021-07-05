
import styled from '@emotion/styled';

const Sizes = {
  Item: 48,
  Margin: 12,
  Font: 24,
};

export const maxWidth = (gridSize: number): number => (Sizes.Item * gridSize) + (Sizes.Margin * (gridSize - 1));

type StyledGridProps = {
  size: number;
}

export const GridContainer = styled.div<StyledGridProps>`
  max-width: ${props => maxWidth(props.size)}px;
  margin: 0 auto;
`;

export const StyledGrid = styled.div<StyledGridProps>`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.size}, ${Sizes.Item}px)`};
  grid-template-rows: ${props => `repeat(${props.size}, ${Sizes.Item}px)`};
  grid-gap: ${Sizes.Margin}px;
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