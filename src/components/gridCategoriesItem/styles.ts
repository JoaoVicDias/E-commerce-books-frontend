import styled from "styled-components";

export const Container = styled.li `
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #363636;
    border-radius: 2px;
    padding: 8px;

    :hover {
        background-color: #363636;
        color: #fff;
    }
`

export const Settings = styled.div `
    display: flex;
    gap: 10px;

    > button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      color: #fff;
  }

  .settings__delete__button {
      background-color: #D0342C;
  }

  .settings__edit__button {
      background-color: #3273dc;
  }
`