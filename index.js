const express = require('express')
const app = express()

app.use(express.json())

let persons =  [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
      } else {
        response.status(404).send('Sorry, we cannot find that!')
      }
    })
  
  app.delete('/api/persons/:id', (request, response) => {
      const id = Number(request.params.id)
      persons = persons.filter(person => person.id !== id)
    
      response.status(204).end()
    }) 

    

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  
  app.get('/info', (request, response) => {
    const personLength = persons.length
    const time = new Date()
    
    response.send('<p>Phonebook has info for</p>'+personLength+'<p>people</p>'+new Date())
  })

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(p => p.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name is missing' 
      })
    }else if (!body.number){
      return response.status(400).json({
        error: 'number is missing'
      })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
      date: new Date(),
      }

      if (person.name === persons.name && person.number === persons.number){
        return response.status(400).json({
          error:'name and number must be unique'
        })
      }else{
        persons = persons.concat(person)
      }
  
    
  
    response.json(person)
  })

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)