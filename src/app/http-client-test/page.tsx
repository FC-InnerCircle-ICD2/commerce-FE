'use client'

import { useEffect, useState } from 'react';
import httpClient from '@/lib/http-client';

interface User {
  id: number;
  name: string;
  email: string;
}

const TestPage = () => {
  const [data, setData] = useState<User | null>(null);
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

        const response = await httpClient.post<typeof requestData, User>('users', requestData);
  
        setData(response);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          // 예외적인 경우를 처리하기 위해 fallback 처리
          setError('An unknown error occurred');
        }
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
