import { RootState } from "../../store";

export const selectCardItemById = (id: string) => (state: RootState) =>
  state.card.items.find((obj) => obj.id === id);