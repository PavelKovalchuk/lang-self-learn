export interface IPropsToastModal extends IBaseToastModal {
  isShown: boolean;
  onClose: () => void;
}

export interface IBaseToastModal {
  title: string;
  message: string;
  type: 'success' | 'danger' | 'warning';
}
