import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

// import styles from './variantsList.module.scss';
import { IPropsButtonsList } from './model';

const ButtonsList: FC<IPropsButtonsList> = ({
  onClickHandler,
  items,
  ariaLabelGroup,
  selectedIds,
}) => {
  return (
    <ButtonGroup data-test="ButtonsList" aria-label={ariaLabelGroup}>
      {items.map((item) => {
        const isSelected = selectedIds.find((id) => id === item.id);
        const variant = isSelected ? 'info' : 'dark';

        return (
          <Button key={item.text} variant={variant} onClick={onClickHandler(item.id)}>
            {item.text}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default ButtonsList;
