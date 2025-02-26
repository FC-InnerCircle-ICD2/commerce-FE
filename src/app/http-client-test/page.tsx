'use client'

import { useEffect, useState } from 'react';
import httpClient from '@/lib/http-client';

const TestPage = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const requestData = {
          name: 'John Doe',
          email: 'john.doe@example.com',
        };

        const response = await httpClient.post<any>('users', requestData);
        console.log(response);
        setData(response);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Page</h1>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {data && (
        <div>
          <h2>Fetched Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TestPage;
