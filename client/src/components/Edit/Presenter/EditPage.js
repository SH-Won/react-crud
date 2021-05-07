import React from 'react'
import {Form,Button,Input} from 'antd';
import EditImage from './EditImage';
const {TextArea}=Input


const EditPage = ({Title,Description,Category,category,
                    onChangeTitle,onChangeDescription,
                    onChangeCategory,onSubmit,
                    onDrop,originalImages,
                    deleteOriginalImage,
                    FileURL,deletePreview}) => {
     return (
        <div className='edit_container'>
        <div className='edit_header' >
           <h2>게시글 수정하기</h2>
        </div>
          <Form onSubmit={onSubmit} >
              <EditImage onDrop={onDrop}  originalImages={originalImages}
                          deleteOriginalImage={deleteOriginalImage}
                          FileURL={FileURL} deletePreview={deletePreview}/>
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

export default EditPage
