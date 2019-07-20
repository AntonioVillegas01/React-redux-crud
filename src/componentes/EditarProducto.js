import React, {Component} from 'react';

//redux
import {connect} from 'react-redux'
import { mostrarProducto, editarProducto } from "../actions/productosActions";

class EditarProducto extends Component {

    state = {
        nombre: '',
        precio: '',
        error: false
    };

    componentDidMount() {
        const {id} = this.props.match.params;

        this.props.mostrarProducto(id);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const { nombre, precio } = nextProps.producto;
        this.setState({
            nombre,
            precio
        })
    }

    nombreProducto = (e) => {
        this.setState({
            nombre: e.target.value
        })
    };

    precioProducto = (e) => {
        this.setState({
            precio: e.target.value
        })

    };

    actualizarProducto = e => {
        e.preventDefault();

        const {nombre, precio} = this.state;

        if (nombre === '' || precio === '') {
            this.setState({error: true});
            return;
        }
        this.setState({error:false});

        //tomar el id
        const {id} = this.props.match.params;

        //crear el objeto
        const infoProducto = {
            id,
            nombre,
            precio
        }
        //console.log(infoProducto);

        //Actualizar el producto actual
        this.props.editarProducto(infoProducto);


        //redireccionar
        this.props.history.push('/')

    };

    render() {
        const {error,nombre,precio} = this.state
        return (
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Editar Producto</h2>
                            <form onSubmit={this.actualizarProducto}>
                                <div className="form-group">
                                    <label>Titulo</label>
                                    <input onChange={this.nombreProducto} type="text" className="form-control"
                                           placeholder="Titulo" defaultValue={nombre}/>
                                </div>
                                <div className="form-group">
                                    <label>Precio del Producto</label>
                                    <input onChange={this.precioProducto} type="text" className="form-control"
                                           placeholder="Precio" defaultValue={precio}/>
                                </div>
                                <button type="submit"
                                        className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Guardar Cambios
                                </button>
                            </form>
                            {error ?
                                <div className="font-weight-bold alert alert-danger text-center mt-4">Todos los campos
                                    son obligatorios</div>
                                : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//state
const mapStateToProps = state => ({
    producto: state.productos.producto
})

export default connect(mapStateToProps, {mostrarProducto,editarProducto}) (EditarProducto) ;
