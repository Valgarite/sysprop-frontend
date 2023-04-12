import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

async function fetchUsers(searchTerm = '') {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?q=${searchTerm}`);
    const users = await response.json();
    return users;
  } catch (error) {
    console.error(error);
  }
}

function App() {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', username: '', email: '', phone: '' });
  const [formErrors, setFormErrors] = useState({ name: '', username: '', email: '', phone: '' });
  const [editUserId, setEditUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleModal = () => {
    setModal(!modal);
    setFormData({ name: '', username: '', email: '', phone: '' });
    setFormErrors({ name: '', username: '', email: '', phone: '' });
    setEditUserId(null);
    
  }

  const getUsers = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    setUsers(data);
  }
  

  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data);
    });
  }, []);
  

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, username, email, phone } = formData;

    // Validación de formulario
    let errors = {};
    if (!name) {
      errors.name = 'Por favor ingrese un nombre';
    }
    if (!username) {
      errors.username = 'Por favor ingrese un nombre de usuario';
    }
    if (!email) {
      errors.email = 'Por favor ingrese un correo electrónico';
    }
    if (!phone) {
      errors.phone = 'Por favor ingrese un número de teléfono';
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editUserId) {
      // Actualizar usuario existente
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${editUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, username, email, phone })
      });
      const updatedUser = await res.json();
      setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    } else {
      // Agregar nuevo usuario
      const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, username, email, phone })
      });
      const newUser = await res.json();
      setUsers([...users, newUser]);
    }

    toggleModal();
  }

  const handleEdit = user => {
    setFormData(user);
    setEditUserId(user.id);
    setModal(true);
  }

  const handleDelete = async userId => {
    if (window.confirm('¿Está seguro de que desea eliminar este usuario?')) {
      await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, { method: 'DELETE' });
      setUsers(users.filter(user => user.id !== userId));
    }
  }
  function handleSearch(event) {
    const term = event.target.value;
    setSearchTerm(term);
    fetchUsers(term).then(data => {
      setUsers(data);
    });
  }
  

  return (
    <div className="container">
      <div className="col-md-6 text-md-right">
      <h2>Lista de Usuarios</h2>
      <div className="col-md-6">
          
        </div>
        </div>
        <div className="col-6">
          <input
            type="text"
            placeholder="Buscar Usuario"
            className="form-control"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
       
    <Button color="primary" className="col-2" onClick={toggleModal}>Agregar usuario</Button>
    <Modal isOpen={modal} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Agregar usuario</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Nombre</Label>
            <Input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} />
            {formErrors.name && <div className="text-danger">{formErrors.name}</div>}
          </FormGroup>
          <FormGroup>
            <Label for="username">Nombre de usuario</Label>
            <Input type="text" name="username" id="username" value={formData.username} onChange={handleInputChange} />
            {formErrors.username && <div className="text-danger">{formErrors.username}</div>}
          </FormGroup>
          <FormGroup>
            <Label for="email">Correo electrónico</Label>
            <Input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} />
            {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
          </FormGroup>
          <FormGroup>
            <Label for="phone">Teléfono</Label>
            <Input type="text" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} />
            {formErrors.phone && <div className="text-danger">{formErrors.phone}</div>}
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>Guardar</Button>{' '}
        <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
      </ModalFooter>
    </Modal>
    <Table className="mt-3">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Nombre de usuario</th>
          <th>Correo electrónico</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <Button color="warning" size="sm" className="mr-2" onClick={() => handleEdit(user)}>Editar</Button>
              <Button color="danger" size="sm" onClick={() => handleDelete(user.id)}>Eliminar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);
}
export default App;