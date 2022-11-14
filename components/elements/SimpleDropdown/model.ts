import { ISimpleDropdownItem } from 'types';

/* eslint-disable no-unused-vars */

export interface IPropsSimpleDropdown {
  id: string;
  activeItemId: string;
  title: string;
  items: ISimpleDropdownItem[];
  onDropdownClickHandler: (id: string) => () => void;
}
