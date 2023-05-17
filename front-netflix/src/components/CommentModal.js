import {Modal,Button,Image,Form} from "react-bootstrap";
import axios from 'axios';

function CommentModal(props){
    const fullpath = "http://image.tmdb.org/t/p/w500/";

    // const updateMovie = async (event)=>{
    //     event.preventDefault();
    //     const obj={
    //               comment:event.target.comment.value,          
    //     }
    //     const serverURL = `http://localhost:3005/udateMoveiFavorite/${props.clickedMovie.id}`;
    //     const res = await axios.put(serverURL,obj);
    //     console.log('UPDATED SUCCESSFULLY',res.data);
    //     props.handleClose();

    //     props.getNewDataUpdated(res.data)
    // }

  return (
    <>
      <Modal show={props.showFlag} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.clickedMovie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            src={fullpath + props.clickedMovie.poster_path}
            width="100%"height="400px"
          ></Image>
          {props.clickedMovie.overview}
          <Form >
                       
                        <Form.Group className="mb-3">
                            <Form.Label>Updeated Comment</Form.Label>
                            <Form.Control name="comment" type="text" defaultValue={props.clickedMovie.comment}/>
                        </Form.Group>
                        
                          

                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default CommentModal;