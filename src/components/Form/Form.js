import React,{useState, useEffect} from 'react';

import './Form.scss';

export default function Form(props){

  const { setType } = props;
  const[data,setData] = useState([]);
  const[loading,setLoading] = useState(true);
  const[error,setError] = useState(null);
  var type; 

  useEffect(()=>{
    fetch("https://pokeapi.co/api/v2/type")
    .then(response => response.json())
    .then(data=>{
        setData(data);
        setLoading(false);
        setError(false);
    })
    .catch(err=>{
        setLoading(false);
        setError(err);
    })
  },[])

  const onChange = (e)=>{
     type = e.target.value;
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        setType(type);
    }
return(
    <div className="form">
        <form onSubmit={onSubmit} > 
            <div>
                <label htmlFor="type">Filtra por tipo: </label>
                <select onChange={onChange}>
                    <option defaultValue={type} >--</option>
                    {!loading ?
                        data.results.map((type,index)=>{
                            return <option key={index} value={type.name}>{type.name}</option>
                        }) : <option>Loading</option>
                    }
                </select>
            </div>
            <div>
                <button type="submit">Buscar</button>   
            </div>
        </form>
    </div>
)
}