import React,{useEffect,useState} from 'react';

import './Grid.scss';


export default function Grid(props){

    const {type} = props;
 
    const [data,setData]= useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
   
    const allInfo = [];
    useEffect(()=>{
        fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
        .then(response => response.json())
        .then(data=>{
            console.log(data)
            data.results.map(item=>{
                fetch(item.url)
                .then(response => response.json())
                .then(data=>{
                    allInfo.push(data)
                    setData(allInfo);
                    setLoading(false);
                    setError(false);
                })
                .catch(err=>{
                    setLoading(false);
                    setError(err);
                })
            })
        })
      
        
    },[])

    return(
    <div className="grid">
        {
            loading ?
            <p>Loading</p>

            :
                    data.map((item,index)=>{
                     return  item.types.map(i=>{
                            if(i.type.name == type){
                                  return <div key={index} className="grid__card">
                                    <div className="grid__card-info">
                                        <p>{item.name}</p>
                                        <p>{i.type.name}</p>
                                    </div>
                                    <div className="grid__card-img">
                                        <img src={`https://pokeres.bastionbot.org/images/pokemon/${item.id}.png`} alt="pokemon" />
                                    </div>
                               </div>
                        
                            }
                        })
                   
                 
                    }) 


        }

    </div>      
    )
}