import React from 'react';

import '../styles/debug.css';

export default function Debug({ data }) {
  return <pre className="debug">{JSON.stringify(data, null, 2)}</pre>;
}
