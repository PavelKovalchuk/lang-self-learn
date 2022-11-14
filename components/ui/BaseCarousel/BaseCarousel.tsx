import { FC } from 'react';
import Carousel from 'react-bootstrap/Carousel';

// import styles from './baseCarousel.module.scss';
import { IPropsBaseCarousel } from './model';

const BaseCarousel: FC<IPropsBaseCarousel> = ({ items, className }) => {
  // const [elementToRender, setElementToRender] = useState<any>(null);

  return (
    <Carousel interval={null} fade className={className} indicators={false}>
      {items.map(({ component, id }) => {
        return <Carousel.Item key={id}>{component}</Carousel.Item>;
      })}
    </Carousel>
  );
};

export default BaseCarousel;
