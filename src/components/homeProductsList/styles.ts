import styled from "styled-components";

export const Container = styled.ul `
  margin: 10px auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: flex-start;
  gap: 16px;
`

export const Message = styled.h2`
  text-align: center;
  color: #363636;
`;
