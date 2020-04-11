import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `novo repositorio ${Date.now()}`,
      url: `www.git.hub.com`,
      techs: ['node', 'react'],
    });
    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);
    console.log(repositories);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`);

    const response = repositories.filter(
      (repositorie) => repositorie.id !== id
    );

    setRepositories(response);
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repositorie) => (
          <li key={repositorie.id}>
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
