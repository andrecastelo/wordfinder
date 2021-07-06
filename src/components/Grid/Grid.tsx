import React, { useState, useEffect } from 'react';
import { GridItem } from './GridItem';
import { StyledGrid, GridContainer } from './styles';
import { Word } from './Word';
import {
  getLine,
  indexToCoordinates,
  getSequenceMatch,
} from '../../functions';
import { Coordinates, TargetWord } from '../../types';

const Emphasis: React.FC = ({ children }) => (
  <span className="tw-inline-block tw-p-2 tw-mx-1 tw-font-bold tw-rounded tw-bg-gray-100">
    {children}
  </span>
);

const randomCongrats = () => {
  const congrats = [
    'Well done!',
    'Great job!',
    'Awesome!',
    'You are very good at this!',
    'Practically a native speaker at this point!'
  ];

  return congrats[Math.floor(Math.random() * congrats.length)];
}

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

  const sourceWords: string[] = Array.from(new Set(targetWords.map(({ source }) => source)));
  const wordsLeft: number = targetWords.length - foundWords.length;

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
    <GridContainer size={gridSize}>
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

      <p className="tw-mt-8">
        Find the <Emphasis>spanish</Emphasis> translations for the word below.
      </p>
          <p className="tw-mt-4">
            There {wordsLeft === 1 ? 'is' : 'are'}
            <Emphasis>{wordsLeft}</Emphasis>
            {wordsLeft === 1 ? 'word' : 'words'} left.
          </p>
        <p className="tw-mt-4">
          {randomCongrats()}
        </p>
      <p className="tw-my-8">
        {sourceWords.map(word =>
          <Word key={word} value={word} found={foundWords.includes(word)}/>
        )}
      </p>
    </GridContainer>
  );
};
