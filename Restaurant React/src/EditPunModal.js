import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditPunModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'puntoret',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                puntoretId:event.target.puntoretId.value,
                EmriMbiemri:event.target.EmriMbiemri.value,
                Mosha:event.target.Mosha.value,
                Vendbanimi:event.target.Vendbanimi.value,
                DataPranimit:event.target.DataPranimit.value,
                Rroga:event.target.Rroga.value,
                Titulli:event.target.Titulli.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }
    render(){
        return (
            <div className="container">

<Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Modifiko Puntorin
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>

                <Form.Group controlId="puntoretId">
                        <Form.Label>ID e Puntorit</Form.Label>
                        <Form.Control type="text" name="puntoretId" required 
                        defaultValue={this.props.punid} disabled/>
                    </Form.Group>


                    <Form.Group controlId="EmriMbiemri">
                        <Form.Label>Emri dhe Mbiemri</Form.Label>
                        <Form.Control type="text" name="EmriMbiemri" required 
                        defaultValue={this.props.punemri}/>
                        </Form.Group>

                  <Form.Group controlId="Mosha">
                        <Form.Label>Mosha</Form.Label>
                        <Form.Control type="text" name="Mosha" required 
                        defaultValue={this.props.punmosha}/>
                        </Form.Group>

                    <Form.Group controlId="Vendbanimi">
                        <Form.Label>Vendbanimi</Form.Label>
                        <Form.Control type="text" name="Vendbanimi" required 
                        defaultValue={this.props.punvendbanimi}/>
                        </Form.Group>

                    <Form.Group controlId="DataPranimit">
                        <Form.Label>DataPranimit</Form.Label>
                        <Form.Control type="date" name="DataPranimit" required 
                        defaultValue={this.props.pundatap}/>
                        </Form.Group>

                    <Form.Group controlId="Rroga">
                        <Form.Label>Rroga</Form.Label>
                        <Form.Control type="text" name="Rroga" required 
                        defaultValue={this.props.punrroga}/>
                        </Form.Group>


                    <Form.Group controlId="Titulli">
                        <Form.Label>Titulli</Form.Label>
                        <Form.Control type="text" name="Titulli" required 
                        defaultValue={this.props.puntitulli}/>
                        </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                        Modifiko Puntorin
                        </Button>
        </Form.Group>
                </Form>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}