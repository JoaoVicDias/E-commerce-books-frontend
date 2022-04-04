import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 46px;
  left: 0;
  padding: 0 18px;
  width: 100%;
  max-height: 0;
  transition: max-height 0.1s;
  background-color: #363636;
  overflow: hidden;
  border-radius: 3px;
  z-index: 1;
`;

export const Content = styled.main`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 18px 0;

  > button {
    color: #fff;
    border-radius: 4px;
    background-color: #3273dc;
    border: none;
    padding: 6px 12px;

    :hover {
      opacity: .9;
    }
  }
`;
