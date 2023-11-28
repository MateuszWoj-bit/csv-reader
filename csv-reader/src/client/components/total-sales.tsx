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
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import axios from "axios";

type Item = {
    name: string;
    price: number;
};

type Sale = {
    item: string;
    quantity: number;
};

export const TotalSales = (props: CardProps) => {
    const [items, setItems] = React.useState<Array<Item>>([]);
    const [sales, setSales] = React.useState<Array<Sale>>([]);

    React.useEffect(() => {
        const getItems = async () => {
            try {
                const response = await axios({
                    method: "GET",
                    url: "/api/database/shop/table/items",
                    baseURL: "http://localhost:3000",
                });

                console.log({ response });

                setItems(
                    response.data.map((item: Item) => ({
                        name: item.name,
                        price: item.price,
                    }))
                );
            } catch (error) {
                console.error(JSON.stringify(error));
            }
        };

        const getSales = async () => {
            try {
                const response = await axios({
                    method: "GET",
                    url: "/api/database/shop/table/sales",
                    baseURL: "http://localhost:3000",
                });

                console.log({ response });

                setSales(
                    response.data.map((sale: Sale) => ({
                        item: sale.item,
                        quantity: sale.quantity,
                    }))
                );
            } catch (error) {
                console.error(JSON.stringify(error));
            }
        };

        getItems();
        getSales();
    }, []);

    const computeSales = (items: Array<Item>, sales: Array<Sale>) => {
        let total = 0;

        sales.forEach((sale) => {
            const item = items.find((i) => i.name === sale.item);

            if (item) {
                total += item.price * sale.quantity;
            }
        });

        return total;
    };

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
                            TOTAL SALES
                        </Typography>
                        <Typography color="textPrimary" variant="h4">
                            {computeSales(items, sales).toFixed(2)}
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
                            <AttachMoneyOutlinedIcon />
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
