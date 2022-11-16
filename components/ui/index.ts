import BaseCarousel from './BaseCarousel';
import Loader from './Loader';
import ToastModal from './ToastModal';
import { IBaseToastModal } from './ToastModal/model';

export { ToastModal, BaseCarousel, Loader };

export interface IBaseToastModalData extends IBaseToastModal {}
