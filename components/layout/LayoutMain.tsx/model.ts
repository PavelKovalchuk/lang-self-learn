import { ReactNode } from 'react';

import { IUserTrainingDocument } from 'types';

export interface IPropsLayout {
  children: ReactNode;
  userTraining?: IUserTrainingDocument;
}
