import { FC, useMemo } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';

// import styles from './simpleDropdown.module.scss';
import { IPropsSimpleDropdown } from './model';

const { Toggle, Menu, Item } = Dropdown;

const SimpleDropdown: FC<IPropsSimpleDropdown> = ({
  id,
  activeItemId,
  title,
  items,
  onDropdownClickHandler,
}) => {
  const activeItem = useMemo(() => {
    return items.find((item) => item.id === activeItemId);
  }, [activeItemId]);

  return (
    <Dropdown>
      <Toggle id={id} variant="dark" className="w-100">
        {activeItem ? activeItem.title : title}
      </Toggle>

      <Menu variant="dark" className="w-100">
        {items?.length ? (
          items.map((item) => {
            return (
              <Item
                key={item.id}
                active={activeItemId === item.id}
                eventKey={item.id}
                onClick={onDropdownClickHandler(item.id)}
              >
                {item.title}
              </Item>
            );
          })
        ) : (
          <Item eventKey="0">There is no items</Item>
        )}
      </Menu>
    </Dropdown>
  );
};

export default SimpleDropdown;
