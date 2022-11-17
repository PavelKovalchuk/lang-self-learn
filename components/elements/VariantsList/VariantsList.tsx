import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { IVerbAnswer } from 'types';

// import styles from './variantsList.module.scss';
import { IPropsVariantsList } from './model';
import Helpers from './helpers';

const VariantsList: FC<IPropsVariantsList> = ({
  pairsData,
  onClickHandler,
  currentAnswer,
  answers,
  variantType,
  ariaLabelGroup,
}) => {
  return (
    <ButtonGroup data-test="VariantsList" aria-label={ariaLabelGroup}>
      {pairsData.map((item) => {
        const answerData: IVerbAnswer | undefined = answers.find(
          (answer) =>
            answer[variantType] === item.text && answer[`${variantType}IdPair`] === item.pairId
        );
        const isSelected = Boolean(answerData);
        const isCurrent =
          currentAnswer?.[variantType] === item.text &&
          currentAnswer[`${variantType}IdPair`] === item.pairId;
        const variant = Helpers.getButtonVariants(isCurrent, answerData);

        return (
          <Button
            key={`${item.text}-${item.pairId}`}
            variant={variant}
            onClick={onClickHandler(item.pairId, item.text)}
            disabled={isSelected}
            className="me-2"
          >
            {item.text}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default VariantsList;
