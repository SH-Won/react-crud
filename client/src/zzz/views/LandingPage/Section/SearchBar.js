import React,{useState} from 'react'
import {Input} from 'antd';
const{Search} =Input;

function SearchBar(props) {
    const [SearchTerm,setSearchTerm]=useState('');
    const onChangeSearchTerm = (e)=>{
        setSearchTerm(e.target.value)
        props.searchFilter(e.target.value)
    }
    return (
        <div>
            <Search
              value={SearchTerm}
              onChange={onChangeSearchTerm}
              placeholder="검색할 글을 입력하세요"
              />
            
        </div>
    )
}

export default SearchBar
