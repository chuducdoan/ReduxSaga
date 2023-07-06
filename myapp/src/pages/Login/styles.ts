import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('https://img.vietcetera.com/uploads/images/11-nov-2021/thumbnail-travelhub.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.5);
    z-index: 0;
  }
`;

export const Inner = styled.div`
  z-index: 1;
  border-radius: 10px;
  border: 1px solid #fafafa;
  padding: 20px;
  width: 300px;
  background-color: #3c5c6f8f;
`;

export const Title = styled.div`
  font-size: 28px;
  margin-bottom: 16px;
  color: #fff;
  font-weight: bold;
  text-shadow: 2px 2px 10px #000;
`;
