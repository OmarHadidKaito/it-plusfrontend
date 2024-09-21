import React, { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddress,
  setEmail,
  setGeolocation,
  addRecentSearch,
} from "src/store/geo.slice";
import { RootState, AppDispatch } from "src/store";
// import axios from "axios";
import { toast } from "react-toastify";
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

export const GeoForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { address, email, geolocation, recentSearches } = useSelector(
    (state: RootState) => state.geo
  );

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!address) {
      toast.error("Please enter an address");
      return;
    }

    try {
      const lat = 0,
        lng = 0;
      dispatch(setGeolocation({ lat, lng }));
      dispatch(addRecentSearch({ address, email }));
      toast.success("Geolocation retrieved successfully!");
    } catch (error) {
      toast.error("Error retrieving geolocation");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
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
        Geolocation Finder
      </Typography>

      <TextField
        label="Address"
        variant="outlined"
        fullWidth
        value={address}
        onChange={(e) => dispatch(setAddress(e.target.value))}
      />

      <TextField
        label="Email (optional)"
        variant="outlined"
        fullWidth
        type="email"
        value={email}
        onChange={(e) => dispatch(setEmail(e.target.value))}
      />

      <Button type="submit" variant="contained" color="primary">
        Find Geolocation
      </Button>

      {geolocation && (
        <Box mt={4}>
          <Typography variant="h6" component="h3">
            Geolocation Results:
          </Typography>
          <Typography>Latitude: {geolocation.lat}</Typography>
          <Typography>Longitude: {geolocation.lng}</Typography>
        </Box>
      )}

      <Box mt={4}>
        <Typography variant="h6" component="h3">
          Recent Searches
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
    </Box>
  );
};
