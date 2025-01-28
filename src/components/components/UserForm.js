import React, { useState, useEffect } from 'react';

function UserForm({ isEditing, user, onSaveUser }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    username: '',
    email: '',
    website: '',
  });

  useEffect(() => {
    if (isEditing && user) {
      setFormData({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        website: user.website,
      });
    }
  }, [isEditing, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveUser(formData);
    setFormData({ id: '', name: '', username: '', email: '', website: '' });
  };

  return (
    <div>
      <h2>{isEditing ? 'Edit User' : 'Add New User'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="First Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Last Name"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="website"
          placeholder="Department"
          value={formData.website}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditing ? 'Save Changes' : 'Add User'}</button>
      </form>
    </div>
  );
}

export default UserForm;
