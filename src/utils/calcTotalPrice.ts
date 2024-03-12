import { CartItem } from "../redux/slices/cardSlice";

export const calcTotalPrice = (items:CartItem[]) => {
    return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
