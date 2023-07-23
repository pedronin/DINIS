import { RootState } from "../../store";

export const selectItems = (state: RootState) => state.products.items;
export const selectStatus = (state: RootState) => state.products.status;