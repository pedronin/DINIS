import { createAsyncThunk } from '@reduxjs/toolkit';
import { TypeProductItem } from '../products/types';
import axios from 'axios';

export const fetchProducts = createAsyncThunk<TypeProductItem[], string>(
  'products/fetchProducts',
  async (search: string, thunkApi) => {
    try {
      // let url = 'https://64b3aab60efb99d862683de5.mockapi.io/items' + search;
      let url = 'https://64b7989221b9aa6eb0789204.mockapi.io/items' + search;
      const { data } = await axios.get(url);
      return data as TypeProductItem[];
    } catch (error) {
      return thunkApi.rejectWithValue('Ошибка при получении данных');
    }
  },
);
