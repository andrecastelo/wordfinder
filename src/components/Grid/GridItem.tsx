import { StyledGridItem } from './styles';

type GridItemProps = {
  dragging: boolean,
}

export const GridItem: React.FC<GridItemProps> = ({ dragging, children }) => {
  return (
    <StyledGridItem className="tw-bg-gray-200 tw-rounded">
      {children}
    </StyledGridItem>
  )
};
