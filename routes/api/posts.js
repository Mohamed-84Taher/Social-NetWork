const express=require('express')
const router=express.Router()
const {check,validationResult}=require('express-validator')
const auth=require('../../middleware/auth')
const User=require('../../models/User')
const Post=require('../../models/Post')
const Profile=require('../../models/Profile')

// @route post /api/posts
// @desc add a post
//@ access private
router.post('/',[auth,[
    check('text','Text is required').not().isEmpty()
]],async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
try {
    const user=await User.findById(req.user.id)
    const newPost=new Post({
        text:req.body.text,
        user:req.user.id,
        name:user.name,
        avatar:user.avatar
    })
    await newPost.save()

    res.json(newPost)
} catch (error) {
    console.error(error.message)
    res.status(500).send("Server error")
}
})
// @route get /api/posts
// @desc get all posts
//@ access private
router.get('/',auth,async(req,res)=>{
    try {
        const posts=await Post.find().sort({date:-1})
        res.json(posts)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
    }
})
// @route get /api/posts/:id
// @desc get post by id
//@ access private
router.get('/:id',auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({msg:"post not found"})
        }

        res.json(post)
    } catch (error) {
        console.error(error.message)
        if(error.kind==='ObjectId'){
            return res.status(404).json({msg:"post not found"})
        }
        res.status(500).send("Server error")
    }
})

// @route delete /api/posts/:id
// @desc delete post
//@ access private
router.delete('/:id',auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({msg:"post not found"})
        }
        if(post.user.toString()!==req.user.id){
            return res.status(401).json({msg:"user not authorized"})
        }
        await post.remove()
        res.json({msg:'post removed'})
    } catch (error) {
        console.error(error.message)
        if(error.kind==='ObjectId'){
            return res.status(404).json({msg:"post not found"})
        }
        res.status(500).send("Server error")
    }
})
// @route put /api/posts/like/:id
// @desc like a post
//@ access private
router.put('/like/:id',auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
            return res.status(400).json({msg:"post already liked"})
        }
        post.likes.unshift({user:req.user.id})
        await post.save()

        res.json(post.likes)
       
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
    }
})
// @route put /api/posts/unlike/:id
// @desc unlike a post
//@ access private
router.put('/unlike/:id',auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
            return res.status(400).json({msg:"post has not yet been liked"})
        }
      post.likes=post.likes.filter(like=>like.user.toString()!==req.user.id)
        await post.save()
        
        res.json(post.likes)
       
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
    }
})

// @route post /api/posts/comment/:id
// @desc comment a post
//@access private
router.post('/comment/:id',[auth,[
    check('text','Text is required').not().isEmpty()
]],async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    
try {
    const post=await Post.findById(req.params.id)
     const user=await User.findById(req.user.id)
     post.comments.unshift({user:req.user.id,name:user.name,avatar:user.avatar,text:req.body.text})
    await post.save()

    res.json(post.comments)
} catch (error) {
    console.error(error.message)
    res.status(500).send("Server error")
}
})

// @route delete /api/posts/comment/:id/:comment_id
// @desc delete a comment apost
//@access private
router.delete('/comment/:id/:comment_id',auth,async(req,res)=>{
    try {
      const post =await Post.findById(req.params.id)
     
      post.comments=post.comments.filter(comment=>comment._id.toString()!==req.params.comment_id)
      await post.save()
      res.json(post.comments)
    } catch (error) {
        console.error(error.message)
    res.status(500).send("Server error")
    }
})



module.exports=router