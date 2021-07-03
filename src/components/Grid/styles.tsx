import styled from '@emotion/styled';

const Sizes = {
  Item: 48,
  Margin: 12,
  Font: 24,
};

const maxWidth = (Sizes.Item * 8) + (Sizes.Margin * 7);

export const StyledGrid = styled.div`
  display: grid;
  margin: 0 auto;
  grid-template-columns: repeat(8, ${Sizes.Item}px);
  grid-template-rows: repeat(8, ${Sizes.Item}px);
  grid-gap: ${Sizes.Margin}px;
  max-width: ${maxWidth}px;
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