const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");

require("dotenv").config();

// express app
const app = express();

// connect to mongodb
mongoose.set("strictQuery", false);
//console.log(process.env.dbURL)
const dbURI = process.env.dbURL;
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000)) //to ensure that requests are listened only after connecting to the db
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// listen for requests
// app.listen(3000);

// middleware and static files.
app.use(express.static("public")); //static files can be accessed and becomes public
app.use(express.urlencoded({ extended: true })); //accesses the form data.
app.use(morgan("dev"));

// mongoose and mongodb sandbox routes.

// app.get('/add-blog',(req,res)=> {
//   const blog = new Blog({
//     title: 'new blog 3',
//     snippet: ' about my new blog3',
//     body: 'more about my new blog3'
//   })

//   blog.save()
//   .then(result=>{
//     res.send(result)
//   })
//   .catch(err=>console.log(err))
// })

// // getting all blogs
// app.get('/all-blogs',(req, res)=>{
//   Blog.find()
//   .then(result=>{
//     res.send(result)
//   })
//   .catch(err=>console.log(err))
// })

// // getting a single blog with its unique id
// app.get('/single-blog',(req, res)=>{
//   Blog.findById('63eb2eda5f90098689e91f84')
//   .then(result=>{
//     res.send(result)
//   })
//   .catch(err=>console.log(err))
// })

// Custom middleware.
// app.use((req, res, next)=> {
//     console.log("A new request is made: ")
//     console.log("host:", req.hostname)
//     console.log("path:", req.path)
//     console.log("method:", req.method,"\n")
//     next() //informs that this piece of middleware is complete and tells to move on
// })

// routes

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// custom middleware 2
// app.use((req, res, next)=> {
//     console.log("The next piece of middleware \n")
//     next() //wont run if already a response is sent in the above get requests.
// })

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

// 404 page
//    this runs as long as no response is sent before.
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

// GET -- request to get a resource
// POST -- request to create new data
// DELETE -- request to delete the data
// PUT -- request to update the data

// ROUTE PARAMETERS -- variable parts of routes that may change the values.
