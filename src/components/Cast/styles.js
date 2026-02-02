import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 25px;
  overflow-x: auto;
`;

export const Actor = styled.div`
  min-width: 120px;
  text-align: center;

  img {
    width: 120px;
    border-radius: 8px;
  }

  p {
    font-size: 14px;
    margin-top: 8px;
  }

  span {
    font-size: 12px;
    opacity: 0.7;
  }
`;
