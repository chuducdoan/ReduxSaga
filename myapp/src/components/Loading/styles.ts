import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: rgb(0, 0, 0, 0.8);
  z-index: 999;
`;

export const ContentLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const BorderLoading = styled.div`
  width: 280px;
  height: 280px;
  border-bottom: 3px solid #64ccc5;
  border-right: 2px solid #dafffb;
  z-index: 999;
  border-radius: 50%;
  position: absolute;
  transition: all 1s;
  animation: loadingBorderAnimate 1s linear infinite;

  @keyframes loadingBorderAnimate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export const IconLoading = styled.div`
  position: relative;
  font-size: 30px;
  color: #fff;
  transition: all 1s;
  animation: loadingIconLoading 16s ease-in-out infinite;

  @keyframes loadingIconLoading {
    0% {
      transform: scale(0.8);
    }

    10% {
      transform: scale(1);
    }

    20% {
      transform: scale(0.8);
    }

    40% {
      transform: scale(1);
    }

    60% {
      transform: scale(0.8);
    }

    100% {
      transform: scale(1);
    }
  }
`;
