import { styled, css } from 'styled-components';

export const Container = styled.div<{ active?: boolean }>`
  width: 45px;
  height: 45px;
  background-color: #176b87;
  border-radius: 50%;
  color: #fff;
  position: fixed;
  bottom: 90px;
  right: 45px;
  cursor: pointer;
  display: none;

  ${({ active }) =>
    active
      ? css`
          display: flex;
          align-items: center;
          justify-content: center;
        `
      : ''}
`;
