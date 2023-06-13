import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage} from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";


const Home = () => {
    const dispatch = useDispatch();
    const categoryId = useSelector(state => state.filter.categoryId);
    const sortType = useSelector(state => state.filter.sort.sortProperty);
    const currentPage = useSelector(state => state.filter.currentPage);

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const {searchValue} = useContext(SearchContext);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    useEffect(() => {
        setIsLoading(true)

        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        axios.get(`https://647bb7bad2e5b6101db18d30.mockapi.io/item?page=${currentPage}&limit=4&${category}&sortBy=${sortType}${search}`)
            .then((response) => {
                setItems(response.data)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, currentPage])




    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>)

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(i) => onChangeCategory(i)}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </>
    );
};

export default Home;