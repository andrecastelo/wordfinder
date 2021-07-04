import classnames from 'classnames';
import { StyledGridItem } from './styles';
import { Coordinates } from '../../types';

type GridItemProps = {
  dragging: boolean,
  setDragging: React.Dispatch<React.SetStateAction<boolean>>,
  coordinates: Coordinates,
  onSelect: (c: Coordinates) => void,
  selected: boolean,
}

export const GridItem: React.FC<GridItemProps> = ({
  dragging = false,
  setDragging,
  coordinates,
  children,
  onSelect,
  selected,
}) => {
  return (
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
      onMouseLeave={() => {

      }}
      className={classnames(
        'tw-rounded',
        'tw-bg-gray-200',
        { 'tw-bg-blue-300': selected }
      )}
    >
      {children}
    </StyledGridItem>
  )
};
