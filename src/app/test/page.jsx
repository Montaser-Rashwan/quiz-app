// app/test/page.js
export default async function Test() {
  let data = null;

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    data = await res.json();
  } catch (err) {
    console.error(err);
  }

  return (
    <div>
      <h1>Test Page</h1>
      <pre>{data ? JSON.stringify(data, null, 2) : 'Loading...'}</pre>
    </div>
  );
}