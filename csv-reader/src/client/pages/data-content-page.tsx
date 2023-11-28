import * as React from "react";
import { Box, Container, Grid } from "@mui/material";
import { Sales } from "../components/sales";
import { TotalCustomers } from "../components/total-customers";
import { TotalItems } from "../components/total-items";
import { TotalSales } from "../components/total-sales";

export function DataContentPage() {
    return (
        <>
            <title>Dashboard</title>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 4,
                }}
            >
                <Container maxWidth={false}>
                    <Grid container spacing={5}>
                        <Grid item xl={4} lg={4} sm={6} xs={12}>
                            <TotalItems />
                        </Grid>
                        <Grid item xl={4} lg={4} sm={6} xs={12}>
                            <TotalSales />
                        </Grid>
                        <Grid item xl={4} lg={4} sm={6} xs={12}>
                            <TotalCustomers />
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} xs={12}>
                            <Sales />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}
