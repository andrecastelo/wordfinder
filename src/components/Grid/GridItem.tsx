import { useState } from 'react';
import classnames from 'classnames';
import { StyledGridItem } from './styles';
import { Coordinates } from './functions';

type GridItemProps = {
  dragging: boolean,
  setDragging: React.Dispatch<React.SetStateAction<boolean>>,
  coordinates: Coordinates,
  onSelect: (c: Coordinates) => void,
}

export const GridItem: React.FC<GridItemProps> = ({
  dragging = false,
  setDragging,
  coordinates,
  children,
  onSelect,
}) => {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <StyledGridItem
      onMouseDown={() => {
        setDragging(true);
        setSelected(true);
        onSelect(coordinates);
      }}
      onMouseUp={() => {
        setDragging(false);
      }}
      onMouseEnter={() => {
        if (dragging) {
          setSelected(true);
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
