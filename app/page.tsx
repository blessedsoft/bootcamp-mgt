'use client';

import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_URL}/users`);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create user');

      setFormData({ name: '', email: '' });
      fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      setError('');
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete user');

      fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="container">
      <h1>Bootcamp User Management</h1>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        Next.js + NestJS + PostgreSQL Demo
      </p>

      {error && <div className="error">{error}</div>}

      <div className="user-form">
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email"
            />
          </div>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Adding...' : 'Add User'}
          </button>
        </form>
      </div>

      <div>
        <h2>Users List</h2>
        {loading ? (
          <div className="loading">Loading users...</div>
        ) : users.length === 0 ? (
          <p>No users found. Add one above!</p>
        ) : (
          <ul className="user-list">
            {users.map((user) => (
              <li key={user.id} className="user-item">
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  <p style={{ fontSize: '12px', color: '#999' }}>
                    Created: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  className="button-danger"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
