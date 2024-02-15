import React from 'react';

export default function Categories({value,onChangeCategory}) {
  // const [activeIndex, setActiveIndex] = useState(0);
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  
  // const clickCategory = (index) => {
  //   setActiveIndex(index);
  // };
  return (
    <div className="categories">
      <ul>
        {categories.map((category,i) => {
          return (
            <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>
            {category}
            </li>
            // <li key={i} onClick={() => clickCategory(i)} className={activeIndex === i ? 'active' : ''}>
            //   {value}
            // </li>
          );
        })}
      </ul>
    </div>
  );
}
