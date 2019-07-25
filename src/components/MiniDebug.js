import React from 'react';

export default function MiniDebug({ data }) {
  return <pre className="debug--mini">{JSON.stringify(data, null, 2)}</pre>;
}
