const Express = require("express")
const app = Express()
const port = 5000
const cors = require("cors")
const mongoose = require("mongoose")
const DB_URI = "mongodb+srv://admin:admin@cluster0.xwthx.mongodb.net/todo"
const postModel = require("./Schema")
///body allow///
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json())
app.use(cors());



mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => console.log("mongoose is Connected"))
mongoose.connection.on("error", () => console.log("Mongoose is not Connected Error"))


app.post("/post", (req, res) => {
    let {title ,uId} = req.body
    console.log(title);
    let obj = {
        title : title,
        uId : uId
    }
    try {
        postModel.create(obj, (err, data) => {
            if (err) {
                throw ere
            } else {
                res.send("SuccessFully Post YOUR ITME")
            }
        })
    } catch (error) {

    }

})

///GET API //
app.get("/" , (req,res)=>{
        postModel.find({},(err,data)=>{
            if(err){
                console.log(err);
            }else{
                
                res.send(data)
            }
        })
})

////DELETE Apii//
app.delete("/" , (req,res)=>{
        postModel.deleteMany({},(err,data)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log("Delete SuccessFully..." , data);
                    res.send("Delete SuccessFully...")
                }
        })
})

app.post("/delOne" , (req,res)=>{
    console.log(req.body);
    const body = req.body
    postModel.deleteOne({uId:body.uId},(err,data)=>{
        try {
                if(err){
                    throw err
                }else{
                    res.send("SUCCESSFULLT DELETE")
                    console.log(data);

                }
        } catch (error) {
                res.send(error)
        }   
    })
})

app.put("/",(req,res)=>{
    const {uId , updatedValue} = req.body
    // const obj = {
    //     uId : uId,
    //     updatedValue  : updatedValue 
    // }
    // console.log(obj)    
    try {
        postModel.findOneAndUpdate(  {uId : uId} ,{title : updatedValue  },(err,data)=>{
            if(err){
                throw err
            }else{
                res.send("SuccessFully UPDATAED....")
            }
        })
    } catch (error) {
            console.log(error);
    }


})


app.listen(port, () => console.log(`Server is Running on localhost:${port}`))

