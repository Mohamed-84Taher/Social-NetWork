import React,{Fragment,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getPosts } from '../../redux/actions/post'

function Posts() {
const dispatch = useDispatch()
    useEffect(()=>{
 dispatch(getPosts())
    }
    ,[])
    const posts = useSelector(state => state.post.posts)
    const loading=useSelector(state => state.post.loading)
    return (
       <div>
            {
                loading ? <h2>Loading...</h2>
                :<Fragment>
                 <h3>posts</h3>
                </Fragment>
            }
            
            </div>
    )
}

export default Posts
