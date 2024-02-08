import { describe, expect, it, test } from 'vitest';
import {
  checkEqual,
  getSequenceMatch,
  coordinatesToIndex,
  getLine,
  indexToCoordinates,
  parseWordLocations,
} from '../functions';
import { TargetWord } from '../../types';

const p = (x: number, y: number) => ({ x, y });

describe('translate index to points', () => {
  it('correctly maps to points', () => {
    expect(indexToCoordinates(63, 8)).toEqual({ x: 7, y: 7 });
    expect(indexToCoordinates(0, 8)).toEqual({ x: 0, y: 0 });
    expect(indexToCoordinates(7, 8)).toEqual({ x: 7, y: 0 });
    expect(indexToCoordinates(56, 8)).toEqual({ x: 0, y: 7 });
  });
});

describe('translate points to indexes', () => {
  it('correctly maps to indexes', () => {
    expect(coordinatesToIndex({ x: 0, y: 0 }, 8)).toEqual(0);
    expect(coordinatesToIndex({ x: 0, y: 7 }, 8)).toEqual(7);
    expect(coordinatesToIndex({ x: 7, y: 7 }, 8)).toEqual(63);
    expect(coordinatesToIndex({ x: 7, y: 0 }, 8)).toEqual(56);
  });
});

describe('get a valid line between two points', () => {
  it('works for adjacent points', () => {
    const center = p(2, 2);
    const adjacentPoints = [
      p(1, 1), p(2, 1), p(3, 1),
      p(1, 2), p(3, 2),
      p(1, 3), p(2, 3), p(3, 3),
    ]

    adjacentPoints.forEach(point => {
      const line = getLine(center, point);
      const reverseLine = getLine(point, center);

      expect(line.length).toEqual(2);
      expect(reverseLine.length).toEqual(2);
      expect(line).toEqual([center, point]);
      expect(reverseLine).toEqual([point, center]);
    });
  });

  it('will not add the same point', () => {
    const result = getLine(p(2, 2), p(2, 2));

    expect(result.length).toEqual(1);
    expect(result).toEqual([p(2, 2)]);
  });

  it('in the same column', () => {
    const start = p(0, 0),
      end = p(0, 7),
      expected = [0, 1, 2, 3, 4, 5, 6, 7].map(y => p(0, y)),
      expectedReverse = [7, 6, 5, 4, 3, 2, 1, 0].map(y => p(0, y));

    const result = getLine(start, end);
    const reverse = getLine(end, start);

    expect(result.length).toEqual(8)
    expect(reverse.length).toEqual(8);
    expect(result).toEqual(expected);
    expect(reverse).toEqual(expectedReverse);
  });

  it('in the same row', () => {
    const start = p(0, 0),
      end = p(7, 0),
      expected = [0, 1, 2, 3, 4, 5, 6, 7].map(x => p(x, 0)),
      expectedReverse = [7, 6, 5, 4, 3, 2, 1, 0].map(x => p(x, 0));

    const result = getLine(start, end);
    const reverse = getLine(end, start);

    expect(result.length).toEqual(8)
    expect(reverse.length).toEqual(8);
    expect(result).toEqual(expected);
    expect(reverse).toEqual(expectedReverse);
  });

  it('in a diagonal, from top left to bottom right and reverse', () => {
    const start = p(1, 0),
      end = p(3, 2);

    const result = getLine(start, end);
    const reverseResult = getLine(end, start);

    expect(result).toEqual([p(1, 0), p(2, 1), p(3, 2)]);
    expect(reverseResult).toEqual([p(3, 2), p(2, 1), p(1, 0)])
  });

  it('in a diagonal, from top right to bottom left and reverse', () => {
    const start = p(3, 0),
      end = p(1, 2);

    const result = getLine(start, end);
    const reverseResult = getLine(end, start);

    expect(result).toEqual([p(3, 0), p(2, 1), p(1, 2)])
    expect(reverseResult).toEqual([p(1, 2), p(2, 1), p(3, 0)]);
  });

  it('but return only the starting point if no path can be found', () => {
    const a = p(2, 2),
      b = p(7, 0);

    expect(getLine(a, b)).toEqual([a]);
    expect(getLine(b, a)).toEqual([b]);
  })
});

test('can properly parse a location string', () => {
  const locationString = '6,1,6,2,6,3,6,4',
    expected = [p(6, 1), p(6, 2), p(6, 3), p(6, 4)];

  expect(parseWordLocations(locationString)).toEqual(expected);
});

describe('checks that two arrays of coordinates have the same elements', () => {
  it('fails with incompatible lengths', () => {
    expect(checkEqual(
      [p(0, 0), p(1, 1)],
      [p(0, 0)]
    )).toBe(false);
  })

  it('works with same length', () => {
    expect(checkEqual(
      [p(0, 0), p(1, 1)],
      [p(0, 0), p(1, 1)],
    )).toBe(true);

    expect(checkEqual(
      [p(0, 0), p(1, 1)],
      [p(1, 1), p(0, 0)],
    )).toBe(true);

    expect(checkEqual(
      [p(0, 0), p(1, 1)],
      [p(1, 1), p(1, 1)],
    )).toBe(false);
  })
})

describe('can properly check a sequence against a target', () => {
  it('fails when not finding a proper length match', () => {
    const sequence = [p(0, 0), p(1, 1), p(2, 2)];
    const target: TargetWord[] = [
      { word: 'code', location: [p(0, 0), p(1, 1), p(2, 2), p(3, 3)], source: '', },
      { word: 'order', location: [p(1, 1), p(2, 1), p(3, 1), p(4, 1), p(5, 1)], source: '' }
    ];

    expect(getSequenceMatch(sequence, target)).toEqual(null);
  });

  it('works fine with one match of the same length', () => {
    const sequence = [p(0, 0), p(1, 1), p(2, 2)];
    const target: TargetWord[] = [
      { word: 'order', location: [p(1, 1), p(2, 1), p(3, 1), p(4, 1), p(5, 1)], source: '' },
      { word: 'cod', location: [p(0, 0), p(1, 1), p(2, 2)], source: '' },
    ];

    expect(getSequenceMatch(sequence, target)).toEqual(target[1]);
  });

  it('works fine with more than one match of the same length', () => {
    const sequence = [p(0, 0), p(1, 1), p(2, 2)];
    const target: TargetWord[] = [
      { word: 'oak', location: [p(1, 1), p(2, 1), p(3, 1)], source: '' },
      { word: 'cod', location: [p(0, 0), p(1, 1), p(2, 2)], source: '' },
      { word: 'den', location: [p(2, 2), p(2, 3), p(2, 4)], source: '' },
    ];

    expect(getSequenceMatch(sequence, target)).toEqual(target[1]);
  });
})
