import { useState, useEffect } from 'react';
import { GridItem } from './GridItem';
import { StyledGrid } from './styles';
import { Word } from './Word';
import {
  getLine,
  indexToCoordinates,
  getSequenceMatch,
} from './functions';
import { Coordinates, TargetWord } from '../../types';

type GridProps = {
  characters: string[][],
  targetWords: TargetWord[],
  targetLanguage: string,
  onSuccess: () => void,
};

export const Grid: React.FC<GridProps> = ({ characters, targetWords, onSuccess }) => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [start, setStart] = useState<Coordinates | null>(null);
  const [selected, setSelected] = useState<Coordinates[]>([]);
  const [highlighted, setHighlighted] = useState<Coordinates[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);

  const words = targetWords.map(target => target.word);
  const gridSize = characters[0].length;

  const hasCoordinate = (c: Coordinates, seq: Coordinates[]) =>
    seq.some(({ x, y }) => x === c.x && y === c.y);

  const handleOnSelect = (coordinates: Coordinates): void => {
    if (!start) {
      setStart(coordinates);
      setSelected([ coordinates ]);
    } else {
      setSelected(getLine(start, coordinates));
    }
  }

  useEffect(() => {
    const handleOnDragStop = () => {
      setStart(null);

      const sequenceMatch: TargetWord | null = getSequenceMatch(selected, targetWords);

      if (sequenceMatch) {
        const totalWordsFound = [ ...foundWords, sequenceMatch.word];
        setFoundWords(totalWordsFound);
        setHighlighted(highlighted.concat(sequenceMatch.location));

        if (totalWordsFound.length === targetWords.length) {
          setTimeout(() => {
            setFoundWords([]);
            setHighlighted([]);
            onSuccess();
          }, 1000)
        }
      }

      setSelected([]);
    }

    if (!dragging && selected.length > 0) {
      handleOnDragStop();
    }
  }, [dragging, selected, targetWords, foundWords, highlighted, onSuccess]);

  return (
    <div>
      <p>
        You need to find the <span>spanish</span> translation for the following words:
      </p>
      <p className="tw-my-2">
        {words.map(word =>
          <Word key={word} value={word} found={foundWords.includes(word)}/>
        )}
      </p>
      <StyledGrid onMouseLeave={() => setDragging(false)} size={gridSize}>
        {characters.flat().map((letter, index) => {
          const coordinates = indexToCoordinates(index, gridSize);

          return (
            <GridItem
              setDragging={setDragging}
              dragging={dragging}
              coordinates={coordinates}
              onSelect={handleOnSelect}
              selected={hasCoordinate(coordinates, selected)}
              highlighted={hasCoordinate(coordinates, highlighted)}
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
