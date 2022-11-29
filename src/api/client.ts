const client = async ({ endpoint }: { endpoint: string }): Promise<any> => {
  const headers = { Accept: 'application/json' };

  const config = { method: 'GET', headers };

  const response = await window.fetch(`/api/umweltrechner${endpoint}`, config);

  if (response.ok) {
    return await response.json();
  } else {
    const errorMessage = await response.text();
    return Promise.reject(errorMessage);
  }
};

export default client;
