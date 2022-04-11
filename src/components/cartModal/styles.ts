import styled from "styled-components";

interface IDivImage {
  path: string;
}

export const Container = styled.div`
  max-height: 90vh;
  width: 750px;
  height: 600px;
  background-color: #fff;
  padding: 18px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 767px) {
    width: 90%;
  }

  > h1 {
    text-align: center;
  }
`;

export const List = styled.ul`
  flex: 1;
  margin: 50px 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ListItem = styled.li`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  position: relative;


  > svg {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
    cursor: pointer;
  }
`;

export const DivImage = styled.div<IDivImage>`
  background: url(${(props) => props.path}) center/contain no-repeat;
`;

export const Informations = styled.div`
  padding: 18px;
  background-color: #363636;

  > h4 {
    color: #fff;
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.125;
    margin-bottom: 10px;
  }
  > span {
    color: #fff;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.125;
    margin: 10px 0;
  }

  > div {
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 10px;
      border: 1px solid #fff;
      padding: 6px;
      width: 100px;

      > span {
        color: #fff;
        font-size: 1.5rem;
        font-weight: 600;
        line-height: 1.125;
      }

      > button {
        padding: 8px;
        font-size: 1.2rem;
        background-color: transparent;
        border: none;
        color: #fff;
      }
    }
  }
`;

export const TotalContainer = styled.div`
  margin: 10px 0;
  > span {
    color: #4a4a4a;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.125;
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: flex-end;

  > button {
    margin-top: 10px;
    padding: 10px 20px;
    border-radius: 4px;
    color: #fff;
    background-color: #3273dc;
    font-size: 1rem;
    border: none;

    :hover {
      opacity: 0.9;
    }
  }

  > a {
    margin-top: 10px;
    padding: 10px 20px;
    border-radius: 4px;
    color: #fff;
    background-color: #3273dc;
    font-size: 1rem;
    border: none;

    :hover {
      opacity: 0.9;
    }
  }
`;
