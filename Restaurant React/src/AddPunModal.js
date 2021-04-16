import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddPunModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'puntoret',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmriMbiemri:event.target.EmriMbiemri.value,
                Mosha:event.target.Mosha.value,
                Vendbanimi:event.target.Vendbanimi.value,
                DataPranimit:event.target.DataPranimit.value,
                Rroga:event.target.Rroga.value,
                Titulli:event.target.Titulli.value,
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
            Regjistro Puntorin
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="EmriMbiemri">
                        <Form.Label>Emri dhe Mbiemri</Form.Label>
                        <Form.Control type="text" name="EmriMbiemri" required 
                        placeholder="Emri dhe Mbiemri"/>
                    </Form.Group>

                    <Form.Group controlId="Mosha">
                        <Form.Label>Mosha</Form.Label>
                        <Form.Control type="text" name="Mosha" required 
                        placeholder="Mosha"/>
                    </Form.Group>

                    <Form.Group controlId="Vendbanimi">
                        <Form.Label>Vendbanimi</Form.Label>
                        <Form.Control type="text" name="Vendbanimi" required 
                        placeholder="Vendbanimi"/>
                    </Form.Group>

                    <Form.Group controlId="DataPranimit">
                        <Form.Label>DataPranimit</Form.Label>
                        <Form.Control type="date" name="DataPranimit" required 
                        placeholder="DataPranimit"/>
                    </Form.Group>

                    <Form.Group controlId="Rroga">
                        <Form.Label>Rroga</Form.Label>
                        <Form.Control type="text" name="Rroga" required 
                        placeholder="Rroga"/>
                    </Form.Group>


                    <Form.Group controlId="Titulli">
                        <Form.Label>Titulli</Form.Label>
                        <Form.Control type="text" name="Titulli" required 
                        placeholder="Titulli"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                        Regjistro Puntorin
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