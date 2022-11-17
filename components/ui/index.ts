import BaseCarousel from './BaseCarousel';
import BaseModal from './BaseModal';
import Loader from './Loader';
import ToastModal from './ToastModal';
import { IBaseToastModal } from './ToastModal/model';

export { ToastModal, BaseCarousel, Loader, BaseModal };

export interface IBaseToastModalData extends IBaseToastModal {}
