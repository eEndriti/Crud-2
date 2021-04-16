import logo from './logo.svg';
import './App.css';

import {Puntoret} from './Puntoret';
import {Produktet} from './Produktet';
import {Invertari} from './Invertari';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
     <Navigation/>
     <Switch>
       <Route path='/puntoret' component={Puntoret}/>
       <Route path='/produktet' component={Produktet}/>
       <Route path='/invertari' component={Invertari}/>

     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;