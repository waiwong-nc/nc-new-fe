import './sort.scss';
import { useState, useRef } from 'react';


import { useNavigate } from "react-router-dom";

const SortPanal = ({topic}) => {

    const navigate = useNavigate();

    const sortRef = useRef(null);
    const orderRef = useRef(null)

    function onChangeHandler(){
       const query = setQuery(sortRef.current.value,orderRef.current.value);
       navigate(query)
    }

    function setQuery(sortByItem,orderByItem){
        let query ="/sort/";
        if (topic) {
            query += `topic=${topic}&`
        }
        query += `sort_by=${sortByItem}&`;
        query += `order=${orderByItem}`;
        return query;
    }

    return (
      <div className="sort_panal">
        <select name="sort_by" onChange={onChangeHandler} ref={sortRef}>
          <option value="created_at">Created_Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Vote no</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>

        <select name="order_by" onChange={onChangeHandler} ref={orderRef}>
          <option value="desc">Descending Order</option>
          <option value="asc">Ascending Order</option>
        </select>
      </div>
    );
};

export default SortPanal;