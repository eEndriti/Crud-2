import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditProModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'produktet',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                produktetId:event.target.produktetId.value,
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
            Modifiko Produktin
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>

                <Form.Group controlId="produktetId">
                        <Form.Label>ID e Produktit</Form.Label>
                        <Form.Control type="text" name="produktetId" required 
                        defaultValue={this.props.proid} disabled/>
                    </Form.Group>


                    <Form.Group controlId="Emri">
                        <Form.Label>Emri</Form.Label>
                        <Form.Control type="text" name="Emri" required 
                        defaultValue={this.props.proemri}/>
                        </Form.Group>

                  <Form.Group controlId="Kodi">
                        <Form.Label>Kodi</Form.Label>
                        <Form.Control type="text" name="Kodi" required 
                        defaultValue={this.props.prokodi}/>
                        </Form.Group>

                    <Form.Group controlId="Sasia">
                        <Form.Label>Sasia</Form.Label>
                        <Form.Control type="text" name="Sasia" required 
                        defaultValue={this.props.prosasia}/>
                        </Form.Group>

                    <Form.Group controlId="Qmimi">
                        <Form.Label>Qmimi</Form.Label>
                        <Form.Control type="text" name="Qmimi" required 
                        defaultValue={this.props.proqmimi}/>
                        </Form.Group>

                    <Form.Group controlId="DataSkadimit">
                        <Form.Label>Afati Kohor</Form.Label>
                        <Form.Control type="date" name="Afati Kohor" required 
                        defaultValue={this.props.prodatas}/>
                        </Form.Group>


                    <Form.Group controlId="Menaxhimi">
                        <Form.Label>Menaxhimi</Form.Label>
                        <Form.Control type="text" name="Menaxhimi" required 
                        defaultValue={this.props.promenaxhimi}/>
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