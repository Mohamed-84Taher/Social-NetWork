import React,{Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'
import DashboardActions from './DashboardActions'
import {useDispatch,useSelector} from 'react-redux'
import { getCurrentProfile,deleteAccount } from '../../redux/actions/profile'
import Experience from './Experience'
import Education from './Education'


function Dashboard() {

    const {profile,loading} = useSelector(state => state.profile)
    const user=useSelector(state=>state.auth.user)
const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getCurrentProfile())
    },[])
    return loading&&profile===null ? <h2>Loading....</h2>:<Fragment>
       <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {
          profile!==null ? 
          <Fragment>
            <DashboardActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div className="my-2">
            <button className="btn btn-danger" onClick={() => dispatch(deleteAccount())}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
          </Fragment>:
          <Fragment>
                <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
          </Fragment>
      }
    </Fragment>
    
}

export default Dashboard
