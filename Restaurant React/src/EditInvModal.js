import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditInvModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'invertari',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                invertariId:event.target.invertariId.value,
                Emri:event.target.Emri.value,
                Kodi:event.target.Kodi.value,
                Sasia:event.target.Sasia.value,
                Pershkrimi:event.target.Pershkrimi.value
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
            Modifiko Produktin
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>

                <Form.Group controlId="invertariId">
                        <Form.Label>ID e Produktit</Form.Label>
                        <Form.Control type="text" name="Numri Rendor" required 
                        defaultValue={this.props.invid} disabled/>
                    </Form.Group>

                    <Form.Group controlId="Emri">
                        <Form.Label>Emri</Form.Label>
                        <Form.Control type="text" name="Emri" required 
                        defaultValue={this.props.invemri}/>
                    </Form.Group>

                    <Form.Group controlId="Kodi">
                        <Form.Label>Kodi</Form.Label>
                        <Form.Control type="text" name="Kodi" required 
                        defaultValue={this.props.invkodi}/>
                    </Form.Group>

                    <Form.Group controlId="Sasia">
                        <Form.Label>Sasia</Form.Label>
                        <Form.Control type="text" name="Sasia" required 
                        defaultValue={this.props.invsasia}/>
                    </Form.Group>

                    <Form.Group controlId="Pershkrimi">
                        <Form.Label>Pershkrimi</Form.Label>
                        <Form.Control type="text" name="Pershkrimi" required 
                        defaultValue={this.props.invpershkrimi}/>
                    </Form.Group>


                    <Form.Group>
                        <Button variant="primary" type="submit">
                        Modifiko Produktin
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