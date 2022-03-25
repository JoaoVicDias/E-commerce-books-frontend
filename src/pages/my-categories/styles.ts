import styled from "styled-components";

export const Container = styled.div`
  min-height: 100%;

  @media(min-width: 1024px) {
    padding: 30px 240px;
  }
`;

export const Settings = styled.div`
  margin: 50px 0 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export const BlueButton = styled.button`
  color: #fff;
  background-color: #3273dc;
  border: none;
  padding: 12px 16px;
  border-radius: 4px;

  :hover {
    opacity: 0.8;
  }
`;
