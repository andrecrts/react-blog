import React, { component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const AHeader = (props) => {
    return (
        <nav>
            <Link to='/'> home </Link>
            <Link to={`/${props.user.id}/posts`}> Mis posts </Link>
            <Link to='/' onClick={props.logout}> Logout </Link>
        </nav>
    )

}

const mapStateToProps = (state) => {
    return {
        user: state.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch({type:'LOGOUT'})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AHeader)
