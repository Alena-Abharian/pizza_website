import React, {useContext, useEffect, useRef, useState} from 'react';
import qs from "qs";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";


const Home = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const categoryId = useSelector(state => state.filter.categoryId);
    const sortType = useSelector(state => state.filter.sort.sortProperty);
    const currentPage = useSelector(state => state.filter.currentPage);

    const isSearch = useRef(false)
    const isMounted = useRef(false);

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const {searchValue} = useContext(SearchContext);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    const fetchPizzas = () => {
        setIsLoading(true)

        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        axios.get(`https://647bb7bad2e5b6101db18d30.mockapi.io/item?page=${currentPage}&limit=4&${category}&sortBy=${sortType}${search}`)
            .then((response) => {
                setItems(response.data)
                setIsLoading(false)
            })
    }

    // если изменили параметры и был первый рендер
    useEffect(() => {
        if(isMounted.current){
            const queryString = qs.stringify({
                categoryId,
                sortType,
                currentPage,
            })
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sortType, currentPage])


    //если был первый рендер, то проверяем url-параметры и сохраняем в редакс
    useEffect(() => {
        if(window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = list.find(obj => obj.sortProperty === params.sortProperty);

            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            )
            isSearch.current = true
        }
    }, []);

    //если был первый рендер запрашиваем pizzas
    useEffect(() => {
        window.scrollTo(0, 0)

        if(!isSearch.current) {
            fetchPizzas();
        }
        isSearch.current = false;
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