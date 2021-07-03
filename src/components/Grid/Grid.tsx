import { useState, useEffect } from 'react';
import { GridItem } from './GridItem';
import { StyledGrid } from './styles';
import { indexToCoordinates, Coordinates } from './functions';

const isCoordinateSelected = (selected: Coordinates[], c: Coordinates) =>
  selected.some(({ x, y }) => x === c.x && y === c.y);

type GridProps = {
  characters: string[],
};

export const Grid: React.FC<GridProps> = ({ characters }) => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [start, setStart] = useState<Coordinates | null>(null);
  const [selected, setSelected] = useState<Coordinates[]>([]);

  useEffect(() => {
    if (!dragging) {
      setStart(null);
    }
  }, [dragging]);

  console.log(selected);

  const handleOnSelect = (coordinates: Coordinates): void => {
    if (!start) {
      setStart(coordinates);
      setSelected([ coordinates ]);
      console.log(coordinates);
    } else {
      if (!isCoordinateSelected(selected, coordinates)) {
        setSelected([ ...selected, coordinates ]);
      }
    }
  }

  return (
    <StyledGrid>
      {characters.map((letter, index) => (
        <GridItem
          setDragging={setDragging}
          dragging={dragging}
          coordinates={indexToCoordinates(index)}
          onSelect={handleOnSelect}
        >
          {letter}
        </GridItem>
      ))}
    </StyledGrid>
  );
};
