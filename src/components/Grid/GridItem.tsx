import classnames from 'classnames';
import { StyledGridItem } from './styles';
import { Coordinates } from '../../types';

type GridItemProps = {
  dragging: boolean,
  setDragging: React.Dispatch<React.SetStateAction<boolean>>,
  coordinates: Coordinates,
  onSelect: (c: Coordinates) => void,
  selected: boolean,
  highlighted: boolean,
}

export const GridItem: React.FC<GridItemProps> = ({
  dragging = false,
  setDragging,
  coordinates,
  children,
  onSelect,
  selected,
  highlighted,
}) => (
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
      'tw-bg-gray-200',
      'tw-transition',
      { 'tw-bg-blue-300': selected, 'tw-bg-blue-200': highlighted && !selected },
    )}
  >
    {children}
  </StyledGridItem>
);
