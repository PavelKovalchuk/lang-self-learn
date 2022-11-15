import BaseCarousel from './BaseCarousel';
import SwitchesList from './SwitchesList';
import ToastModal from './ToastModal';
import { IBaseToastModal } from './ToastModal/model';

export { ToastModal, BaseCarousel, SwitchesList };

export interface IBaseToastModalData extends IBaseToastModal {}
