//nhan data tu client va dieu huong su xu li data vao database
//tao 1 controller

// controller --> Models --> database

// router --> controller --> models --> database

const TODO = require('../models/Todo');


//req la request, res la response
//request: client gui len
//response: server tra ve
//req.body: client send data len server
const createTodo = async (req, res) => {
  // destructuring data from req.body
  //req.body:{
  //title: '',
  //description: '',
  // }

  // Get data from client Thu cong
  // const title1 = req.body.title;
  // const description1 = req.body.description;

  // Get data theo es6 destructuring
  const {
    title,
    description,
  } = req.body;
  //tao 1 object Todo theo schema Todo
  const todo = new TODO({
    title,
    description,
  });
  //save data vao database
  await todo.save();
  //tra ve data cho client
  res.json({
    message: 'Todo created',
    data: todo
  });
}

const getTodos = async (req, res) => {
  //get data from database
  const todos = await TODO.find();
  //tra ve data cho client
  res.json({
    message: 'Todos retrieved',
    data: todos
  });
}

module.exports = {
  createTodo,
  getTodos
}