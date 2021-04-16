import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddProModal} from './AddProModal';
import {EditProModal} from './EditProModal';

export class Produktet extends Component{

        constructor(props){
            super(props);
            this.state={prod:[],addModalShow:false,editModalShow:false}
        }
        refreshList(){
            fetch(process.env.REACT_APP_API+'produktet')
            .then(response=>response.json())
            .then(data=>{
                this.setState({prod:data});
            });
        }
        componentDidMount(){
            this.refreshList();
        }
        componentDidUpdate(){
            this.refreshList();
        }
        deletePro(proid){
            if(window.confirm('A jeni i sigurtë?')){
                fetch(process.env.REACT_APP_API+'produktet/'+proid,{
                    method:'DELETE',
                    header:{'Accept':'application/json',
                'Content-Type':'application/json'}
                })
            }
        }
    render(){
        const {prod,proid,proemri,prokodi,prosasia,proqmimi,prodatas,promenaxhimi}=this.state;
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
                            <th>Qmimi</th>
                            <th>DataSkadimit</th>
                            <th>Menaxhimi</th>
                            <th>Opsionet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prod.map(pro=>
                            <tr key={pro.produktetId}>
                                <td>{pro.produktetId}</td>
                                <td>{pro.Emri}</td>
                                <td>{pro.Kodi}</td>
                                <td>{pro.Sasia}</td>
                                <td>{pro.Qmimi}€</td>
                                <td>{pro.DataSkadimit}</td>
                                <td>{pro.Menaxhimi}</td>
                                <td>
                                <ButtonToolbar>
                                    <Button className="mr-2 bg-secondary" 
                                        onClick={()=>this.setState({editModalShow:true,
                                            proid:pro.produktetId,proemri:pro.Emri,prokodi:pro.Kodi,
                                            prosasia:pro.Sasia,proqmimi:pro.Qmimi,
                                            prodatas:pro.DataSkadimit,promenaxhimi:pro.Menaxhimi})}>
                                                Modifiko
                                    </Button>

                                    <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deletePro(pro.produktetId)}>
                                            Fshij
                                    </Button>

                                        <EditProModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            proid={proid}
                                            proemri={proemri}
                                            prokodi={prokodi}
                                            prosasia={prosasia}
                                            proqmimi={proqmimi}
                                            prodatas={prodatas}
                                            promenaxhimi={promenaxhimi}
                                            />
                                </ButtonToolbar>

                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Regjistro Produktin</Button>

                    <AddProModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>

            </div>
        )
    }
}