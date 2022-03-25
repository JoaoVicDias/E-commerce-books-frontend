import styled from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  min-height: 300px;
  max-height:450px;
  width: 550px;
  display: flex;
  flex-direction: column;

  @media(max-width: 767px) {
    width: 90%;
  }
`;

export const Header = styled.header`
  padding: 16px;

  > h4 {
    text-align: center;
    font-size: 2rem;
  }
`;

export const Content = styled.main`
  padding: 16px;
  flex: 1;
  overflow: auto;
`;

export const Footer = styled.footer`
  padding: 16px;
  border-top: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;

  > button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      color: #fff;
  }

  .footer__cancel__button {
      background-color: #D0342C;
  }

  .footer__create__button {
      background-color: #3273dc;
  }
`;

export const CloseButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  > svg {
    cursor: pointer;
    width: 20px;
    height: 20px;
  }
`;
