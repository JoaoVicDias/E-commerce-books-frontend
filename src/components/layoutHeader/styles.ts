import styled from "styled-components";

export const Container = styled.header`
  grid-area: header;
  padding: 0 26px;
  box-shadow: 0 2px 0 0 #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #363636;

  .backdrop-mobile {
    top: 60px;
  }
`;

export const Brand = styled.h4`
  color: #4a4a4a;
  font-size: 1.6rem;
`;

export const Nav = styled.nav`
  display: block;

  @media (max-width: 1023px) {
    display: none;
  }
`;

export const NavMobile = styled.nav`
  display: none;

  @media (max-width: 1023px) {
    padding: 24px;
    height: 100vh;
    display: block;
    position: fixed;
    top:60px;
    bottom:0;
    right:0;
    background-color: #fff;
    z-index: 1;
  }
`;

export const HambugerButton = styled.button`
  height: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: none;
  background-color: transparent;
  border: none;
  transition: all 200ms ease-in-out;

  :hover,:active {
    background-color: rgba(0,0,0,.05);
  }

  svg {
    font-size: 1.4rem;
    cursor: pointer;
  }

  @media (max-width: 1023px) {
    display: block;
  }
`;
