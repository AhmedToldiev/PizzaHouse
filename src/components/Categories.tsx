import React from 'react';

type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void;
};

export const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => {
          return (
            <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
});
