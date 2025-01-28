import React, { useState, useEffect } from 'react';
import './App.css';
import UserList from './components/UserList.js';
import UserForm from './components/UserForm.js';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function App() {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState(null);

  // Fetch users
  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => alert('Error fetching users'));
  }, []);

  // Add or Edit User
  const handleSaveUser = (user) => {
    if (isEditing) {
      fetch(`${API_URL}/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then(response => response.json())
        .then(updatedUser => {
          setUsers(users.map(u => u.id === user.id ? updatedUser : u));
          setIsEditing(false);
          setEditUser(null);
        })
        .catch(() => alert('Error updating user'));
    } else {
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then(response => response.json())
        .then(newUser => {
          setUsers([...users, newUser]);
        })
        .catch(() => alert('Error adding user'));

    }
  };

  // Edit user
  //kell
  const handleEditUser = (user) => {
    setIsEditing(true);
    setEditUser(user);
  };

  // Delete user
  const handleDeleteUser = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(() => alert('Error deleting user'));
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <UserForm
        isEditing={isEditing}
        user={editUser}
        onSaveUser={handleSaveUser}
      />
      <UserList
        users={users}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
}

export default App;
