import { IButtonsListItemData } from 'types';

/* eslint-disable no-unused-vars */

export interface IPropsButtonsList {
  ariaLabelGroup: string;
  items: IButtonsListItemData[];
  onClickHandler: (id: string) => () => void;
  selectedIds: string[];
}
