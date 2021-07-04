import { useState, useEffect } from 'react';
import { GridItem } from './GridItem';
import { StyledGrid } from './styles';
import { Word } from './Word';
import { indexToCoordinates, getLine, Coordinates } from './functions';

type GridProps = {
  characters: string[],
  targetWords: string[],
  targetLocations: Coordinates[][],
  targetLanguage: string,
  words: string[],
};

export const Grid: React.FC<GridProps> = ({ characters, words }) => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [start, setStart] = useState<Coordinates | null>(null);
  const [selected, setSelected] = useState<Coordinates[]>([]);

  useEffect(() => {
    if (!dragging) {
      setStart(null);
    }
  }, [dragging]);

  const isCoordinateSelected = (c: Coordinates) =>
    selected.some(({ x, y }) => x === c.x && y === c.y);

  const handleOnSelect = (coordinates: Coordinates): void => {
    if (!start) {
      setStart(coordinates);
      setSelected([ coordinates ]);
    } else {
      setSelected(getLine(start, coordinates));
    }
  }

  return (
    <div>
      <p>
        You need to find the <span>spanish</span> translation for the following words:
      </p>
      <p className="tw-my-2">{words.map(word => <Word key={word} value={word} found={false}/>)}</p>
      <StyledGrid>
        {characters.map((letter, index) => {
          const coordinates = indexToCoordinates(index);

          return (
            <GridItem
              setDragging={setDragging}
              dragging={dragging}
              coordinates={coordinates}
              onSelect={handleOnSelect}
              selected={isCoordinateSelected(coordinates)}
              key={index}
            >
              {letter}
            </GridItem>
          )
        })}
      </StyledGrid>
    </div>
  );
};
