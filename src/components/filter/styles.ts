import styled from "styled-components";

interface IFilterButton {
  isOpen: boolean;
}

export const Container = styled.div`
  .isOpen {
    max-height: 99999px;
    transition: all 8s ease-in-out;
  }
`;

export const FilterButton = styled.button<IFilterButton>`
  border: none;
  text-transform: uppercase;
  color: #363636;
  padding: 12px;
  background-color: transparent;
  display: flex;
  align-items: center;

  > svg {
    margin-left: 8px;
    width: 22px;
    height: 22px;
    transition: all 200ms ease-in;
    transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "none")};
  }
`;
