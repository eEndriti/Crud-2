import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddPunModal} from './AddPunModal';
import {EditPunModal} from './EditPunModal';


export class Puntoret extends Component{

        constructor(props){
            super(props);
            this.state={punt:[],addModalShow:false,editModalShow:false}
        }
        refreshList(){
            fetch(process.env.REACT_APP_API+'puntoret')
            .then(response=>response.json())
            .then(data=>{
                this.setState({punt:data});
            });
        }
        componentDidMount(){
            this.refreshList();
        }
        componentDidUpdate(){
            this.refreshList();
        }
        deletePun(punid){
            if(window.confirm('A jeni i sigurtë?')){
                fetch(process.env.REACT_APP_API+'puntoret/'+punid,{
                    method:'DELETE',
                    header:{'Accept':'application/json',
                'Content-Type':'application/json'}
                })
            }
        }
    render(){
        const {punt,punid,punemri,punmosha,punvendbanimi,pundatap,punrroga,puntitulli}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4 text-dark bg-light " striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID e Puntorit</th>
                            <th>Emri Mbiemri</th>
                            <th>Mosha</th>
                            <th>Vendbanimi</th>
                            <th>Data e Pranimit</th>
                            <th>Rroga</th>
                            <th>Titulli</th>
                            <th>Opsionet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {punt.map(pun=>
                            <tr key={pun.puntoretId}>
                                <td>{pun.puntoretId}</td>
                                <td>{pun.EmriMbiemri}</td>
                                <td>{pun.Mosha}</td>
                                <td>{pun.Vendbanimi}</td>
                                <td>{pun.DataPranimit}</td>
                                <td>{pun.Rroga}€</td>
                                <td>{pun.Titulli}</td>
                                <td>
                                <ButtonToolbar>
                                    <Button className="mr-2 bg-secondary" 
                                        onClick={()=>this.setState({editModalShow:true,
                                            punid:pun.puntoretId,punemri:pun.EmriMbiemri,punmosha:pun.Mosha,
                                            punvendbanimi:pun.Vendbanimi,pundatap:pun.DataPranimit,
                                            punrroga:pun.Rroga,puntitulli:pun.Titulli})}>
                                                Modifiko
                                    </Button>

                                    <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deletePun(pun.puntoretId)}>
                                            Fshij
                                    </Button>

                                        <EditPunModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            punid={punid}
                                            punemri={punemri}
                                            punmosha={punmosha}
                                            punvendbanimi={punvendbanimi}
                                            pundatap={pundatap}
                                            punrroga={punrroga}
                                            puntitulli={puntitulli}
                                            />
                                </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Regjistro Puntorin</Button>

                    <AddPunModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}