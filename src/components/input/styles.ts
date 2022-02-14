import styled from "styled-components";

interface IInput {
  showError: boolean;
}

export const Container = styled.div`
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
    margin-top:5px;
  }
`;

export const InputStyle = styled.input<IInput>`
    width: 100%;
    box-shadow: inset 0 0.0625em 0.125em rgb(10 10 10 / 5%);
    border: 1px solid ${props => props.showError ? '#ff6961' : '#dbdbdb'};
    border-radius: 4px;
    font-size: 1rem;
    height: 2.5em;
    padding:8px;

    &:focus {
        border-color: #3273dc;
        box-shadow: 0 0 0 0.125em rgb(50 115 220 / 25%);
        outline:none;
    }

    ::placeHolder {
        opacity:0.5;
    }
`;

export const Textarea = styled.textarea``;
