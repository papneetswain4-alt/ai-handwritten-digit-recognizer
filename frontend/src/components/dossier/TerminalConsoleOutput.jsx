import React from 'react';

export default function TerminalConsoleOutput({ text, name, outputType }) {
  if (!text) return null;

  const isStderr = name === 'stderr';

  return (
    <div className={`cell-output-box ${isStderr ? 'stderr' : ''}`}>
      <div style={{ color: 'var(--text-muted)', marginBottom: '4px', fontSize: '10px' }}>
        {outputType === 'execute_result' ? 'Out [*]:' : '&gt; CONSOLE EXECUTION STREAM:'}
      </div>
      <div>{text}</div>
    </div>
  );
}
