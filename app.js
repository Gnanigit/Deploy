const express = require('express')
const app = express()
const { Todo } = require('./models')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.post('/todos', async (req, res) => {
  console.log('Created a todo', req.body)
  try {
    const todo = await Todo.addTodo({ title: req.body.title, dueDate: req.body.dueDate, completed: false })
    return res.json(todo)
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
})

app.put('/todos/:id/marksAsCompleted', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id)
  try {
    const updatedTodo = await todo.markAsCompleted()
    return res.json(updatedTodo)
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
})

module.exports = app
