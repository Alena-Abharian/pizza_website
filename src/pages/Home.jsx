import React, {useEffect, useState} from 'react';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://647bb7bad2e5b6101db18d30.mockapi.io/item')
            .then(res => res.json())
            .then((json) => {
                setItems(json)
                setIsLoading(false)
            })
        window.scrollTo(0,0)
    }, [])
    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                    : items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>)}

            </div>
        </>
    );
};

export default Home;