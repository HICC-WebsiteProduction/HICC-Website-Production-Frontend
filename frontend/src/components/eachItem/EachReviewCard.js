import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function EachReviewCard({ eachReview }) {
  const MAX = 5;

  // 별점을 리턴해주는 함수
  const starRating = rating => {
    const starArray = [];

    for (let star = 1; star <= MAX; star++) {
      starArray.push(
        <Star key={`star${star}-${eachReview.id}`} accent={star <= rating}>
          <FontAwesomeIcon icon={faStar} />
        </Star>,
      );
    }
    return starArray;
  };

  return (
    <ReviewCard>
      <UserInfo>
        <User src="/images/logo.png" />
        <Nickname>{`ezwoo`}</Nickname>
      </UserInfo>
      <ReviewContent>
        <StarRating>{starRating(eachReview.star)}</StarRating>
        <Content>{`리뷰 내용
마싰어요
맛있어요
맛있어요
맛있어요!!~~~~~~~~~~~~~~~~~~~~~~~~~~`}</Content>
      </ReviewContent>
    </ReviewCard>
  );
}

export default EachReviewCard;

const ReviewCard = styled.div`
  display: flex;
  width: 550px;
  min-height: 140px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: ${theme.colors.white};
  border-radius: 20px;
`;

const UserInfo = styled.div`
  width: 85px;
  margin-right: 8px;
`;

const User = styled.img`
  width: 85px;
  height: 85px;
  margin-bottom: 6px;
  border-radius: 50%;
`;

const Nickname = styled.div`
  color: ${theme.colors.black};
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.paragraph};
  font-weight: 300;
  text-align: center;
`;

const ReviewContent = styled.div`
  width: 100%;
`;

const StarRating = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

const Star = styled.div`
  color: ${props => (props.accent ? theme.colors.blue : 'rgba(0, 0, 0, 0.20)')};
  font-size: ${theme.fontSizes.subtitle};
`;

const Content = styled.p`
  margin: 8px 6px;
  color: ${theme.colors.black};
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.paragraph};
  font-weight: 600;
  line-height: 140%;
  white-space: pre-line;
`;
