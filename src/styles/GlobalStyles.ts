import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto';
    }

    html, body, #root {
        min-height: 100vh;
    }

    ul {
        list-style: none;
    }

    a {
        text-decoration: none;
        cursor: pointer;
        color: inherit;
    }

    button {
        cursor: pointer;
    }

    .backdrop-transition-enter {
        transform: translateY(-100%);
        opacity: 0;
    }
    .backdrop-transition-enter-active {
        opacity: 1;
        transform: translateY(0);
        transition: all 200ms;
    }
    .backdrop-transition-exit {
        opacity: 1;
        transform: translateY(0);
    }
    .backdrop-transition-exit-active {
        opacity: 0;
        transform: translateY(-100%);
        transition: all 200ms;
    }

    .modal-transition-enter {
        transform: translateY(-100px);
        opacity: 0;
    }
    .modal-transition-enter-active {
        opacity: 1;
        transform: translateY(0);
        transition: all 200ms;
    }
    .modal-transition-exit {
        opacity: 1;
        transform: translateY(0);
    }
    .modal-transition-exit-active {
        opacity: 0;
        transform: translateY(-100px);
        transition: all 200ms;
    }

    .mobile-navigation-transition-enter {
        transform: translateX(100%);
        opacity: 0;
    }
    .mobile-navigation-transition-enter-active {
        opacity: 1;
        transform: translateY(0);
        transition: all 200ms;
    }
    .mobile-navigation-transition-exit {
        opacity: 1;
        transform: translateY(0);
    }
    .mobile-navigation-transition-exit-active {
        opacity: 0;
        transform: translateX(100%);
        transition: all 200ms;
    }

    /* .ease-transition-enter {
        max-height: 0px;
    }
    .ease-transition-enter-active {
        max-height: auto;
        transition: all 200ms ease-in-out;
    }
    .ease-transition-exit {
        max-height: auto;
    }
    .ease-transition-exit-active {
        max-height: 0;
        transition: all 200ms ease-in-out;
    } */
`;
