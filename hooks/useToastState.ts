import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { IBaseToastModalData } from 'components/ui';

export interface IUseToastStateParam {
  defaultMessage: IBaseToastModalData;
}

export interface IUseToastStateResult {
  toastModalResult: IBaseToastModalData;
  setToastModalResult: Dispatch<SetStateAction<IBaseToastModalData>>;
  onCloseToastModal: () => void;
}

export const useToastState = ({ defaultMessage }: IUseToastStateParam): IUseToastStateResult => {
  const [toastModalResult, setToastModalResult] = useState<IBaseToastModalData>(defaultMessage);

  const onCloseToastModal = useCallback(() => {
    setToastModalResult({ ...defaultMessage });
  }, []);

  return { toastModalResult, setToastModalResult, onCloseToastModal };
};
