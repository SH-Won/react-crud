import React,{useState,useEffect} from 'react'
import { Route, Switch } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import LandingPage from '../Presenter/LaindingPage'
import LandingMenu from '../Presenter/LandingMenu';
import CheckBox from '../Presenter/CheckBox';
import SearchBar from '../Presenter/SearchBar';
import {category} from '../Datas/Datas'
import {getFirstProduct, getProduct,deleteProduct} from '../../../_actions/product_actions';
import '../Presenter/landing.css'



const LandingContainer = () => {
    
    const dispatch = useDispatch();
    const [Skip,setSkip]= useState(0)
    const [Limit,setLimit]=useState(16);
    const [Checked,setChecked]=useState([])
    const [Filters,setFilters]=useState({category:[]})
    const [SearchValue,setSearchValue]=useState('');
    const user = useSelector(state=>state.user.userData);
    const writer = {...user};
    
    
     
    useEffect(()=>{
        dispatch(getFirstProduct(Skip,Limit,Filters,SearchValue))
        
    },[])
    const products=useSelector(state=>state.product.products)
    const postSize=useSelector(state=>state.product.postSize)
    const userProducts = products.filter(product =>product.writer._id==writer._id)

    
    
    
    
    
    const loadMoreItems = ()=>{
        
        let skip = Skip+Limit;
        let limit =Limit;
        let filters =Filters
        let searchValue = SearchValue;
        dispatch(getProduct(skip,limit,filters,searchValue))
        setSkip(skip)
        
        
        
       
    }
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
        let FilterArray = {...Filters}
        FilterArray[category]=filters;
        setFilters(FilterArray)
        
        let skip=0;
        let limit=Limit;
        let filter = FilterArray
        let searchValue=SearchValue
        dispatch(getFirstProduct(skip,limit,filter,searchValue))
        setSkip(0);
    }
    const onChangeSearchValue = (e)=>{
        setSearchValue(e.target.value)
        let skip=0;
        let limit=Limit;
        let filter =Filters
        let searchValue = e.target.value
        
        dispatch(getFirstProduct(skip,limit,filter,searchValue))
        setSkip(0);
    }
    const removeProduct =(productId)=>{
        let skip=Skip;
        let limit=Limit;
        let filter=Filters
        let searchValue=SearchValue;
        console.log(filter)

        dispatch(deleteProduct(productId,writer._id,skip,limit,filter,searchValue))

    }
    return (
        <div style={{width:'100%',margin:'1rem auto'}}>
        <div 
        className="checkbox_searchbar"
        style={{display:'flex',justifyContent:'space-between',marign:'1rem 3rem',alignItems:'center'}}>

            
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
                writer={writer._id}
                removeProduct={removeProduct}
                       />
                       </Route>
            <Route exact path="/user">
            <LandingPage 
                products={userProducts}
                postSize={postSize}
                loadMoreItems={loadMoreItems}
                Limit={Limit}/>
                </Route>
                <Route exact path="/board" >
                    <LandingPage/>
                </Route>
                </Switch>
            
        </div>
        </div>
    )
}

export default LandingContainer
