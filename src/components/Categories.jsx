import React, { useState } from 'react';

export default function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const clickCategory = (index) => {
    setActiveIndex(index);
  };
  return (
    <div className="categories">
      <ul>
        {categories.map((value,i) => {
          return (
            <li onClick={() => clickCategory(i)} className={activeIndex === i ? 'active' : ''}>
              {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
