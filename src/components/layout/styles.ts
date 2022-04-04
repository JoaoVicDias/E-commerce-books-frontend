import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-areas:
    "header"
    "content";
  grid-template-rows: 90px auto;
`;

export const Content = styled.main`
  grid-area: content;
  padding: 30px 24px;
  @media (max-width: 767px) {
    padding: 30px 12px;
  }
`;

export const ImgCircle = styled.img`
  width: 80px;
  height: auto;
  max-height: 80px;
  clip-path: circle();
  margin: 0 auto;
`;
