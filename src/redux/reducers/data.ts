import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GiphySearchType, fetchType, ImageData } from "../../types/apiTypes";

const { REACT_APP_GIPHY_API_KEY } = process.env;

type dataState = {
  keyword: string;
  urls: ImageData[][];
  currentPage: number;
  maxPages: number;
};

const initialState: dataState = {
  keyword: "",
  urls: [],
  currentPage: 0,
  maxPages: 0,
};

export const fetchGIFByPage = createAsyncThunk<GiphySearchType, fetchType>(
  "search",
  async ({ search, page }) => {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${REACT_APP_GIPHY_API_KEY}&q=${search}&limit=10&offset=${page}`,
      { headers: { Accept: "application/json" } }
    );
    const data = await response.json();
    return data;
  }
);

export const data = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    reset: (state) => {
      console.log("resetting");
      state.urls = [];
      state.currentPage = 0;
      state.maxPages = 0;
    },
    updateSearchKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGIFByPage.fulfilled, (state, action) => {
      state.maxPages = action.payload.pagination.total_count;
      state.currentPage = action.payload.pagination.offset;

      const urls: ImageData[] = [];
      action.payload.data.forEach((gif) => {
        urls.push({
          id: gif.id,
          url: gif.images.original.url,
          width: gif.images.original.width,
          height: gif.images.original.height,
        });
      });

      const IMAGES_PER_ROW = 5;
      const chunk1 = urls.slice(0, IMAGES_PER_ROW);
      const chunk2 = urls.slice(IMAGES_PER_ROW, urls.length);

      state.urls.push(chunk1);
      state.urls.push(chunk2);
    });
    builder.addCase(fetchGIFByPage.rejected, (state, action) => {
      console.error("error something died");
    });
  },
});

export const { reset, updateSearchKeyword } = data.actions;
