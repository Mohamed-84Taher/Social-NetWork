const express=require('express')
const router=express.Router()
const request=require('request')
const config=require('config')
const auth=require('../../middleware/auth')
const Profile=require('../../models/Profile')
const User=require('../../models/User')
const Post=require('../../models/Post')
const {check,validationResult}=require('express-validator')

// @route GET api/profile/me
// @desc get profile 
// @access private
router.get('/me',auth,async(req,res)=>{
  try {
      const profile=await Profile.findOne({user:req.user.id}).populate('user',['name','avatar'])
      
      if(!profile){
          res.status(401).json({msg:"no profile"})
      }
      res.status(200).json(profile)
  } catch (error) {
      console.error(error)
      res.status(500).send("Server Error")
  }
})
// @route POST api/profile
// @desc add profile or update
// @access private
router.post('/',[auth,[
check('status','status is required').not().isEmpty(),
check('skills','skills are required').not().isEmpty()
]],async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    // build object profile
    const {
       company,
       website,
       location,
       bio,
       status,
       githubusername,
       skills,
       youtube,
       facebook,
       twitter,
       instagram,
       linkedin
      } = req.body;
    let profileFields={}
    profileFields.user=req.user.id
    if(company) profileFields.company=company
    if(website) profileFields.website=website
    if(location) profileFields.location=location
    if(bio) profileFields.bio=bio
    if(githubusername) profileFields.githubusername=githubusername
    if(status) profileFields.status=status
    if(skills){
        profileFields.skills=skills.split(',').map(skill=>skill.trim())
    }
    // build social object
     profileFields.social={}
     if(facebook) profileFields.social.facebook=facebook
     if(twitter) profileFields.social.twitter=twitter
     if(instagram) profileFields.social.instagram=instagram
     if(youtube) profileFields.social.youtube=youtube
     if(linkedin) profileFields.social.linkedin=linkedin
  
  try {
      let profile=await Profile.findOne({user:req.user.id})
      if(profile){
          // update profile
         profile= await Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true})
         return res.json(profile)
      }
        // create new profile
        profile=new Profile(profileFields)
        await profile.save()
        res.status(200).json(profile)
  } catch (error) {
      console.error(error)
      res.status(500).send("Server Error")
  }
})

// @route GET api/profile
// @desc get all profiles
// @access Public
router.get('/',async(req,res)=>{
    try {
        const profiles=await Profile.find().populate('user',['name','avatar'])
        res.json(profiles)
    } catch (error) {
       console.error(error)
       res.status(500).send('Server Error') 
    }
})
// @route GET api/profile/user/userId
// @desc get profile by id
// @access Public
router.get('/user/:userId',async(req,res)=>{
    try {
        const profile=await Profile.findOne({user:req.params.userId}).populate('user',['name','avatar'])
        if(!profile){
            return res.status(404).json({msg:"Profile not found"})
        }
        res.json(profile)
    } catch (error) {
       console.error(error.message)
       if(error.kind=="ObjectId"){
       return  res.status(404).json({msg:"Profile not found"})
       }
       res.status(500).send('Server Error') 
    }
})
// @route delete api/profile
// @desc delete profile & delete user &posts
// @access Private
router.delete('/',auth,async(req,res)=>{
    try {
// remove posts
await Post.deleteMany({user:req.user.id})

// remove profile
 await Profile.findOneAndRemove({user:req.user.id})
 // remove User
 await User.findOneAndRemove({_id:req.user.id})

        res.json({msg:"profile & user deleted"})
    } catch (error) {
       console.error(error.message)
       res.status(500).send('Server Error') 
    }
})
// @route put api/profile/experience
// @desc  add new experience
// @access Private
router.put('/experience',[auth,[
    check('title','title is required').not().isEmpty(),
    check('company','company is required').not().isEmpty(),
    check('from','from date is required').not().isEmpty()
]],async(req,res)=>{
const errors=validationResult(req)
if(!errors.isEmpty()){
    return res.status(500).json({errors:errors.array()})
}
const {title,company,from,to,description,location,current}=req.body
const newExp={title,company,from,to,description,location,current}
try {
    const profile=await Profile.findOne({user:req.user.id})
    profile.experience.unshift(newExp)
    await profile.save()
    res.json(profile)
} catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error') 
}
})
// @route delete api/profile/experience/exp_id
// @desc  delete  experience
// @access Private
router.delete('/experience/:exp_id',auth,async(req,res)=>{
    try {
        let profile=await Profile.findOne({user:req.user.id})
        profile.experience=profile.experience.filter(item=>item.id !=req.params.exp_id)
        await profile.save()
        res.json(profile)
    } catch (error) {
        console.error(error.message)
    res.status(500).send('Server Error') 
    }
})
// @route put api/profile/education
// @desc  add new education
// @access Private
router.put('/education',[auth,[
    check('school','school is required').not().isEmpty(),
    check('degree','degree is required').not().isEmpty(),
    check('fieldofstudy','field of study is required').not().isEmpty(),
    check('from','from date is required').not().isEmpty()
]],async(req,res)=>{
const errors=validationResult(req)
if(!errors.isEmpty()){
    return res.status(500).json({errors:errors.array()})
}
const {school,degree,fieldofstudy,from,to,description,location,current}=req.body
const newEdu={school,degree,fieldofstudy,from,to,description,location,current}
try {
    const profile=await Profile.findOne({user:req.user.id})
    profile.education.unshift(newEdu)
    await profile.save()
    res.json(profile)
} catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error') 
}
})
// @route delete api/profile/education/edu_id
// @desc  delete  education
// @access Private
router.delete('/education/:edu_id',auth,async(req,res)=>{
    try {
        let profile=await Profile.findOne({user:req.user.id})
        profile.education=profile.education.filter(item=>item.id !=req.params.edu_id)
        await profile.save()
        res.json(profile)
    } catch (error) {
        console.error(error.message)
    res.status(500).send('Server Error') 
    }
})
// @route get api/profile/github/:username
// @desc  get user repos from github
// @access Public
router.get('/github/:username',async(req,res)=>{
    try {
        const options={
 uri:
 `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get("githubClientId")}&client_secret=${config.get("githubSecret")}`,
 method:"GET",
 headers:{
     "user-agent":"node.js"
 }
        }
        request(options,(error,response,body)=>{
            if(error) console.error(error)
            if(response.statusCode!==200){
                return res.status(404).json({msg:"No github profile found"})
            }
            res.json(JSON.parse(body))
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error') 
    }
})


module.exports=router