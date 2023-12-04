import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import StarRating from './../util/StarRating';

function EachReviewCard({ eachReview }) {
  return (
    <ReviewCard>
      <UserInfo>
        <User src="/images/logo.png" />
        <Nickname>{`ezwoo`}</Nickname>
      </UserInfo>
      <ReviewContent>
        <StarRating edit={false} value={eachReview.star} isHalf={true} />
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
  ${theme.fontstyle.body5};
  text-align: center;
`;

const ReviewContent = styled.div`
  width: 100%;
`;

const Content = styled.p`
  margin: 8px 6px;
  color: ${theme.colors.black};
  ${theme.fontstyle.body3};
  white-space: pre-line;
`;
