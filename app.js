const express = require("express")
const mongoose = require("mongoose")
const taskRouter = require("./routes/tasks")
const cors = require('cors')
const path = require('path')

var app = express();

const username = "root";
const password = "root";
const cluster = "todolist";
const dbname = "todolistdb";
const url = `mongodb+srv://${username}:${password}@${cluster}.tsq1t.mongodb.net/${dbname}?retryWrites=true&w=majority`

const port = process.env.PORT || 4000

mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true
  }
);

const con = mongoose.connection
con.on('open', () => { console.log("DB connection established") })
const corsOpts = {
  origin: '*',
  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE'
  ],
  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

app.use(cors(corsOpts))
app.use(express.json())
app.use("/tasks", taskRouter)

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log('Example app listening on port 4000!');
})