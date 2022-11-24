import { FormEvent } from 'react';

/* eslint-disable no-unused-vars */

export interface ISwitchesListItemFields {
  id: string;
  label: string;
  value: string;
}
export interface IPropsSwitchesList {
  items: ISwitchesListItemFields[];
  customItems?: ISwitchesListItemFields[];
  onChangeItemHandler: (id: string) => () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isActiveSubmit: boolean;
  formTitle: string;
  isLoading: boolean;
}
