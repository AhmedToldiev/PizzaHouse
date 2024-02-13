import React, { useEffect, useState } from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import { Skeleton } from './components/PizzaBlock/Skeleton';



// import pizzas from './pizzas.json';

function App() {
  const [items, setItems] = useState([]);
const [isLoading,setIsLoading] = useState(true)


  useEffect(()=>{
    fetch('https://65cb1d59efec34d9ed86c07b.mockapi.io/items')
      .then((res) => res.json())
      .then((arr) => setItems(arr));

  },[])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((obj) => (
              <PizzaBlock
                key={obj.id}
                {...obj}
                // title={obj.title}
                // price={obj.price}
                // imageUrl={obj.imageUrl}
                // sizes={obj.sizes}
                // types={obj.types}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
