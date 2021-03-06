import React,{useState,useEffect} from 'react'
import { Route, Switch } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import LandingPage from '../Presenter/LaindingPage'
import LandingMenu from '../Presenter/LandingMenu';
import CheckBox from '../Presenter/CheckBox';
import SearchBar from '../Presenter/SearchBar';
import CategoryBoard from '../Presenter/CategoryBoard';
import {category} from '../Datas/Datas'
import {getFirstProduct, getProduct} from '../../../_actions/product_actions';
import '../Presenter/Landing.css'



const LandingContainer = (props) => {
    
    const dispatch = useDispatch();
    const [loadMore,setLoadMore]=useState(false);
    const [Skip,setSkip]= useState(0)
    const [Limit,setLimit]=useState(8);
    const [Checked,setChecked]=useState([])
    const [Filters,setFilters]=useState({category:[]})
    const [SearchValue,setSearchValue]=useState('');
    const user = useSelector(state=>state.user.userData);
    const products=useSelector(state=>state.product.products)
    const postSize=useSelector(state=>state.product.postSize)
    
    const writer = {...user};
    const userProducts = products.filter(product =>product.writer._id==writer._id)
    
    useEffect(()=>{
        let variable={
            skip:Skip,
            limit:Limit,
            filters:Filters,
            searchTerm:SearchValue,
        }

        loadMore ? 
        dispatch(getProduct(variable)) :
        dispatch(getFirstProduct(variable))

    },[Skip,Filters,SearchValue])


    const loadMoreItems = ()=>{
        let skip=Skip+Limit;
        setLoadMore(true);
        setSkip(skip)
    }

    console.dir(loadMoreItems)
    const categoryToggle=(value)=>{
        const valueIndex = Checked.indexOf(value)
        let CheckedArray =[...Checked]
        if(valueIndex === -1){
            CheckedArray.push(value)
        }
        else{
        CheckedArray.splice(valueIndex,1)
        }
        setChecked(CheckedArray)
        filterHandler(CheckedArray,'category')

    }
    const filterHandler = (filters,category)=>{
        setLoadMore(false);
        let FilterArray = {...Filters}
        FilterArray[category]=filters;
        setFilters(FilterArray)
        setSkip(0);
    }
    const onChangeSearchValue = (e)=>{
        setLoadMore(false);
        setSearchValue(e.target.value)
         setSkip(0);
    }

    const boardCategory = () => 
    
    <div className="category-board-container">
    {products && category.map(item => {
        let categoryProducts = products.filter(product => product.category === Number(item._id));
        return <CategoryBoard key={item._id} products={categoryProducts} title={item.name}/>
    } )}
     </div>

    
    return (
        <div className="landing-container" >
         <div className="landing-checkbox_searchbar">
           <CheckBox 
            category={category}
            Checked={Checked}
            categoryToggle={categoryToggle}
            />
            <SearchBar
            SearchValue={SearchValue}
            onChangeSearchValue={onChangeSearchValue}
            />
         </div>

         <div>
          <LandingMenu/>
          <Switch>
            <Route exact path="/" >
             <LandingPage
                products={products}
                postSize={postSize}
                loadMoreItems={loadMoreItems}
                Limit={Limit}   
                history={props.history}
             />
              {boardCategory()}
            </Route>
            
            <Route exact path="/user">
             <LandingPage 
                products={userProducts}
                postSize={postSize}
                loadMoreItems={loadMoreItems}
                Limit={Limit}/>
            </Route>
                
           </Switch>
            
         </div>
        </div>
    )
}

export default LandingContainer
