import styled from "styled-components";

interface IContainer {
  loading?: boolean | number;
}

export const Container = styled.button<IContainer>`
  font-size: 1rem;
  background-color: #3298dc;
  color: #fff;
  border-radius: 4px;
  height: 2.5em;
  border: 1px solid transparent;
  transition: all 200ms ease-in-out;
  position: relative;
  padding: 0 16px;

  :hover {
    opacity: 0.8;
  }

  :after {
    content: "";
    display: ${(props) => (props.loading ? "inline-block" : "none")};
    position: absolute;
    width: 16px;
    height: 16px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border: 4px solid transparent;
    border-top-color: #ffffff;
    border-left-color: #ffffff;
    border-bottom-color: #ffffff;
    border-radius: 50%;
    animation: button-loading-spinner 800ms ease infinite;
  }

  @keyframes button-loading-spinner {
    from {
      transform: rotate(0turn);
    }

    to {
      transform: rotate(1turn);
    }
  }
`;
