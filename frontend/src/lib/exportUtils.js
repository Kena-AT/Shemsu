/**
 * Formats and triggers a download for a CSV file from an array of objects
 * @param {Array} data - Array of objects to export
 * @param {string} filename - Desired filename
 */
export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || !data.length) return;

  // Helper function to flatten nested objects
  const flattenObject = (obj, prefix = '') => {
    return Object.keys(obj).reduce((acc, k) => {
      const pre = prefix.length ? prefix + '_' : '';
      if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
        Object.assign(acc, flattenObject(obj[k], pre + k));
      } else if (Array.isArray(obj[k])) {
        acc[pre + k] = obj[k].map(i => typeof i === 'object' ? JSON.stringify(i) : i).join('; ');
      } else {
        acc[pre + k] = obj[k];
      }
      return acc;
    }, {});
  };

  // Flatten all rows to get exhaustive headers
  const flattenedData = data.map(row => flattenObject(row));
  
  // Get all unique headers from all objects (in case some rows have missing fields)
  const headersSet = new Set();
  flattenedData.forEach(row => Object.keys(row).forEach(header => headersSet.add(header)));
  const headers = Array.from(headersSet);
  
  // Create CSV rows
  const csvRows = [
    // Header row
    headers.join(','),
    // Data rows
    ...flattenedData.map(row => {
      return headers.map(header => {
        const val = row[header];
        // Handle null/undefined, escape quotes, and wrap in quotes if contains comma
        const escaped = String(val === null || val === undefined ? '' : val).replace(/"/g, '""');
        return escaped.includes(',') || escaped.includes('"') || escaped.includes('\n') ? `"${escaped}"` : escaped;
      }).join(',');
    })
  ];

  // Join rows with newlines
  const csvString = csvRows.join('\n');
  
  // Create blob and download link
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
