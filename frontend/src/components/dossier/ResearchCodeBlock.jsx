import React, { useState } from 'react';

export default function ResearchCodeBlock({ code, executionCount, cellIndex }) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const lines = (code || '').split('\n');
  const isLong = lines.length > 28;
  const displayedCode = isLong && !isExpanded ? lines.slice(0, 24).join('\n') + '\n# ... [truncated]' : code;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="cell-code-box">
      <div className="code-box-header">
        <span className="code-prompt">
          In [{executionCount != null ? executionCount : cellIndex}]: PYTHON 3.10
        </span>
        <div className="code-actions">
          {isLong && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              style={{ marginRight: '8px' }}
            >
              {isExpanded ? 'Collapse Code' : `Expand (${lines.length} lines)`}
            </button>
          )}
          <button type="button" onClick={handleCopy}>
            {copied ? 'COPIED ✓' : 'COPY'}
          </button>
        </div>
      </div>

      <pre className="code-box-body">
        <code>{displayedCode}</code>
      </pre>
    </div>
  );
}
