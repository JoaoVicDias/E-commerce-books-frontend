import styled from "styled-components";

export const Container = styled.ul`
  max-height: 70vh;
  height: 400px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 4px;
  border: 1px solid #000;
  margin: 0 auto;
  padding: 16px;

  @media (max-width: 767px) {
    padding: 16px 6px;
  }
`;
