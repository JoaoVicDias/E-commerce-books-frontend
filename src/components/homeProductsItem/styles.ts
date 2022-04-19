import styled from "styled-components";

export const Container = styled.li`
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%),
    0 0 0 1px rgb(10 10 10 / 2%);
  border-radius: 3px;
  cursor: pointer;

  > img {
    width: 100%;
    border-radius: 2px 2px 0 0;
  }
`;
export const Informations = styled.div`
  padding: 18px 12px;

  > h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 12px;
    color: #3273dc;
    overflow:hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1; 
    -webkit-box-orient: vertical;
  }

  > strong {
    font-size: 1rem;
    color: #4a4a4a;
    margin: 12px 0;
  }

  > div {
    display: flex;
    align-items: center;
    margin-top: 12px;

    > span {
      font-size: 0.8rem;
      background-color: #ffdd57;
      color: rgba(0, 0, 0, 0.7);
      padding: 2px 6px;
      border-radius: 8px;
    }
  }
`;
