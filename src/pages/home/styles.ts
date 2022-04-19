import styled from "styled-components";

export const Container = styled.div `
    min-height:100%;
    padding: 30px 100px ;

    @media(max-width: 1023px) {
        padding: inherit ;
    }
`

export const Settings = styled.div `
    position: relative;
    margin: 10px 0 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`