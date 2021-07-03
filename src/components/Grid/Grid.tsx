import { useState } from 'react';
import { GridItem } from './GridItem';
import { StyledGrid } from './styles';

type GridProps = {
  characters: string[],
}

export const Grid: React.FC<GridProps> = ({ characters }) => {
  const [dragging, setDragging] = useState<boolean>(false);

  return (
    <StyledGrid onMouseDown={() => setDragging(true)} onMouseUp={() => setDragging(false)}>
      {characters.map(letter => (
        <GridItem dragging={dragging}>
          {letter}
        </GridItem>
      ))}
    </StyledGrid>
  );
};
