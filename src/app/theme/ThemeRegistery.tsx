'use client';
import { createTheme,ThemeProvider,ThemeOptions } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const themeOptions:ThemeOptions={}

const theme=createTheme(themeOptions)

export default function ThemeRegistery ({children}:{children:React.ReactNode}){
return <ThemeProvider theme={theme}>
    <CssBaseline/>
    {children}
</ThemeProvider>
}