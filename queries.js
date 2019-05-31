const Pool = require('pg').Pool

//this would normally be in separate file w/ locked permissions etc.
const pool = new Pool({
  user: 'john',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

//get all users
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// get a specific user
const getUserById = (request, response) => {
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// post new user
const createUser = (request, response) => {
  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

//update existing user
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

// delete a user
const deleteUser = (requet, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`user deleted with ID: ${id}`)
  })
}


//exports the functions, which are then used in index.js
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}



