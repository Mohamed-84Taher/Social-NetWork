import React,{Fragment} from 'react'
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {logout} from '../../redux/actions/auth'

function Navbar() {

  const auth=useSelector(state=>state.auth)

  const dispatch=useDispatch()
  const authLinks=(
    <ul>
        <li>
      <Link to='/dashboard'>
        <i className="fas fa-user" />{' '}
        <span className="hide-sm">Dashboard</span>
      </Link>
    </li>
    <li>
      <Link to="/posts">Posts</Link>
    </li>
        <li>
        <Link onClick={()=>dispatch(logout())} to='/'>
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  )
  const guestLinks=(
    <ul>
    <li>
      <Link to="/register">register</Link>
    </li>
    <li>
      <Link to="/login">login</Link>
    </li>
    <li>
      <Link to='/dashboard'>
        <i className="fas fa-user" />{' '}
        <span className="hide-sm">Dashboard</span>
      </Link>
    </li>
  </ul>
  )
    return (
        <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
          <i class="fas fa-chart-network"></i>Social Network
          </Link>
        </h1>
     {
        !auth.loading&&(<Fragment>{auth.isAuthenticated ? authLinks:guestLinks}</Fragment>)
     }
      </nav>
    )
}

export default Navbar
