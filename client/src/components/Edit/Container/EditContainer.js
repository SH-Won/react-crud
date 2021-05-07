import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {
  uploadImage,
  deleteImages,
  getProductDetail,
  updateProduct,
  previewImage
} from "../../../_actions/product_actions";
import EditPage from '../Presenter/EditPage';
import '../Presenter/Edit.css';


const category =[
    {key:1, value:'뉴스'},
    {key:2, value:'헬스'},
    {key:3, value:'음악'},
    {key:4, value:'자랑'},
    {key:5, value:'연예인'},
    {key:6, value:'스포츠'},
    {key:7, value:'이슈'},
    {key:8, value:'음식'},
    {key:9, value:'19금'}
]

const EditContainer = (props) => {
    const productId = props.match.params.productId;
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user.userData);
    const writer = {...user}
    const [Title,setTitle]=useState();
    const [Description,setDescription]=useState();
    const [Category,setCategory]=useState();
    const [OriginalImages,setOriginalImages]=useState([])
    const [FileURL,setFileURL]=useState([])
    const [Files,setFiles]=useState([])
    const [FilePath,setFilePath]=useState([]);

    useEffect(()=>{
          dispatch(getProductDetail(productId))
    },[dispatch])
    const product = useSelector(state=>state.upload.product,[])
   // const images = useSelector(state=>state.upload.images,[]);
    useEffect(()=>{
         setTitle(product.title)
         setDescription(product.description)
         setCategory(product.category)
         setOriginalImages(product.images)

    },[product])
    
    const onChangeTitle=(e)=>{
        setTitle(e.target.value);
    }
    const onChangeDescription=(e)=>{
        setDescription(e.target.value);
    }
    const onChangeCategory=(e)=>{
        setCategory(e.target.value);
    }
    const onDrop = (files)=>{

        setFiles([...Files,...files])
          
       let fileURLs = [];
       let file;
       let filesLength =files.length;

       for(let i=0; i<filesLength; i++){
           file =files[i]
           let reader = new FileReader();
           reader.onload= ()=>{
               fileURLs.push(reader.result);
               setFileURL([...FileURL,...fileURLs])

               dispatch(previewImage(fileURLs))
           }
           reader.readAsDataURL(file)
       }


    }
    const deletePreview = (image) =>{
        const current = FileURL.indexOf(image);
        let urlArray =[...FileURL];
        let fileArray =[...Files];
        urlArray.splice(current,1);
        fileArray.splice(current,1)
        setFileURL(urlArray);
        setFiles(fileArray);
    }
   

    const deleteOriginalImage = (image)=>{
        const current = OriginalImages.indexOf(image)
        let imageArray = [...OriginalImages]
        imageArray.splice(current,1)
        setOriginalImages(imageArray)
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        let formData = new FormData();
        let config = {header:{'content-type':'multipart/form-data'}}
        Files.forEach(file=>{
            formData.append('file',file)
        })
        dispatch(uploadImage(formData,config))
        .then(response=>{
            setFilePath([...response.payload])

            let variable={
                id:productId,
                title:Title,
                description:Description,
                images:[...OriginalImages,...response.payload],
                category:Category,
                writer:writer._id
            }
            dispatch(updateProduct(variable))
            .then(response=>{
                alert('게시글을 수정하시겠습니다')
                props.history.push('/')
            })

        })
        

    }
     
    return (
        <div>
            <EditPage 
            Title={Title}
            Description={Description}
            Category={Category}
            category={category}
            onChangeTitle={onChangeTitle}
            onChangeDescription={onChangeDescription}
            onChangeCategory={onChangeCategory}
            onSubmit={onSubmit}
            onDrop={onDrop}
           
            deleteOriginalImage={deleteOriginalImage}

            originalImages={OriginalImages}
            FileURL={FileURL}
            deletePreview={deletePreview}
            
            
            />
        </div>
    )
}

export default EditContainer
