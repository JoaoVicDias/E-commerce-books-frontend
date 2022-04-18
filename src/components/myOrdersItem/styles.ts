import styled from "styled-components";

interface image {
  path: string;
}

export const Container = styled.li`
  background-color: #343434;
  border-radius: 4px;
  padding: 18px;
  display: flex;
  flex-direction: column;
`;

export const Informations = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  flex-wrap: wrap;
  gap: 16px;

  > div {
    > h6 {
      margin-bottom: 12px;
    }
  }

  > button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    color: #fff;
    background-color: #3273dc;
  }
`;

export const ProductsContainer = styled.ul`
  background-color: #fff;
  color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

export const ProductsItem = styled.li`
  background-color: #4a4a4a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border: 1px solid #fff;
  flex-wrap: wrap;
  gap: 10px;
`;

export const ImageDiv = styled.div<image>`
  background: url(${(props) => props.path}) center/contain no-repeat;
  width: 100px;
  height: 100px;
`;
