import {useState} from 'react'
import axios from 'axios'



function DataFetching(ruta){
    const [posts, setPosts] = useState([])

    axios.get(ruta)
    .then(res=>{
        setPosts(res.data)
    })
    .catch(err=>{
        console.log(err)
    })

    return(posts)
}


function DataPost(ruta, data) {
    axios.post(ruta, data)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })
}

export { DataFetching, DataPost }