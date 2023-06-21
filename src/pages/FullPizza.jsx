import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";

const FullPizza = () => {
    const [pizza, setPizza] = useState()
    const {id} = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchPizza() {
            try{
                const {data} = await axios.get('https://647bb7bad2e5b6101db18d30.mockapi.io/item/' + id)
                setPizza(data)
            }catch (err){
                alert("Sorry we don't have that kind of pizza");
                navigate('/');
            }
        }
        fetchPizza();
    },[]);

    if(!pizza){
        return "Loading....."
    }

    return (
        <div className="container">
            <div className="pizza-block-wrapOne">
                <img className="pizza-block__imageOne" src={pizza.imageUrl}/>
                <div>
                    <h2 className="pizza-block__title">{pizza.title}</h2>
                    <p className="pizza-block__text">pizza, dish of Italian origin consisting of a flattened disk of bread dough topped with some combination of olive oil, oregano, tomato, olives, mozzarella or other cheese, and many other ingredients, baked quickly—usually,
                        in a commercial setting, using a wood-fired oven heated to a very high temperature—and served hot.</p>
                    <h4 className="pizza-block__price">$ {pizza.price}</h4>
                </div>
            </div>
        </div>
    );
};

export default FullPizza;