import React from 'react'
import {Form,Button,Input} from 'antd';
import UploadImage from './UploadImage'
const {TextArea}=Input


const UploadItem = ({Title,Description,Category,category,
                    onChangeTitle,onChangeDescription,
                    onChangeCategory,onSubmit,
                    onDrop,Files,FileURL,deletePreview,Loading}) => {
     return (
        <div style={{width:'90%',margin:'2rem auto'}}>
            {Loading ? <div>게시글을 올리고 있습니다</div> : 
            
            <>
            <div style={{display:'flex',justifyContent:'center'}}>
               <h2>게시글 올리기</h2>
            </div>
              <Form onSubmit={onSubmit} >
                  <UploadImage onDrop={onDrop}  
                               Files={Files} FileURL={FileURL} deletePreview={deletePreview}/>
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
              </>
              }
        


    </div>
    )
}

export default UploadItem
