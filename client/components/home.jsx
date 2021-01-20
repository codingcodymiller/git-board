import React from 'react';
import { useParams } from 'react-router-dom';
export default function Home() {
  const { token } = useParams();
  return (
    <div>
      <h1>Logged In!</h1>
      <h4>Access Token: {token}</h4>
    </div>
  );
}
