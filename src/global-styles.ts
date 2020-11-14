import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
    }
    h1, h2, h3, h4, h5, h6 {
        margin: 0;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    body {
        background-color: rgb(240, 240, 242)
    }
`;
