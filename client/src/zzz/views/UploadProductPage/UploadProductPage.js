import React,{useState} from 'react'
import axios from 'axios';
import {Input,Button,Form} from 'antd';
import Upload from '../../util/Upload';
import {useSelector,useDispatch} from 'react-redux';
import {uploadProduct} from '../../../_actions/product_actions';
const {TextArea}=Input;

const category =[
    {key:1, value:'뉴스'},
    {key:2, value:'헬스'},
    {key:3, value:'음악'},
    {key:4, value:'자랑'},
    {key:5, value:'연예인'},
    {key:6, value:'스포츠'},
    {key:7, value:'이슈'},
    {key:8, value:'음식'}
]



function UploadProductPage(props) {
    const [Title,setTitle]=useState('');
    const [Description,setDescription]=useState('');
    const [Category,setCategory]=useState(1);
    const dispatch = useDispatch();
    const images = useSelector(state=>state.upload.images)
    const writer = localStorage.getItem('userId');

    
    const onChangeTitle=(e)=>{
        setTitle(e.target.value);
    }
    const onChangeDescription=(e)=>{
        setDescription(e.target.value);
    }
    const onChangeCategory=(e)=>{
        setCategory(e.target.value);
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        let variable={
            writer:writer,
            title:Title,
            description:Description,
            images:images,
            category:Category,

        }
        dispatch(uploadProduct(variable))
       .then(response=>{
           console.log(response);
           alert('게시글을 올리는데 성공했습니다')
           props.history.push('/')
           
       })

        
    }


    
    return (
        <div style={{width:'80%',margin:'2rem auto'}}>
            <div style={{display:'flex',justifyContent:'center'}}>
               <h2>게시글 올리기</h2>
            </div>
              <Form onSubmit={onSubmit} >
                  <Upload />

                  <br/><br/>
                  <label name="title">제목</label>
                  <TextArea value={Title} onChange={onChangeTitle} />
                  <br/><br/>
                  <label name="description">내용</label>
                  <TextArea value={Description} onChange={onChangeDescription} />
                  <br/><br/>
                  <select value={Category} onChange={onChangeCategory}>
                      {category.map(item=>(
                         <option key={item.key} value={item.key}>{item.value}</option>
                      ))}
                  </select>
                  <br/><br/>

                  <Button onClick={onSubmit}>
                      글 올리기
                  </Button>
                  

              </Form>


        </div>
    )
}

export default UploadProductPage
