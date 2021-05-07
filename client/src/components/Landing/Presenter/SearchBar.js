import React from 'react'
import {Input} from 'antd';
const {Search} = Input

const SearchBar = ({SearchValue,onChangeSearchValue}) => {
    return (
        <div style={{width:'100%',margin:'8px'}}>
            <Search
             style={{height:'46px'}}
             value={SearchValue}
             onChange={onChangeSearchValue}
             placeholder="검색할 게시글을 입력하세요"
            />
            
        </div>
    )
}

export default SearchBar
