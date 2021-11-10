import React,{useState,Fragment} from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import PropTypes from 'prop-types'
import {Link,Redirect} from 'react-router-dom'
import { login } from '../../redux/actions/auth';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
    
      const { email, password } = formData;

      const isAuthenticated=useSelector(state=>state.auth.isAuthenticated)

      const dispatch = useDispatch()
    
      const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
      const onSubmit = e => {
        e.preventDefault();
        dispatch(login({email, password}));
      };
    
      if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
      }
    
      return (
        <Fragment>
          <h1 className="large text-primary">Sign In</h1>
          <p className="lead">
            <i className="fas fa-user" /> Sign Into Your Account
          </p>
          <form className="form" onSubmit={onSubmit} >
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                minLength="6"
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
          </form>
          <p className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </Fragment>
      );
    };
    
    // Login.propTypes = {
    //   login: PropTypes.func.isRequired,
    //   isAuthenticated: PropTypes.bool
    // };

export default Login
