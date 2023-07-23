import React from 'react';
import StarRatings from 'react-star-ratings';

interface IRating {
  ratingNum: number
}

const Rating: React.FC<IRating> = ({ ratingNum }) => {
  return (
    <StarRatings
      rating={Number(ratingNum)}
      starRatedColor="#ffa218"
      numberOfStars={5}
      name="rating"
      starDimension="18px"
      starSpacing="0"
    />
  );
};

export default Rating;
