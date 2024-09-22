import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, fetchGeolocation } from "src/store/geo.slice";
import { RootState, AppDispatch } from "src/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler } from "react-hook-form";

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})+$/;

interface GeoFormInputs {
  address: string;
  email: string;
}

export const GeoForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  const { geolocation, recentSearches } = useSelector(
    (state: RootState) => state.geo
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GeoFormInputs>();

  const onSubmit: SubmitHandler<GeoFormInputs> = async (data) => {
    try {
      await dispatch(
        fetchGeolocation({ address: data.address, email: data.email })
      );
      toast.success(t("geolocation_success"));
      reset();
    } catch (error) {
      toast.error(t("geolocation_error"));
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        mt: 4,
        maxWidth: "500px",
        mx: "auto",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {t("geolocation")}
      </Typography>

      <TextField
        label={t("address")}
        variant="outlined"
        fullWidth
        error={!!errors.address}
        helperText={errors.address ? t("address_required") : ""}
        {...register("address", { required: t("address_required") })}
      />

      <TextField
        label={t("email")}
        variant="outlined"
        fullWidth
        type="email"
        error={!!errors.email}
        helperText={errors.email ? t("invalid_email") : ""}
        {...register("email", {
          pattern: {
            value: emailRegex,
            message: t("invalid_email"),
          },
        })}
      />

      <Button type="submit" variant="contained" color="primary">
        {t("geolocation_form")}
      </Button>

      {geolocation && (
        <Box mt={4}>
          <Typography variant="h6" component="h3">
            {t("geolocation_results")}
          </Typography>
          <Typography>Latitude: {geolocation.lat}</Typography>
          <Typography>Longitude: {geolocation.lng}</Typography>
        </Box>
      )}

      <Box mt={4}>
        <Typography variant="h6" component="h3">
          {t("recent_searches")}
        </Typography>
        <List>
          {recentSearches.map((search: any, index: number) => (
            <ListItem
              key={index}
              onClick={() => dispatch(setAddress(search.address))}
            >
              <ListItemText primary={search.address} />
            </ListItem>
          ))}
        </List>
      </Box>
      <ToastContainer />
    </Box>
  );
};
