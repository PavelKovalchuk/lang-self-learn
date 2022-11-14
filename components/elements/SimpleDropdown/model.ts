/* eslint-disable no-unused-vars */

interface ISimpleDropdownItem {
  id: string;
  title: string;
}

export interface IPropsSimpleDropdown {
  id: string;
  activeItemId: string;
  title: string;
  items: ISimpleDropdownItem[];
  onDropdownClickHandler: (id: string) => () => void;
}
