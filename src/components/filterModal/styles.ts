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
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
