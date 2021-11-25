import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')
    let history = useHistory()
    const submitHandler = (event) =>{
        event.preventDefault()
        if (keyword) {
            history.push(`/?keyword=${keyword}&page=1`)
        } else {
            history.push(history.push(history.location.pathname))
        }
    }
    return (
        <Form onSubmit={submitHandler} className="d-flex">
        <Form.Control
          type="text"
          placeholder="Buscar"
          name='q'
          className="me-2"
          onChange={(event) => setKeyword(event.target.value)}
          ></Form.Control>
        <Button variant="outline-success" type='submit'>Buscar</Button>
      </Form>
    )
}

export default SearchBox
