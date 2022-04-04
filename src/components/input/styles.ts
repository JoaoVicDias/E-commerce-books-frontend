import styled from "styled-components";

interface IInput {
  showError: boolean;
}

export const Container = styled.div<IInput>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > label {
    margin-bottom: 8px;
    color: #363636;
    font-size: 1rem;
    font-weight: 700;
  }

  > span {
    color: #ff261b;
    margin-top: 5px;
  }

  .img-button {
    margin: 0 auto;
    margin-top: 8px;
    width: 100%;
  }

  .input_price {
    width: 100%;
    box-shadow: inset 0 0.0625em 0.125em rgb(10 10 10 / 5%);
    border: 1px solid ${(props) => (props.showError ? "#ff6961" : "#dbdbdb")};
    border-radius: 4px;
    font-size: 1rem;
    height: 2.5em;
    padding: 8px;

    &:focus {
      border-color: #3273dc;
      box-shadow: 0 0 0 0.125em rgb(50 115 220 / 25%);
      outline: none;
    }

    ::placeholder {
      opacity: 0.5;
    }
  }

  .select_input {
    width: 100%;
  }
`;

export const InputStyle = styled.input<IInput>`
  width: 100%;
  box-shadow: inset 0 0.0625em 0.125em rgb(10 10 10 / 5%);
  border: 1px solid ${(props) => (props.showError ? "#ff6961" : "#dbdbdb")};
  border-radius: 4px;
  font-size: 1rem;
  height: 2.5em;
  padding: 8px;

  &:focus {
    border-color: #3273dc;
    box-shadow: 0 0 0 0.125em rgb(50 115 220 / 25%);
    outline: none;
  }

  ::placeholder {
    opacity: 0.5;
  }
`;

export const ImgInput = styled.img`
  width: 150px;
  clip-path: circle();
  margin: 0 auto 10px;
`;

export const Textarea = styled.textarea<IInput>`
  width: 100%;
  resize: none;
  height: 100px;
  box-shadow: inset 0 0.0625em 0.125em rgb(10 10 10 / 5%);
  border: 1px solid ${(props) => (props.showError ? "#ff6961" : "#dbdbdb")};
  border-radius: 4px;
  font-size: 1rem;
  padding: 8px;

  &:focus {
    border-color: #3273dc;
    box-shadow: 0 0 0 0.125em rgb(50 115 220 / 25%);
    outline: none;
  }

  ::placeholder {
    opacity: 0.5;
  }
`;
