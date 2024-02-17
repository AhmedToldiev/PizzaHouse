import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

export default function Home({ search }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [sortType, setSortType] = useState({
    name: 'популярности',
    sort: 'rating',
  });

  useEffect(() => {
    const sortby = sortType.sort.replace('-,');
    const order = sortType.sort.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    setIsLoading(true);
    fetch(
      `https://65cb1d59efec34d9ed86c07b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortby}&order=${order}`,
    )
      .then((res) => res.json())
      .then((arr) => setItems(arr), setIsLoading(false));
  }, [categoryId, sortType,currentPage]);

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
        <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage ={(number)=>setCurrentPage(number)}/>
    </div>
  );
}
