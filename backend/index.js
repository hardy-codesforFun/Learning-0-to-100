const express = require('express')
const types=require('./types.js');
const cors=require('cors')
const {todo} =require('./db.js');
const app = express();
app.use(cors());
const port = 3000
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/todos',async(req,res)=>{
    const todos=await todo.findOne({});
    console.log(todos)
    res.send(todos);
})
app.post('/todo',async(req,res)=>{
        const createPayload=req.body;
        const parsePayload=types.createTodo.safeParse(createPayload);
        if(!parsePayload.success){
            res.status(411).json({
                msg:"You sent wrong inputs"
            })
            return;
        }
        await todo.create({
            title:createPayload.title,
            description:createPayload.description,
            completed:false
        })
        res.status(200).json({msg:"TODO CREATED"});
        
        
})
app.put('/completed',async(req,res)=>{
    const updatePayload=req.body;
    const parsedUpdate=types.updateTodo.safeParse(updatePayload);
    if(!parsedUpdate.success){
        res.status(411).json({
            msg:"You sent wrong inputs"
        })
        return;
    }
    await todo.update({
        _id:req.body.id,
        completed:true
    })
    res.send({msg:"todo updated"})
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})