import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import axios from 'axios';
function UpdateModal(props){
 const fullpath="http://image.tmdb.org/t/p/w500/";
    const updateMovie = async (event)=>{
        event.preventDefault();
        const obj={
            title:props.clickedMovie.title,
            comment:event.target.comment.value,
            overview : props.clickedMovie.overview,
            poster_path:props.clickedMovie.poster_path
            
        }
        const serverURL = `${process.env.REACT_APP_serverURL}/udateMoveiFavorite/${props.clickedMovie.id}`;
        const res = await axios.put(serverURL,obj);
        console.log('UPDATED SUCCESSFULLY',res.data);
        props.closeUpdModal();

        props.getNewDataUpdated(res.data)
    }
    return(
      
        <>
         
          <Modal show={props.updateModalll} onHide={props.closeUpdModal} >
                <Modal.Header closeButton>
                    <Modal.Title>{props.clickedMovie.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={updateMovie}>
                        {/* <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" type="text" defaultValue={props.clickedMovie.title}/>
                        </Form.Group> */}
                        <Form.Group className="mb-3">
                            <Form.Label>Updeated Comment</Form.Label>
                            <Form.Control name="comment" type="text" defaultValue={props.clickedMovie.comment}/>
                        </Form.Group>
                        {/* <Form.Group className="mb-3">
                            <Form.Label>Overview</Form.Label>
                            <Form.Control name="over" type="text" defaultValue={props.clickedMovie.overview}/>
                        </Form.Group> */}
                     
                          

                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.closeUpdModal}>
                        Close
                    </Button>
                    <Button variant="primary" >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
           
        </>
    )
}
export default UpdateModal;