import styled from "styled-components";

export const Container = styled.ul`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 1023px) {
    flex-direction: column;
  }

  .isBlueButton {
    border: transparent;
    color: #fff;
    background-color: #3273dc;
  }

  .isText {
      border: transparent;
  }

  .redButton {
    border: transparent;
    color: #fff;
    background-color: #D0342C;
  }
`;
