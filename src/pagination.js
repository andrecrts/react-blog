import React, { Component } from 'react'
import {connect} from 'react-redux'
import Axios from 'axios'

class Pagination extends Component {

    componentDidMount() {
        this.props.setTotal()
    }
    paginas = () => {
        let posts = this.props.pagina.total
        let total = Math.ceil(posts/3)

        let init = 1
        let end = 10

        if(total <= 10){
            end = total
        } else if(total > 10) {
           //Final
           if(this.props.pagina.current >= total -4){
            init  = total -9
            end = total
           }

          //Inicio
          else if(this.props.pagina.current -4 <= 0){
            init = 1
            end = 10
          }

          else{
            init = this.props.pagina.current -4
            end = this.props.pagina.current + 5
          }
        }

        var barra = () => {
            let lista = []
            for(var i = init; i <= end; i ++){
                lista = lista.concat(
                    <th key={i} onClick={(e) => {
                        this.props.setCurrent(parseInt(e.target.innerHTML))
                    }}>
                        {i}
                    </th>
                )
            }
            return lista

        }
        return(
            <div>
                <table>
                    <tbody>
                        <tr>
                            {barra()}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
    render () {
        return (
            <div>
                <h4>Paginacion</h4>
                {this.paginas()}
                <br/>
                {this.props.pagina.current}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pagina: state.pagination
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTotal: () => {
            Axios.get('https://blog-api-u.herokuapp.com/v1/totalposts')
                .then((response) => dispatch({type:'SET_TOTAL', total:parseInt(response.data)}))
                .catch((error) => console.log(error))
        },
        setCurrent: (e) => {
            dispatch({type:'SET_CURRENT', page: e})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Pagination)
