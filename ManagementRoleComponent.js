import React from 'react';

const ManagementRoleComponent = ({ switchRole }) => {
  const [data, setData] = React.useState(null);
const ManagementRoleComponent = ({ switchRole }) => {
};

  return (
  React.useEffect(() => {
    fetch('/api/management')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error fetching data');
        }
      })
      .then((data) => {
        setData(data);
        setLoading(false)
      })
      .catch((error) => {
        setError(error);
        setLoading(false)
      })
  }, [])

  return (
    <div>
      {error && <div>Error: {error.message}</div>}
      <h1>Manager Version</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div>
          <p>Data: {JSON.stringify(data)}</p>
          <button onClick={switchRole}>Switch to Driver Version</button>
        </div>
            )}

)
export default ManagementRoleComponent;