import styled from "styled-components";

interface IDivImage {
  path: string;
}

export const Container = styled.div`
  position: relative;
  width: 700px;
  height: 400px;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  @media (max-width: 767px) {
    width: 90%;
  }

  > svg {
    position: absolute;
    top: 16px;
    right: 16px;
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
  background: url(${(props) => props.path}) center/cover no-repeat;
`;

export const Informations = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  max-height: 400px;
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
