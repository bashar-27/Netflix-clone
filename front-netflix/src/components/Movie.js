import {Button} from "react-bootstrap";
import { Card } from "react-bootstrap";
import axios from "axios";
function Movie(props){
    const fullpath="http://image.tmdb.org/t/p/w500/";

    const addToFav = (item) =>{
        const serverURL = `http://localhost:3005/addMovie`;
        console.log(item);
        axios.post(serverURL , item )
        .then(response=>{
            console.log(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
        // console.log(item)
    }
return(
    <>
      {/* <button onClick={getAllMemes}>Send a req</button> */}

            {props.displayCard.map(item => {
                return (
                    <Card style={{ width: '18rem' }} key={item.id}>
                        <Card.Img variant="top" src={fullpath+item.poster_path} />
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                               <p>{item.overview}</p>
                            </Card.Text>
                            <Button variant="primary" onClick={()=>{addToFav(item)}}>Add to Favorite</Button>
                        </Card.Body>
                    </Card>
                )
            })}
    </>
)
}

export default Movie;