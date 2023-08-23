import ReactStars from 'react-stars';
import React from 'react';
import theme from '../../styles/Theme';

// https://github.com/n49/react-stars

function StarRating(props) {
  const ratingChanged = newRating => {
    props.onChange(newRating);
  };

  return (
    <ReactStars
      count={5}
      value={props.value}
      edit={props.edit}
      onChange={ratingChanged}
      size={30}
      half={props.isHalf}
      color1="rgba(0, 0, 0, 0.2)"
      color2={theme.colors.blue}
    />
  );
}

export default StarRating;
