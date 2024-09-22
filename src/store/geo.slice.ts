import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "src/utils/api";

interface Geolocation {
  lat: number;
  lng: number;
}

interface Search {
  address: string;
  email: string;
}

interface GeoState {
  address: string;
  email: string;
  geolocation: Geolocation | null;
  recentSearches: Search[];
}

const initialState: GeoState = {
  address: "",
  email: "",
  geolocation: null,
  recentSearches: [],
};

export const fetchGeolocation = createAsyncThunk(
  "geo/fetchGeolocation",
  async (
    { address, email }: { address: string; email?: any },
    { dispatch }
  ) => {
    try {
      const res = await axios.post("/geolocation", { address, email });
      const { latitude, longitude } = res.data;

      dispatch(setGeolocation({ lat: latitude, lng: longitude }));
      dispatch(addRecentSearch({ address, email }));

      return { latitude, longitude };
    } catch (error) {
      throw new Error("Error retrieving geolocation");
    }
  }
);

const geoSlice = createSlice({
  name: "geo",
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setGeolocation: (state, action: PayloadAction<Geolocation>) => {
      state.geolocation = action.payload;
    },
    addRecentSearch: (state, action: PayloadAction<Search>) => {
      state.recentSearches = [action.payload, ...state.recentSearches].slice(
        0,
        5
      );
    },
    autofillForm: (state, action: PayloadAction<Search>) => {
      state.address = action.payload.address;
      state.email = action.payload.email;
    },
  },
});

export const {
  setAddress,
  setEmail,
  setGeolocation,
  addRecentSearch,
  autofillForm,
} = geoSlice.actions;
export default geoSlice.reducer;
