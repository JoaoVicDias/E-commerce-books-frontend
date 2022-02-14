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
  border: 1px solid
    ${(props) => (props.isBlueButton ? "transparent" : "#dbdbdb")};
  border-radius: 4px;
  color: ${(props) => (props.isBlueButton ? "#fff" : "#363636")};
  background-color: ${(props) =>
    props.isBlueButton ? "#3273dc" : "transparent"};
  cursor: ${(props) => props.click && "pointer"};
  transition: all 200ms ease-in-out;

  :hover {
    opacity: 0.8;
  }
`;
