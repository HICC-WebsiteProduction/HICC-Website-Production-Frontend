import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import StarRating from '../util/StarRating';
import Button from '../util/Button';

function WriteReview() {
  const [star, setStar] = useState(0);

  return (
    <>
      <Container>
        <UserInfo>
          <User src="/images/logo.png" />
          <Nickname>홍길동</Nickname>
        </UserInfo>
        <WriteContent>
          <StarRating
            edit={true}
            value={star}
            isHalf={true}
            onChange={setStar}
            color={theme.colors.white}
          />
          <Content placeholder="리뷰 내용을 입력하세요." />
        </WriteContent>
      </Container>
      <EnrollButton buttonName="등록" />
    </>
  );
}

export default WriteReview;

const Container = styled.div`
  display: flex;
  width: 550px;
  min-height: 141px;
  margin-bottom: 10px;
  padding: 15px;

  background-color: transparent;
  border-radius: 20px;
  border: 1px solid ${theme.colors.white};
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
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.paragraph};
  font-weight: 300;
  text-align: center;
`;

const WriteContent = styled.div`
  width: 100%;
`;

const Content = styled.textarea`
  width: 100%;
  min-height: 63px;
  margin-top: 12px;
  padding: 0 10px;

  background-color: transparent;
  border: 1px solid ${theme.colors.blue};

  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.paragraph};
  line-height: 150%;
  resize: none;
  outline: none;

  &::placeholder {
    color: ${theme.colors.white};
    font-family: 'Pretendard';
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
  }
`;

const EnrollButton = styled(Button)`
  width: 100%;
  height: 40px;

  margin-bottom: 20px;
`;
