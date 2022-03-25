import styled from "styled-components";

export const Container = styled.div`
  margin: 18px 0;
  display: flex;
  flex-direction: column;

  > label {
    color: #fff;
    margin-bottom: 10px;
  }
`;

export const Input = styled.input`
  box-shadow: inset 0 0.0625em 0.125em rgb(10 10 10 / 5%);
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  font-size: 1rem;
  height: 2.5em;
  padding: 8px;
`;
