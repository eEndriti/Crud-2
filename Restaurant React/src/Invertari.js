import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddInvModal} from './AddInvModal';
import {EditInvModal} from './EditInvModal';


export class Invertari extends Component{

        constructor(props){
            super(props);
            this.state={inve:[],addModalShow:false,editModalShow:false}
        }
        refreshList(){
            fetch(process.env.REACT_APP_API+'invertari')
            .then(response=>response.json())
            .then(data=>{
                this.setState({inve:data});
            });
        }
        componentDidMount(){
            this.refreshList();
        }
        componentDidUpdate(){
            this.refreshList();
        }
        deleteInv(invid){
            if(window.confirm('A jeni i sigurtë?')){
                fetch(process.env.REACT_APP_API+'invertari/'+invid,{
                    method:'DELETE',
                    header:{'Accept':'application/json',
                'Content-Type':'application/json'}
                })
            }
        }
    render(){
        const {inve,invid,invemri,invkodi,invsasia,invpershkrimi}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
                return(
            <div>
                <Table className="mt-4 text-dark bg-light " striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID e Produktit</th>
                            <th>Emri</th>
                            <th>Kodi</th>
                            <th>Sasia</th>
                            <th>Pershkrimi</th>
                            <th>Opsionet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inve.map(inv=>
                            <tr key={inv.invertariId}>
                                <td>{inv.invertariId}</td>
                                <td>{inv.Emri}</td>
                                <td>{inv.Kodi}</td>
                                <td>{inv.Sasia}</td>
                                <td>{inv.Pershkrimi}</td>
                                <td>
                                <ButtonToolbar>
                                    <Button className="mr-2 bg-secondary" 
                                        onClick={()=>this.setState({editModalShow:true,
                                            invid:inv.invertariId,invemri:inv.Emri,invkodi:inv.Kodi,
                                            invsasia:inv.Sasia,invpershkrimi:inv.Pershkrimi})}>
                                                Modifiko
                                    </Button>

                                    <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteInv(inv.invertariId)}>
                                            Fshij
                                    </Button>

                                        <EditInvModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            invid={invid}
                                            invemri={invemri}
                                            invkodi={invkodi}
                                            invsasia={invsasia}
                                            invpershkrimi={invpershkrimi}
                                            />
                                </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Shto ne Invertar</Button>

                    <AddInvModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}