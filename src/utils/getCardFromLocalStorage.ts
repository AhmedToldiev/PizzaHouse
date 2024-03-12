
import { CartItem } from '../redux/slices/cardSlice';
import { calcTotalPrice } from './calcTotalPrice';

export const getCardFromLocalStorage = () => {
  const data = localStorage.getItem('card');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items: items as CartItem[],
    totalPrice,
  };
};
