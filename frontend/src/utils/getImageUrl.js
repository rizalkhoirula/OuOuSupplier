const getImageUrl = (path) => {
  // 1. Return an empty string if the path is not provided to prevent errors.
  if (!path) {
    return "";
  }

  // 2. If the path is already a full URL, return it as is.
  if (path.startsWith('http')) {
    return path;
  }

  // 3. Get the API URL from the environment variable. Fallback for safety.
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // 4. Derive the base URL for static assets by removing the '/api' suffix.
  const baseUrl = apiUrl.endsWith('/api') ? apiUrl.slice(0, -4) : apiUrl;

  // 5. Handle the inconsistent path formats ('public/...' vs '/...').
  // This removes 'public/' if it exists, ensuring a clean path.
  let cleanPath = path.startsWith('public/') ? path.substring(7) : path;

  // 6. Ensure the path starts with a slash for a valid URL structure.
  cleanPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;

  // 7. Combine the base URL and the clean path to create the final, correct URL.
  return `${baseUrl}${cleanPath}`;
};

export default getImageUrl;
