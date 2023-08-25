import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { ApolloProvider } from "@apollo/client";
import themes from "../theme";
export default function App({ Component, pageProps }: AppProps | any) {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  return (
    
      <StyledEngineProvider>
        <ThemeProvider
          theme={themes({
            isOpen: [], // for active default menu
            defaultId: "default",
            fontFamily: `'Roboto', sans-serif`,
            borderRadius: 12,
            opened: true,
          })}
        >
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </StyledEngineProvider>
 
  );
}
