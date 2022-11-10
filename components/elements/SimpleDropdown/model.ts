import { ISimpleDropdownItem } from 'types';

export interface IPropsSimpleDropdown {
  id: string;
  activeItemId: string;
  title: string;
  items: ISimpleDropdownItem[];
  onDropdownClickHandler: (id: string) => () => void;
}
