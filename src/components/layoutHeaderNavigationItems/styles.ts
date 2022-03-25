import styled from "styled-components";

interface IContainer {
  isBlueButton?: boolean;
  click?: boolean;
}

export const Container = styled.li<IContainer>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  color: #363636;
  background-color: "transparent";
  cursor: ${(props) => props.click && "pointer"};
  transition: all 200ms ease-in-out;

  :hover {
    opacity: 0.8;
  }
`;
