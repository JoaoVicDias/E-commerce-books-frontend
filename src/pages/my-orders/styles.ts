import styled from "styled-components";

export const Settings = styled.div`
  margin: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 5px;

  @media (max-width: 767px) {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`;

// export const BlueButton = styled.button`
//   color: #fff;
//   background-color: #3273dc;
//   border: none;
//   padding: 12px 16px;
//   border-radius: 4px;

//   :hover {
//     opacity: 0.8;
//   }
// `;
