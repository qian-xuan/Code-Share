const DisplayCodePage = () => {
  const queryParams = new URLSearchParams(window.location.search);
  
  let fetchURL = '/api/get/codedata';
  if (queryParams.get('pwd')) fetchURL += '/encrypted';
  fetchURL += window.location.search;

  fetch(fetchURL, {
    method: 'GET',
  })
  .then(res => {
    if (res.ok) return res.json();
  })
  .then(resJson => {
    console.log(resJson)
  });

  return (
    <>
    </>
  );
}

export default DisplayCodePage;