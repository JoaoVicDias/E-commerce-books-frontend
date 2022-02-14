import styled from "styled-components";

export const Container = styled.ul `
    display: flex;
    align-items:center;
    gap:16px;

    @media (max-width: 768px) {
        flex-direction: column-reverse;
    }
`