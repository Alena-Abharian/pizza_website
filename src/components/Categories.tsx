import React from "react";

type TCategoriesProps = {
    value:number;
    onChangeCategory: (arg:number) => void;
}
const Categories: React.FC<TCategoriesProps> = ({value, onChangeCategory}) =>{

    const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"]

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, i) => (
                    <li
                        key={i}
                        onClick={() => onChangeCategory(i)}
                        className={value === i ? 'active' : ''}>{categoryName}</li>
                ))}
            </ul>
        </div>
    )
}

export default Categories;