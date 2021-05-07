import React,{useState,useEffect} from 'react'
import './Puzzle.css';
import {imageArray} from './ImageData';

const Puzzle = () => {
    const tileCount = 16;
    const [tiles,setTiles]=useState([]);
    const [dragItem,setDragItem]=useState({el:null,class:null,index:null});
    const [playing,setPlaying]=useState(false);
    const [endGame,setEndGame]=useState(false);

    useEffect(()=>{
         createPuzzle();
    },[])
    

    const createPuzzle = ()=>{
        setPlaying(true);
        setEndGame(false);
        const temp =[];
        const imageLength = imageArray.length -1;
        const random = Math.floor(Math.random()*(imageLength+1));
        Array(tileCount).fill().forEach((_,index)=>{
            
            const tile = <li style={{backgroundImage:`url(${imageArray[random]})`}} draggable={true} key={index} className={`list${index}`} data={index}></li>
            temp.push(tile)
        })
        setTiles([...temp]);
    }
    const shuffle =(array)=>{

        let index = array.length -1;
        while(index > 0){
            const random = Math.floor(Math.random()*(index+1));
            [array[index],array[random]]=[array[random],array[index]];
            index--;
        }
        return array;

    }
    const gameStart =()=>{
        if(playing){
            const temp = shuffle(tiles);
            setTiles([...temp]);
        }
        else{
            createPuzzle();
        }
        
    }
    const onDragStart = (e)=>{
        if(!playing) return;
        const object = e.target;
        let temp = {...dragItem};
        temp['el']=object;
        temp['class']=object.className;

        setDragItem(temp)
    }
    const onDragOver = (e)=>{
        e.preventDefault();
    }
    const onDrop =(e)=>{
        if(!playing) return;
        const object = e.target;
        
        if(dragItem.class !== object.className){
            let temp = [...tiles];
            let dragIndex = temp.map(tile=>tile.props.className).indexOf(dragItem.class);
            let dropIndex = temp.map(tile=>tile.props.className).indexOf(object.className);
            [temp[dragIndex],temp[dropIndex]] = [temp[dropIndex],temp[dragIndex]];

            setTiles(temp);
            checkStatus(temp);
        }
        
    }
    const checkStatus = (array)=>{
        const currentList = [...array];
        const unMatchedList = currentList.filter((child,index)=>
           Number(child.key) !== index
        )
        if(unMatchedList.length === 0){
            //gameOver
            setPlaying(false);
            setEndGame(true);
        }
    }

    
    
    return (
        <div className="wrap-all">
            <p className="play-time">0</p>
            <ul className="img-container"  onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop}>
              {tiles.map(tile=>tile)}
            </ul>
            <button onClick={gameStart} className="start-button">{endGame ? '다시하기' : '시작하기'}</button>
            <p style={endGame ? {display:'block'}:{display:'none'}}className="game-text">Complete</p>
            
        </div>
    )
}

export default Puzzle
