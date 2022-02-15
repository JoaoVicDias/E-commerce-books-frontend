import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const AdminForm = styled.div`
  width: 400px;
  padding: 28px 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.7);

  @media(max-width: 767px) {
    width: 95%;
  }

  > h4 {
    font-size: 1.5rem;
    color: #4a4a4a;
    margin-bottom: 24px;
    text-align: center;
  }
`;
