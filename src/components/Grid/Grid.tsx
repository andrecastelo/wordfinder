import { useState, useEffect } from 'react';
import { GridItem } from './GridItem';
import { StyledGrid } from './styles';
import { Word } from './Word';
import { indexToCoordinates, getLine } from './functions';
import { Coordinates, TargetWord } from '../../types';

type GridProps = {
  characters: string[],
  targetWords: TargetWord[],
  targetLanguage: string,
};

export const Grid: React.FC<GridProps> = ({ characters, targetWords }) => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [start, setStart] = useState<Coordinates | null>(null);
  const [selected, setSelected] = useState<Coordinates[]>([]);

  const words = targetWords.map(target => target.word);

  const clearSelected = () => setSelected([]);

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

  useEffect(() => {
    if (!dragging) {
      setStart(null);
    }
  }, [dragging]);

  return (
    <div>
      <p>
        You need to find the <span>spanish</span> translation for the following words:
      </p>
      <p className="tw-my-2">{words.map(word => <Word key={word} value={word} found={false}/>)}</p>
      <StyledGrid onMouseLeave={() => setDragging(false)}>
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
