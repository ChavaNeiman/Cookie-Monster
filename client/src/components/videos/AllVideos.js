import React, {useEffect, useState} from 'react'
import { getItems } from '../../service/ProductService';
import PlayVideo from './PlayVideo';

export default function AllVideos() {
    const [allVideos, setAllVideos] = useState([]);

    useEffect(() => {
        async function getVideos(){
            let videos = await getItems("videos/all");
            setAllVideos(videos);
        }
        getVideos();
    }, [])
    return (
        <div className="container">
            <h1><b>Videos</b></h1>
        {allVideos!==[]?<div className="row g-4">
           {Object.keys(allVideos).map(index=>{
               return(
               <div key={index} className="col-6">
                   <PlayVideo url={allVideos[index].url} id={allVideos[index].id}/>
               </div>)
           })} 
           </div>:            
           <div class="lds-facebook"><div></div><div></div><div></div></div>}

        </div>
    )
}
