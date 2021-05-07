import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import UploadItem from './Presenter/UploadItem'
import {uploadProduct,uploadImage} from '../../_actions/product_actions';
import './Presenter/Upload.css'

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
const UploadContainer = (props) => {
    const dispatch = useDispatch();
    const writer = localStorage.getItem('userId');
    const [Title,setTitle]=useState('');
    const [Description,setDescription]=useState('');
    const [Category,setCategory]=useState(1);
    const [FileURL,setFileURL]=useState([]);
    const [FilePath,setFilePath]=useState([]);
    const [Files,setFiles]=useState([]);

    const [ Loading, setLoading]=useState(false);

  

    const onChangeTitle=(e)=>{
        setTitle(e.target.value);
    }
    const onChangeDescription=(e)=>{
        setDescription(e.target.value);
    }
    const onChangeCategory=(e)=>{
        setCategory(e.target.value);
    }
    const onDrop =(files)=>{
       // console.log(files);
        let newArray = [];
        
        
        setFiles([...Files,...files])
        
        let fileURLs = [];
        let file;
        let filesLength =files.length;

        for(let i=0; i<filesLength; i++){
            file = files[i]
            let reader =new FileReader();
            reader.onload = () =>{
                //console.log(reader.result)
                fileURLs.push(reader.result);
                setFileURL([...FileURL,...fileURLs])
                
                console.log(fileURLs)
                console.log(FileURL)
              //  dispatch(previewImage(fileURLs))
            }
            
            reader.readAsDataURL(file);
            
        };
        
        /*
        let formData = new FormData();
        let config = {header:{'content-type':'multipart/form-data'}}
        
        files.forEach(file=>{
            formData.append('file',file)
        })
        */
        //dispatch(uploadImage(formData,config))
       
    }
    
   // const images=useSelector(state=>state.upload.images,[]);
    const previewImages = useSelector(state=>state.upload.previewImages);
    
   /* const deleteImage = (image)=>{
        let imageArray =[...images]
        dispatch(deleteImages(image,imageArray))
    }
    */
    const onSubmit = (e)=>{
        setLoading(true)
        
        e.preventDefault();
        let formData = new FormData();
        let config={header:{'content-type':'multipart/form-data'}}
        Files.forEach(file=>{
            formData.append('file',file)
        })
        dispatch(uploadImage(formData,config))
        .then(response=>{
               // console.log(response)
            
                setFilePath([...response.payload])
                let variable={
                    writer:writer,
                    title:Title,
                    description:Description,
                    images:[...response.payload],
                    category:Category,
                }
                dispatch(uploadProduct(variable))
               .then(response=>{
                   
                   //alert('게시글을 올리는데 성공했습니다')
                   props.history.push('/')
               })
               
            
        })


        

        
        
    }


    const deletePreview= (file)=>{
        const current = FileURL.indexOf(file)
        let urlArray = [...FileURL];
        let fileArray= [...Files];
        urlArray.splice(current,1);
        fileArray.splice(current,1)
        setFileURL(urlArray);
        setFiles(fileArray);



    }
    //console.log(Files)
    //console.log(FileURL)

 

    return (
        <div>
           
            
            <UploadItem 
              
              Title={Title}
              Description={Description}
              Category={Category}
              category={category}
              onChangeTitle={onChangeTitle}
              onChangeDescription={onChangeDescription}
              onChangeCategory={onChangeCategory}
              onSubmit={onSubmit}
              onDrop={onDrop}
              
              
              Files={Files}
              FileURL={FileURL}
              deletePreview={deletePreview}
              Loading={Loading}
              
             
            />
           
        </div>
    )
}

export default UploadContainer
