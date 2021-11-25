import React from 'react'
import { Spinner as ReactSpinner } from 'react-bootstrap'

function Spinner() {
    return (
        <ReactSpinner animation='border' role='status' style={{height:'100px', width:'100px', margin:'auto', display:'block'}}>
            <span className='sr-only'>Cargando...</span>
        </ReactSpinner>
    )
}

export default Spinner
