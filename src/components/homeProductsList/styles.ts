import styled from "styled-components";

export const Container = styled.ul`
  min-height:300px ;
  margin: 10px auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: flex-start;
  gap: 20px;


  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

export const Message = styled.h2`
  text-align: center;
  color: #363636;
`;
