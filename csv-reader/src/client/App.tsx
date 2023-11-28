import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataContentPage } from "./pages/data-content-page";
import { registerChartJs } from "./utils/register-chart";
import AppNavBar from "./components/app-nav-bar";
import { Routes, Route } from "react-router-dom";
import { ManageData } from "./pages/manage-data";

export default function App() {
    registerChartJs();

    const theme = createTheme({
        palette: {
            primary: {
                main: "#8800cc",
            },
            secondary: {
                main: "#ab30b3",
            },
            warning: {
                main: "#ffb000",
            },
            info: {
                main: "#311b92",
            },
            success: {
                main: "#c550ff",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <AppNavBar>
                <Routes>
                    <Route path="/" element={<DataContentPage />} />
                    <Route path="/managedata" element={<ManageData />} />
                </Routes>
            </AppNavBar>
        </ThemeProvider>
    );
}
