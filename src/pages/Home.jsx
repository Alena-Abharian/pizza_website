import React, {useEffect, useRef} from 'react';
import qs from "qs";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    selectFilterCategoryId, selectFilterCurrentPage, selectFilterSearchValue,
    selectFilterSortProperty,
    setCategoryId,
    setCurrentPage,
    setFilters
} from "../redux/slices/filterSlice";
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzaSlice";

import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";


const Home = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const categoryId = useSelector(selectFilterCategoryId);
    const sortType = useSelector(selectFilterSortProperty);
    const currentPage = useSelector(selectFilterCurrentPage);
    const searchValue = useSelector(selectFilterSearchValue);
    const {items, status} = useSelector(selectPizzaData);

    const isSearch = useRef(false)
    const isMounted = useRef(false);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    const getPizzas = () => {
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(fetchPizzas({
            category,
            search,
            sortType,
            currentPage
        }))

        window.scrollTo(0, 0)
    }


    // если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
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
        if (window.location.search) {
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
        if (!isSearch.current) {
            getPizzas();
        }

        isSearch.current = false;
    }, [categoryId, sortType, searchValue, currentPage])

    const pizzas = items.map((obj) =><PizzaBlock key={obj.id} {...obj}/>)

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)


    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(i) => onChangeCategory(i)}/>
                <Sort/>
            </div>
            <h2 className="content__title">Pizzas</h2>
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>Error 😕</h2>
                    <p>Unfortunately, it was not possible to get pizzas. Please try again later.</p>
                </div>) : (
                <div className="content__items">
                    {status === 'loading' ? skeletons : pizzas}
                </div>
            )
            }
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </>
    );
};

export default Home;