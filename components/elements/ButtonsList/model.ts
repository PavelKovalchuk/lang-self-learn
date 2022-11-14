/* eslint-disable no-unused-vars */

export interface IButtonsListItemData {
  text: string;
  id: string;
}

export interface IPropsButtonsList {
  ariaLabelGroup: string;
  items: IButtonsListItemData[];
  onClickHandler: (id: string) => () => void;
  selectedIds: string[];
}
