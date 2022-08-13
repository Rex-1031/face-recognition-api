
const clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: 'a1f3b4ee86d44202ac104d0e77733d64'
  })

const handleAPICall =(req,res)=>{
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
        .then(data =>{
            res.json(data)
        })
        .catch(err =>res.status(400).json('Unable toe work with API: ', err))
}

const handleImage=(db)=>(req,res)=>{
    const {id} = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries=>{
            res.json(entries[0].entries)
        })
        .catch(err => res.status(400).json('unable to get entries'))
  

}

module.exports={
    handleImage,
    handleAPICall
}