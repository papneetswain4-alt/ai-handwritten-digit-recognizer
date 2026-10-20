import React from 'react';

export default function MetricsTable({ rows = [] }) {
  if (!rows || rows.length === 0) return null;

  // Extract column keys dynamically from first row
  const firstRow = rows[0];
  const keys = Object.keys(firstRow);

  const formatHeader = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="table-responsive-container">
      <table className="custom-metrics-table">
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{formatHeader(key)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rIdx) => (
            <tr key={rIdx}>
              {keys.map((key) => (
                <td key={key}>
                  <span className="td-content">{String(row[key])}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
