import React, {useEffect, useRef} from 'react';
import qs from "qs";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {
    selectFilterCategoryId, selectFilterCurrentPage, selectFilterSearchValue,
    selectFilterSortProperty,
    setCategoryId,
    setCurrentPage,
    setFilters
} from "../redux/slices/filterSlice";
import {fetchPizzas, SearchPizzaParams, selectPizzaData} from "../redux/slices/pizzaSlice";

import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {useAppDispatch} from "../redux/store";


const Home:React.FC = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const categoryId = useSelector(selectFilterCategoryId);
    const sortBy = useSelector(selectFilterSortProperty);
    const currentPage = useSelector(selectFilterCurrentPage);
    const searchValue = useSelector(selectFilterSearchValue);
    const {items, status} = useSelector(selectPizzaData);

    const isSearch = useRef(false)
    const isMounted = useRef(false);

    const onChangeCategory = (id:number) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (numberPage:number) => {
        dispatch(setCurrentPage(numberPage))
    }

    const getPizzas = () => {
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            fetchPizzas({
            category,
            search,
            sortBy,
            currentPage:String(currentPage)
        }))

        window.scrollTo(0, 0)
    }


    // если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                categoryId,
                sortBy,
                currentPage,
            })
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sortBy, currentPage])


    //если был первый рендер, то проверяем url-параметры и сохраняем в редакс
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

            const sort= list.find(obj => obj.sortProperty === params.sortBy);
            dispatch(
                setFilters({
                    searchValue: params.search,
                    categoryId: Number(params.category),
                    currentPage: Number(params.currentPage),
                    sort: sort || list[0]
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
    }, [categoryId, sortBy, searchValue, currentPage])

    const pizzas = items.map((obj:any) =><PizzaBlock key={obj.id} {...obj}/>)

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)


    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(i:number) => onChangeCategory(i)}/>
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