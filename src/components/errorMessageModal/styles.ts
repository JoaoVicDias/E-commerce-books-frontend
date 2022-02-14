import styled from "styled-components";

export const Container = styled.div`
  width: 300px;
  background-color:#fff ;
`;

export const Content = styled.main`
  padding: 32px 16px;
  text-align:center;

  > svg {
      font-size:3rem;
      color: #ff261b;
      margin-bottom: 12px;
  }

  > p {
    font-size: 1rem;
    color: #4a4a4a;
  }
`;

export const Footer = styled.footer`
  border-top: 1px solid #ededed;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .footer_btn {
    padding: 0 12px;
  }
`;
