import styled from "styled-components";

export const Container = styled.div`
  width: 400px;
  background-color: #fff;
  border-radius: 4px;
`;

export const Main = styled.main`
  padding: 32px;

  > h1 {
    font-size: 1.5rem;
    color: #4a4a4a;
    margin-bottom: 24px;
    text-align: center;
  }
`;

export const Footer = styled.footer`
  border-top: 1px solid #ededed;
  text-align: center;

  > span {
    display: block;
    margin: 22px 0;
  }

  > span strong {
    cursor: pointer;
    color: #3273dc;
    transition: all 200ms ease-in-out;

    :hover {
      opacity: 0.8;
    }
  }
`;
