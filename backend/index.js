const express = require("express")

const app = express();
const PORT = process.env.PORT || "5000"
app.use(express.json())

app.get('/',(req,res) => {
  res.status(200).json({success:true,message:"Get successfully"})
})

app.listen(PORT , () => {
  console.log(`Server run this link http://localhost:${PORT}`)
})