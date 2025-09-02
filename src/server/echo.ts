import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'

const app = express()

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(bodyParser.json())

app.use('/static', express.static('static'))

interface User {
  name: string
}

app.get('/users', (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin as string)
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  console.log('req.query:', req.query)
  console.log('req.headers:', req.headers)
  
  const users: User[] = [
    { name: 'Yohei' },
    { name: 'Sasuke' }
  ]
  
  res.json(users)
})

interface PostUserBody {
  firstName: string
  lastName: string
}

app.post('/users', (req: Request<{}, {}, PostUserBody>, res: Response) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin as string)
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  const { firstName, lastName } = req.body

  res.send(`${firstName} ${lastName}`)
})

app.get('/error', (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  res.status(400).send('Bad Request')
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Express server is listening to ${PORT}.`)
})