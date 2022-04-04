import styled from "styled-components";

interface IDivImage {
  imageUrl: string;
}

export const Container = styled.li`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

export const DivImage = styled.div<IDivImage>`
  background: url(${(props) => props.imageUrl}) center/contain no-repeat;
  border-radius: 4px 0 0 4px;
`;

export const RightContainer = styled.div`
  background-color: #363636;
  padding: 18px;
  border-radius: 0 4px 4px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 767px) {
    padding: 8px;
    flex-direction: column;
  }
`;

export const Informations = styled.div`
  > h4 {
    font-size: 1.5rem;
    margin-bottom: 12px;
    color: #fff;

    @media (max-width: 767px) {
      font-size: 1rem;
    }
  }

  > p {
    color: #fff;
    margin: 8px 0;

    @media (max-width: 767px) {
      font-size: 0.9rem;
    }
  }
`;

export const Categorys = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 8px 0;

  > p {
    font-size: 1rem;
    color: #fff;
    margin-right: 5px;
  }

  > span {
    font-size: 0.8rem;
    background-color: #ffdd57;
    color: rgba(0, 0, 0, 0.7);
    padding: 2px 6px;
    border-radius: 8px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 767px) {
    gap: 5px;
  }

  > button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    color: #fff;

    @media (max-width: 767px) {
      padding: 8px 12px;
    }
  }

  .delete__button {
    background-color: #d0342c;
  }

  .edit__button {
    background-color: #3273dc;
  }
`;
