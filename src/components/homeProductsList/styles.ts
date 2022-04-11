import styled from "styled-components";

export const Container = styled.ul `
  margin: 10px auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: flex-start;
  gap: 16px;

  @media (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

export const Message = styled.h2`
  text-align: center;
  color: #363636;
`;
