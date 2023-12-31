import React from 'react';
import StarRatings from 'react-star-ratings';

interface IRatingStarsProps {
  ratingNum: number
}

const RatingStars: React.FC<IRatingStarsProps> = ({ ratingNum }) => {
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

export default RatingStars;
