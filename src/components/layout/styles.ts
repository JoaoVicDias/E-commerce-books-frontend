import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-areas:
    "header"
    "content";
    grid-template-rows: 60px auto;
`;


export const Content = styled.main `
  grid-area: content;
  padding: 30px 24px;
`