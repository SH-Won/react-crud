const express = require('express');
const router = express.Router();
const multer = require('multer');
const gm =require('gm');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const config = require("../config/key");

const { Product } = require("../models/Product");
const {View} = require('../models/View');
const { auth } = require("../middleware/auth");

const cloud_name=process.env.cloud_name || config.cloud_name
const api_key=process.env.api_key || config.api_key
const api_secret=process.env.api_secret || config.api_secret
cloudinary.config({
       
    /*cloud_name:config.cloud_name,
    api_key:config.api_key,
    api_secret:config.api_secret

    */

   cloud_name:config.cloud_name,
   api_key:config.api_key,
   api_secret:config.api_secret
   
    
})



const Storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
       // folder:'uploads',
        format: async (req,file)=>{
            "jpg","png","gif";
        },
        public_id:(req,file)=>{

        }        
    }
})

const parser = multer({storage:Storage}).array('file');



let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter : (req,file,cb)=>{
        const ext =path.extname(file.originalname)
        if(ext !== '.jpg' || ext !=='.png' || ext !=='.gif'){
            return cb(res.status(400).end('jpg , png 파일만 가능합니다'),false);
        }
        cb(null,true)
    }
    
});


//const upload =multer({storage:Storage}).array("file");

//=================================
//             Video
//=================================
router.post('/uploadfiles',(req,res)=>{
    //클라이언트에서 받은 비디오를 서버에 저장한다.
    
   // req.files.forEach(file=>console.log(file));
/*
   {
    [0]   fieldname: 'file',
    [0]   originalname: 'KakaoTalk_20210221_232207983.jpg',
    [0]   encoding: '7bit',
    [0]   mimetype: 'image/jpeg',
    [0]   
    [0]   size: 62348,
    [0]   filename: 'gklot7mqu595ujmsb4ns'
    [0] }
*/

    parser(req,res,err=>{
        
          if(err){ return res.json({success : false , err})
    }
     /*  
    const cloudinary =require('cloudinary').v2
       cloudinary.config({
       
        cloud_name:config.cloud_name,
        api_key:config.api_key,
        api_secret:config.api_secret
    })
    */
    //req.files.forEach(file=> console.log(file));

    let urlData =[];
    let nameData =[];
    
      req.files.forEach(file=>{
          console.log(file);
         urlData.push(file.path);
          /*const path = file.path;
          cloudinary.uploader.upload(path,(err,image)=>{
              if(err) return res.send(err)   
              urlData.push(image.url)
              if(Number(req.files.indexOf(file)) === Number(req.files.length -1) )
              res.json({success:true , url:urlData})     
          })
          */

       })
        return res.json({success:true , url:urlData})
    })
})


router.post('/deletefiles',auth,(req,res)=>{
    //클라이언트에서 받은 비디오를 서버에 저장한다.
    upload(req,res,err=>{
        if(err){ return res.json({success : false , err})
    }
       let urlData =[];
       let nameData =[];
       console.log(req.files)
       req.files.forEach(file=>{
           urlData.push(file.path);
           nameData.push(file.filename)
       })

        return res.json({success:true , url:urlData, fileName:nameData})
    })

})



router.post('/uploadProduct',(req,res)=>{
    const product = new Product(req.body)
    product.save((err,result)=>{
        if(err) return res.json({success:false,err})
        res.json({success:true,result})
    })
})

router.post('/beforeNextProduct',(req,res)=>{
   // const this_id = Product.findOne({'_id':req.body.productId})

   let order = req.body.order ? req.body.order : 'desc';
   let sortBy =req.body.sortBy ? req.body.sortBy : '_id';
  
    Product.find({_id:req.body.productId})
    .populate('writer')
    .sort([[sortBy,order]])
    .skip(0)
    .limit(3)
    .exec((err,products)=>{
        if(err) return res.json({success:false,err})
        res.json({success:true,products})
    })
})
router.post('/updateView',(req,res)=>{
   // console.log(req.body.productId)
    Product.findOneAndUpdate({'_id':req.body.productId},
        {$set:{views:Number(req.body.views+1)}})
        .exec((err,result)=>{
            if(err) res.json({success:false,err})
            res.status(200).json({success:true});
           // console.log(result);
        })
    
    
})
router.post('/recentlyView',(req,res)=>{
    

    View.find({product:req.body.product,userTo:req.body.userTo})
    .exec((err,info)=>{
        if(info.length == 0){
            const view = new View(req.body)
            view.save((err,result)=>{
                if(err) res.json({success:false,err})
                View.find({userTo:req.body.userTo})
                .populate('product')
                .exec((err,views)=>{
                    console.log(views);
                    views.reverse();
                    res.status(200).json({success:true,views})
                })
                
            })
        }
        else{
            View.findOneAndDelete({userTo:req.body.userTo,product:req.body.product})
           // .populate('product')
            .exec((err,views)=>{
                if(err) res.json({success:false,err})
               //왜 view=> view.product._id 가 [ {},{},{},{},{}...] 이런 형식일까? 궁금...
              /*  const targetArray = views.length >0 && views.map(view=>view.product._id.toString())
                const targetIndex = targetArray.indexOf(req.body.product)
                
                
              console.log(t,typeof t);
                console.log(targetIndex)
                const temp = views[targetIndex]
                 console.log(temp)
                views.splice(targetIndex,1);
                views.push(temp);
                console.log(views)
                views.reverse();
                res.status(200).json({success:true,views});*/

                // 몽고 DB에 저장된건 reverse 가 안되있다는걸 깨닫지 못하고
                // 계속 삽질을 했다.........................ㅠㅠ..
                const view = new View(req.body)
                view.save((err,result)=>{
                    if(err) res.json({success:false,err})
                    View.find({userTo:req.body.userTo})
                    .populate('product')
                    .exec((err,views)=>{
                        if(err) res.json({success:false,err})
                        console.log(views)
                        views.reverse();
                        res.status(200).json({success:true,views})
                    })
                })
                
            })
        }
    })
})
router.post('/getRecentlyView',(req,res)=>{
    View.find({userTo:req.body.userTo})
    .populate
})

router.post('/getFirstProducts',(req,res)=>{
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy =req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let term = req.body.searchTerm;

    let findArgs={}
    for(let key in req.body.filters){
        if(req.body.filters[key].length >0){
            if(req.body.filters[key]==='price'){

            }
            else{
                findArgs[key]=req.body.filters[key]
            }
        }
    }
    console.log(findArgs)

   if(term){
    Product.find(findArgs)
    .find({$text:{$search:term}})
    .populate('writer')
   // .sort([[sortBy,order]])
    .skip(skip)
    .limit(limit)
    .exec((err,products)=>{
        if(err) return res.json({success:false,err})
        res.json({success:true,products,postSize:products.length})
    })
   }
   else{
    Product.find(findArgs)
    .populate('writer')
    //.sort([[sortBy,order]])
    .skip(skip)
    .limit(limit)
    .exec((err,products)=>{
        if(err) return res.json({success:false,err})
        res.json({success:true,products,postSize:products.length})
    })
   }
})
router.post('/getBoardProducts',(req,res)=>{
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy =req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let term = req.body.searchTerm;

    let findArgs={}
    for(let key in req.body.filters){
        if(req.body.filters[key].length >0){
            if(req.body.filters[key]==='price'){

            }
            else{
                findArgs[key]=req.body.filters[key]
            }
        }
    }

   if(term){
    Product.find(findArgs)
    .find({$text:{$search:term}})
    .populate('writer')
    //.sort([[sortBy,order]])
    .skip(skip)
    .limit(limit)
    .exec((err,boardProducts)=>{
        if(err) return res.json({success:false,err})
        res.json({success:true,boardProducts})
    })
   }
   else{
    Product.find(findArgs)
    .populate('writer')
  //  .sort([[sortBy,order]])
    .skip(skip)
    .limit(limit)
    .exec((err,boardProducts)=>{
        if(err) return res.json({success:false,err})
        res.json({success:true,boardProducts})
        
    })
   }
})

router.post('/getProducts',(req,res)=>{
    let order = req.body.order ? req.body.order :'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs ={};
    let term =req.body.searchTerm;
    

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0){
            if(key==='price'){

            }
            else{
                findArgs[key]=req.body.filters[key]
            }
        }
        
    }
    console.log(findArgs);
    console.log(req.body.filters);
    if(term){
        Product.find(findArgs)
        .find({$text:{$search:term}})
    .populate('writer')
  //  .sort([[sortBy,order]])
    .skip(skip)
    .limit(limit)
    .exec((err,products)=>{
        if(err) return res.json({success:false,err})
        res.json({success:true,products,postSize:products.length,length:products.length})
    })
    }
    else{
        Product.find(findArgs)
    .populate('writer')
  //  .sort([[sortBy,order]])
    .skip(skip)
    .limit(limit)
    .exec((err,products)=>{
        if(err) return res.json({success:false,err})
        res.json({success:true,products,postSize:products.length, length:products.length})
    })
    }
})
/*
router.post('/getFilterProduct',(req,res)=>{
    let order = req.body.order ? req.body.order :'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs ={};
    let term = req.body.searchTerm;
    
    for(let key in req.body.filters){
        if(req.body.filters[key].length >0){
            if(key==='price'){

            }
            else{
                findArgs[key]=req.body.filters[key]
            }
        }
        
    }
    console.log(findArgs);
   if(term){
    Product.find(findArgs)
    .find({$text:{$search:term}})
    .populate('writer')
    .sort([[sortBy,order]])
    .skip(skip)
    .limit(limit)
    .exec((err,products)=>{
        if(err) return res.json({success:false,err})
        res.json({success:true,products,postSize:products.length})
    })
   }
   else{
    Product.find(findArgs)
    .populate('writer')
    .sort([[sortBy,order]])
    .skip(skip)
    .limit(limit)
    .exec((err,products)=>{
        if(err) return res.json({success:false,err})
        res.json({success:true,products,postSize:products.length})
    })
   }
})

router.post('/getSearchProduct',(req,res)=>{
    let order = req.body.order ? req.body.order :'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs ={};
    let term = req.body.searchTerm;
    
    for(let key in req.body.filters){
        if(req.body.filters[key].length >0){
            if(key==='price'){

            }
            else{
                findArgs[key]=req.body.filters[key]
            }
        }
        
    }
    console.log(findArgs);
   if(term){
    Product.find(findArgs)
    .find({$text:{$search:term}})
    .populate('writer')
    .sort([[sortBy,order]])
    .skip(skip)
    .limit(limit)
    .exec((err,products)=>{
        if(err) return res.json({success:false,err})
        res.json({success:true,products,postSize:products.length})
    })
   }
   else{
    Product.find(findArgs)
    .populate('writer')
    .sort([[sortBy,order]])
    .skip(skip)
    .limit(limit)
    .exec((err,products)=>{
        if(err) return res.json({success:false,err})
        res.json({success:true,products,postSize:products.length})
    })
   }
})
*/
router.post('/removeProduct',(req,res)=>{
    Product.findOneAndDelete({_id:req.body.productId})
    .exec((err,result)=>{
        if(err) return res.json({success:false,err})
        

        View.deleteMany({product:req.body.productId})
        .exec((err,result)=>{
            if(err) return res.json({success:false,err})
            res.json({success:true})
            console.log(result)
        })
    })
   
})

router.post('/deleteProduct',(req,res)=>{
    let order = req.body.order ? req.body.order :'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let term = req.body.searchTerm;
    
    let findArgs={}
    console.log('filters:',req.body.filters)
    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key==='price'){

            }
            else{
                findArgs[key]=req.body.filters[key]
            }
        }
    }
    console.log(findArgs)

    Product.findOneAndDelete({_id:req.body._id,writer:req.body.writer})
   /* .exec((err,result)=>{
        if(err) return res.json({success:false,err})
        res.json({success:true,result});
    })
    */
     .exec((err,result)=>{
        if(err) return res.json({success:false,err})
        View.remove({product:req.body.productId})
                .exec((err,result)=>{
                    if(err) return res.json({success:false,err})
                    console.log(result)
                })

        if(term){

            Product.find(findArgs)
            .find({$text:{$search:term}})
           // .sort([[sortBy,order]])
            .skip(0)
            .limit(skip+limit)
            .populate('writer')
            .exec((err,products)=>{
                if(err) return res.json({success:false,err})

               

                res.json({success:true,products});
            })
        }
        else{
            console.log('findArgs : ',findArgs)
            Product.find(findArgs)
           // .sort([[sortBy,order]])
            .skip(0)
            .limit(skip+limit)
            .populate('writer')
            .exec((err,products)=>{
                if(err) return res.json({success:false,err})
                res.json({success:true,products});
            })
        }
    })
})
//?id =${productId}&type=single
//id = 121212123,12412124,23423421 type=array
router.get('/products_by_id',(req,res)=>{

    let type= req.query.type;
    let productIds = req.query.id;

    if(type==='array'){
        let ids = req.query.id.split(',');
        productIds=[];
        productIds=ids.map(id=>{
            return id
        })
    }
    // 프로덕트 ID 를 통해서 프로덕트의 정보를 가져온다
    Product.find({_id: {$in:productIds} })
    .populate('writer')
    .exec((err,product)=>{
        if(err) return res.json({success:false,err})
        res.status(200).send(product)
      //  console.log(product);
       // console.log(typeof product)
    })

})
router.post('/updateProduct',(req,res)=>{
    console.log(req.body)
    Product.findOneAndUpdate({_id:req.body.id},
        {$set:{
            title:req.body.title,
            description:req.body.description,
            images:req.body.images,
            category:req.body.category
        }})
    .exec((err,result)=>{
        if(err) return res.json({success:false,err})
        res.status(200).json({success:true,result})
    })
})
router.post('/addLikeUser',(req,res)=>{
    Product.findOneAndUpdate({_id:req.body.productId},
        {$push:{likeUser:req.body.user},$pull:{disLikeUser:req.body.user}})
        .exec((err,result)=>{
            if(err) res.json({success:false,err})
            Product.find({_id:req.body.productId})
            .populate('writer')
            .exec((err,product)=>{
                if(err) res.json({success:false,err})
                res.status(200).json({sueccess:true,product})
               // console.log(product);
               // console.log(typeof product)
            })
        })
        
    })

    router.post('/subLikeUser',(req,res)=>{
        Product.findOneAndUpdate({_id:req.body.productId},
            {$pull:{likeUser:req.body.user}})
            .exec((err,result)=>{
                if(err) res.json({success:false,err})
                Product.find({_id:req.body.productId})
                .populate('writer')
                .exec((err,product)=>{
                    if(err) res.json({success:false,err})
                    res.status(200).json({sueccess:true,product})
                })
            })
            
        })
    router.post('/addDisLikeUser',(req,res)=>{
         Product.findOneAndUpdate({_id:req.body.productId},
            {$push:{disLikeUser:req.body.user},$pull:{likeUser:req.body.user}})
            .exec((err,result)=>{
                 if(err) res.json({success:false,err})
                 Product.find({_id:req.body.productId})
                 .populate('writer')
                 .exec((err,product)=>{
                       if(err) res.json({success:false,err})
                       res.status(200).json({sueccess:true,product})
                })
                })
                
            })
            router.post('/subDisLikeUser',(req,res)=>{
                Product.findOneAndUpdate({_id:req.body.productId},
                    {$pull:{disLikeUser:req.body.user}})
                    .exec((err,result)=>{
                        if(err) res.json({success:false,err})
                        Product.find({_id:req.body.productId})
                        .populate('writer')
                        .exec((err,product)=>{
                            if(err) res.json({success:false,err})
                            res.status(200).json({sueccess:true,product})
                        })
                    })
                    
                })
            
router.post('/getUserFavorite',(req,res)=>{

    let findArgs = {};
    for(let key in req.body.filters){
        if(req.body.filters[key]===null)
        return

        if(key ==='likeUser'){
            findArgs[key]=req.body.filters[key]
        }
        
    }
    const findLike = {likeUser:{$in:[`${req.body.user}`]}}
    const findDislike = {disLikeUser:{$in:[`${req.body.user}`]}}
    const find ={   likeUser:{$in:[`${req.body.user}`]} , disLikeUser:{$in:[`${req.body.user}`]}  }
     //console.log(findLike)
    // let likeProducts = [];
     Product.find(findLike)
     .populate('writer')
     .exec((err,likeProducts)=>{
        // console.log('like',likeProducts)
         if(err) return res.json({success:false,err})
         
        
         Product.find(findDislike)
         .populate('writer')
         .exec((err,disLikeProducts )=>{
            // console.log('likeProducts',likeProducts)
             //console.log('dislike',disLikeProducts)
             if(err) return res.json({success:false,err})
     
              res.json({success:true,likeProducts,disLikeProducts})
         })
         
        // res.json({success:true,likeProducts})
           
     })
        
        
        
   
        
   /* Product.find(findLike)
    .populate('writer')
    .exec((err,likeProducts)=>{
        if(err) res.json({success:false,err})
        res.json({success:true,likeProducts})
        //console.log(products)
    })
    */
 /* Product.find(findDislike)
    .populate('writer')
    .exec((err,disLikeProducts)=>{
        if(err) res.json({success:false,err})
        res.json({success:true,disLikeProducts})
    })
*/
})

router.get('/getUserCartItem',auth,(req,res)=>{
    
    let productIds = req.query.productIds;
    let type = req.query.type;

    if(type==='array'){
        let ids = req.query.productIds.split(',');
        productIds=[];
        productIds=ids.map(id => id);
    }
    Product.find({_id:{$in:productIds}})
    .populate('writer')
    .exec((err,product)=>{
        if(err) res.status(400).send(err)
        res.status(200).send(product)
    })
})


module.exports = router;
