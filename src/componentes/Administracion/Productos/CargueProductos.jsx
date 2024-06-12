import React from 'react'
import DynamicForm from './DynamicForm'
import AdminListaProductos from './AdminListaProductos'

function CargueProductos() {
  return (
    <div className='container p-3'>
        <DynamicForm />       
    </div>
  )
}

export default CargueProductos