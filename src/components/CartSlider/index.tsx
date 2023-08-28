import React from 'react';

import styles from './CartSlider.module.scss';

// сделал статичными т.к. делать такой огромный API слишком долго и не имеет смысла
// в реале эти данные само собой будут подтягиваться с бэка
import cartImg2 from '../../assets/img/cart_img/cart-2.jpg';
import cartImg3 from '../../assets/img/cart_img/cart-3.jpg';
import cartImg4 from '../../assets/img/cart_img/cart-4.jpg';
import cartImg5 from '../../assets/img/cart_img/cart-5.jpg';
import cartImg6 from '../../assets/img/cart_img/cart-6.jpg';
import cartImg7 from '../../assets/img/cart_img/cart-7.jpg';
import cartImg8 from '../../assets/img/cart_img/cart-8.jpg';
import cartImg9 from '../../assets/img/cart_img/cart-9.jpg';
import cartImg10 from '../../assets/img/cart_img/cart-10.jpg';
import cartImg11 from '../../assets/img/cart_img/cart-11.jpg';
import cartImg12 from '../../assets/img/cart_img/cart-12.jpg';
import cartImg13 from '../../assets/img/cart_img/cart-13.jpg';
import cartImg14 from '../../assets/img/cart_img/cart-14.jpg';

import arrow from '../../assets/img/arrow.svg';

interface ICartSlider {
  imageUrl: string;
}

const CartSlider: React.FC<ICartSlider> = ({ imageUrl }) => {
  const image = [
    imageUrl,
    cartImg2,
    cartImg3,
    cartImg4,
    cartImg5,
    cartImg6,
    cartImg7,
    cartImg8,
    cartImg9,
    cartImg10,
    cartImg11,
    cartImg12,
    cartImg13,
    cartImg14,
  ];
  const [activeImgIdx, setActiveImgIdx] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollPrev = () => {
    setActiveImgIdx((prev) => prev - 1);
    scrollRef.current?.scrollBy({
      top: -54,
      behavior: 'smooth',
    });
  };

  const scrollNext = () => {
    setActiveImgIdx((prev) => prev + 1);
    scrollRef.current?.scrollBy({
      top: 54,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.slider}>
      <div ref={scrollRef} className={styles.slider__nav}>
        <div className={styles.slider__nav_link}>
          {image.map((url, i) => (
            <div className={styles.slider__nav_img} key={i}>
              <div className={activeImgIdx === i ? styles.active : ''}>
                <img onClick={() => setActiveImgIdx(i)} src={url} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={scrollPrev}
        className={`${styles.slider__nav_prev} ${activeImgIdx === 0 ? styles.hidden : ''}`}>
        <img src={arrow} alt="<" />
      </button>
      <button
        onClick={scrollNext}
        className={`${styles.slider__nav_next} ${
          activeImgIdx === image.length - 1 ? styles.hidden : ''
        }`}>
        <img src={arrow} alt=">" />
      </button>

      <div className={styles.slider_active}>
        <img src={image[activeImgIdx]} alt="" />
      </div>
    </div>
  );
};

export default CartSlider;
