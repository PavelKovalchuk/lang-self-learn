import { FC } from 'react';
import Carousel from 'react-bootstrap/Carousel';

// import styles from './baseCarousel.module.scss';
import { IPropsBaseCarousel } from './model';

const BaseCarousel: FC<IPropsBaseCarousel> = ({ items, className, activeIndex }) => {
  return (
    <Carousel
      data-test="BaseCarousel"
      interval={null}
      fade
      className={className}
      indicators={false}
      activeIndex={activeIndex}
      controls={false}
    >
      {items?.map(({ component, id }) => {
        return <Carousel.Item key={id}>{component}</Carousel.Item>;
      })}
    </Carousel>
  );
};

export default BaseCarousel;
