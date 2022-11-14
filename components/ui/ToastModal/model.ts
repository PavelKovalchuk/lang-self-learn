export interface IBaseToastModal {
  title: string;
  message: string;
  type: 'success' | 'danger' | 'warning';
}

export interface IPropsToastModal extends IBaseToastModal {
  isShown: boolean;
  onClose: () => void;
}
