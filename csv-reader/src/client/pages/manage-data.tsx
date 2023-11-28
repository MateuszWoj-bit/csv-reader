import * as React from "react";
import { Form, Field, Formik, FormikHelpers } from "formik";
import { TextField } from "formik-mui";
import * as yup from "yup";
import {
    Button,
    Grid,
    InputAdornment,
    LinearProgress,
    Box,
    styled,
    Typography,
    TextField as TextFieldMUI,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Container } from "@mui/system";
import axios from "axios";

function AddItem() {
    type AddItemValues = {
        name: string;
        price: number;
    };
    const addItemInitialValues = {
        name: "",
        price: 0,
    };

    const validationSchema = yup.object({
        name: yup.string().required("Name is required"),
        price: yup
            .number()
            .positive("Enter a positive price")
            .required("Price is required"),
    });

    const handleSubmit = async (
        formValues: AddItemValues,
        actions: FormikHelpers<AddItemValues>
    ) => {
        try {
            const response = await axios({
                method: "POST",
                url: "/api/database/shop/table/items",
                baseURL: "http://localhost:3000",
                headers: { "Content-Type": "application/json" },
                data: {
                    columns: ["name", "price"],
                    values: [formValues.name, formValues.price],
                },
            });

            console.log({ response });

            actions.setSubmitting(false);
        } catch (error) {
            console.error(JSON.stringify(error));
        }
    };

    return (
        <Grid item xl={4} lg={4} sm={4} xs={4}>
            <Typography color="primary">Add item</Typography>
            <Formik
                initialValues={addItemInitialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {(props) => {
                    const { errors, isValid, isSubmitting, touched } = props;

                    return (
                        <Form noValidate>
                            <StyledField
                                component={TextField}
                                name="name"
                                label="Name"
                                fullWidth
                                required
                            />

                            <StyledField
                                component={TextField}
                                name="price"
                                label="Price"
                                type="number"
                                step={0.01}
                                fullWidth
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            €
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {isSubmitting && <LinearProgress />}

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={!isValid || isSubmitting}
                            >
                                Submit
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </Grid>
    );
}

function AddSale() {
    type AddSaleValues = {
        item: string;
        quantity: number;
        date: Dayjs;
    };

    const addSaleInitialValues = {
        item: "",
        quantity: 0,
        date: dayjs(),
    };

    const validationSchema = yup.object({
        item: yup.string().required("Item is required"),
        quantity: yup
            .number()
            .positive("Enter a positive quantity")
            .required("Quantity is required"),
    });

    const handleSubmit = async (
        formValues: AddSaleValues,
        actions: FormikHelpers<AddSaleValues>
    ) => {
        try {
            const response = await axios({
                method: "POST",
                url: "/api/database/shop/table/sales",
                baseURL: "http://localhost:3000",
                headers: { "Content-Type": "application/json" },
                data: {
                    columns: ["item", "quantity", "date"],
                    values: [
                        formValues.item,
                        formValues.quantity,
                        dayjs(formValues.date).format("YYYY/MM/DD"),
                    ],
                },
            });

            console.log({ response });

            actions.setSubmitting(false);
        } catch (error) {
            console.error(JSON.stringify(error));
        }
    };

    return (
        <Grid item xl={4} lg={4} sm={4} xs={4}>
            <Typography color="primary">Add sale</Typography>
            <Formik
                initialValues={addSaleInitialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {(props) => {
                    const {
                        errors,
                        isValid,
                        isSubmitting,
                        touched,
                        values,
                        setFieldValue,
                    } = props;

                    return (
                        <Form noValidate>
                            <StyledField
                                component={TextField}
                                name="item"
                                label="Item"
                                fullWidth
                                required
                            />

                            <StyledField
                                component={TextField}
                                name="quantity"
                                label="Quantity"
                                type="number"
                                step={1}
                                fullWidth
                                required
                            />

                            <Box sx={{ margin: "12px" }}>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DesktopDatePicker
                                        label="Date"
                                        inputFormat="YYYY/MM/DD"
                                        value={values.date}
                                        onChange={(newValue) => {
                                            if (newValue !== null) {
                                                setFieldValue("date", newValue);
                                            }
                                        }}
                                        renderInput={(params) => (
                                            <TextFieldMUI {...params} />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>

                            {isSubmitting && <LinearProgress />}

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={!isValid || isSubmitting}
                            >
                                Submit
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </Grid>
    );
}

const StyledField = styled(Field)(({ theme }) => ({
    margin: "12px",
}));

export function ManageData() {
    return (
        <Container>
            <AddItem />
            <AddSale />
        </Container>
    );
}
