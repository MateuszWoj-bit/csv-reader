import * as React from "react";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardProps,
    Grid,
    Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import axios from "axios";

export const TotalItems = (props: CardProps) => {
    const [items, setItems] = React.useState<number>(0);

    React.useEffect(() => {
        const getItems = async () => {
            try {
                const response = await axios({
                    method: "GET",
                    url: "/api/database/shop/table/items",
                    baseURL: "http://localhost:3000",
                });

                console.log({ response });

                setItems(response.data.length);
            } catch (error) {
                console.error(JSON.stringify(error));
            }
        };

        getItems();
    }, []);

    return (
        <Card {...props}>
            <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: "space-between" }}
                >
                    <Grid item>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="overline"
                        >
                            TOTAL ITEMS
                        </Typography>
                        <Typography color="textPrimary" variant="h4">
                            {items}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: "success.main",
                                height: 56,
                                width: 56,
                            }}
                        >
                            <ShoppingCartIcon />
                        </Avatar>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        pt: 2,
                    }}
                >
                    <ArrowUpwardIcon color="success" />
                    <Typography
                        variant="body2"
                        sx={{
                            mr: 1,
                        }}
                    >
                        16%
                    </Typography>
                    <Typography color="textSecondary" variant="caption">
                        Since last month
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};
