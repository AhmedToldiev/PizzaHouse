import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export default function Home({ search }) {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

 useEffect(() => {
  const sortby = sortType.replace('-,', '');
  const order = sortType.includes('-') ? 'asc' : 'desc';
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  setIsLoading(true);
  // fetch(
  //   `https://65cb1d59efec34d9ed86c07b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortby}&order=${order}`,
  // )
  //   .then((res) => res.json())
  //   .then((arr) => setItems(arr), setIsLoading(false))
  //   .catch(() => setIsLoading(false));
  axios
    .get(
      `https://65cb1d59efec34d9ed86c07b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortby}&order=${order}`,
    )
    .then((res) => {
      setItems(res.data);
      setIsLoading(false);
    })
    .catch(() => setIsLoading(false));
}, [categoryId, sortType, currentPage]);

  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}
