import classnames from 'classnames';
import { StyledGridItem } from './styles';
import { Coordinates } from '../../types';
import { PropsWithChildren } from 'react';

type GridItemProps = PropsWithChildren<{
  dragging: boolean,
  setDragging: React.Dispatch<React.SetStateAction<boolean>>,
  coordinates: Coordinates,
  onSelect: (c: Coordinates) => void,
  selected: boolean,
  highlighted: boolean,
}>

export const GridItem = ({
  dragging = false,
  setDragging,
  coordinates,
  children,
  onSelect,
  selected,
  highlighted,
}: GridItemProps) => (
  <StyledGridItem
    onMouseDown={() => {
      setDragging(true);
      onSelect(coordinates);
    }}
    onMouseUp={() => {
      setDragging(false);
    }}
    onMouseEnter={() => {
      if (dragging) {
        onSelect(coordinates);
      }
    }}
    className={classnames(
      'tw-rounded',
      'tw-transition',
      'tw-text-gray-700',
      {
        'tw-bg-gray-200': !selected && !highlighted,
        'tw-bg-blue-300': selected,
        'tw-bg-blue-200': highlighted && !selected,
      },
    )}
  >
    {children}
  </StyledGridItem>
);
