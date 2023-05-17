import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

function ModalMovie(props) {
  const fullpath = "http://image.tmdb.org/t/p/w500/";

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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalMovie;
