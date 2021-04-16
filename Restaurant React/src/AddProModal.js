import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddProModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'produktet',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Emri:event.target.Emri.value,
                Kodi:event.target.Kodi.value,
                Sasia:event.target.Sasia.value,
                Qmimi:event.target.Qmimi.value,
                DataSkadimit:event.target.DataSkadimit.value,
                Menaxhimi:event.target.Menaxhimi.value
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
            Regjistro Produktin
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="Emri">
                        <Form.Label>Emri</Form.Label>
                        <Form.Control type="text" name="Emri" required 
                        placeholder="Emri"/>
                    </Form.Group>

                    <Form.Group controlId="Kodi">
                        <Form.Label>Kodi</Form.Label>
                        <Form.Control type="text" name="Kodi" required 
                        placeholder="Kodi"/>
                    </Form.Group>

                    <Form.Group controlId="Sasia">
                        <Form.Label>Sasia</Form.Label>
                        <Form.Control type="text" name="Sasia" required 
                        placeholder="Sasia"/>
                    </Form.Group>

                    <Form.Group controlId="Qmimi">
                        <Form.Label>Qmimi</Form.Label>
                        <Form.Control type="text" name="Qmimi" required 
                        placeholder="Qmimi"/>
                    </Form.Group>

                    <Form.Group controlId="DataSkadimit">
                        <Form.Label>Afati Kohor</Form.Label>
                        <Form.Control type="date" name="DataSkadimit" required 
                        placeholder="Afati Kohor"/>
                    </Form.Group>


                    <Form.Group controlId="Menaxhimi">
                        <Form.Label>Menaxhimi</Form.Label>
                        <Form.Control type="text" name="Menaxhimi" required 
                        placeholder="Menaxhimi"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                        Regjistro Produktin
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