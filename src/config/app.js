const Express = require("express")
const app = Express()
const port = 5000
const cors = require("cors")
const mongoose = require("mongoose")
const DB_URI = "mongodb+srv://admin:admin@cluster0.xwthx.mongodb.net/todo"
const postModel = require("./Schema")
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
    let {title} = req.body
    console.log(title);
    let obj = {
        title : title
    }
    try {
        postModel.create(obj, (err, data) => {
            if (err) {
                throw err
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


app.listen(port, () => console.log(`Server is Running on localhost:${port}`))

