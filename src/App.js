import React, {Component, Fragment} from 'react';


import Header from './componentes/Header'
import Productos from './componentes/Productos'
import NuevoProducto from './componentes/NuevoProducto'
import EditarProducto from './componentes/EditarProducto'

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
//Redux
import {Provider} from 'react-redux'
import store from './store'

class App extends Component {
    render() {
        return (

            <Provider store={store}>
                <Router>
                    <Fragment>
                        <Header/>
                        <div className="container">
                            <Switch>
                                <Route exact path="/" component={Productos}/>
                                <Route exact path="/producto/nuevo" component={NuevoProducto}/>
                                <Route exact path="/producto/editar/:id" component={EditarProducto}/>
                            </Switch>
                        </div>
                    </Fragment>
                </Router>
            </Provider>
        );
    }
}

export default App;
