import styled from "styled-components";

interface IDivImage {
  path: string;
}

export const Container = styled.div`
  width: 600px;
  min-height: 400px;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

export const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px;

  > svg {
    cursor: pointer;
    width: 20px;
    height: 20px;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 16px;
  flex: 1;
`;

export const DivImage = styled.div<IDivImage>`
  background: url(${(props) => props.path}) center/contain no-repeat;
`;

export const Informations = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  max-height: 650px;
  overflow: auto;
  gap: 10px;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    gap: 16px;

    > h1 {
      color: #363636;
      font-size: 2rem;
      font-weight: 600;
      line-height: 1.125;
    }

    > span {
      color: #4a4a4a;
      font-size: 1.5rem;
      font-weight: 600;
      line-height: 1.125;
    }

    > p {
      color: #4a4a4a;
      font-size: 1.25rem;
      font-weight: 400;
      line-height: 1.25;
      white-space: pre-wrap;
    }
  }

  > button {
    margin-top: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    color: #fff;
    background-color: #3273dc;
    font-size: 1rem;

    :hover {
      opacity: .9;
    }
  }
`;
