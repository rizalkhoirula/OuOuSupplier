const getImageUrl = (path) => {
  // If the path is already a full URL, return it as is.
  if (path.startsWith('http')) {
    return path;
  }

  // Construct the full URL using the base API URL.
  // This assumes the backend serves static files from the root.
  // We remove any trailing '/api' from the REACT_APP_API_URL if it exists.
  const baseUrl = process.env.REACT_APP_API_URL.replace('/api', '');
  
  // Ensure we don't have double slashes
  return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
};

export default getImageUrl;
