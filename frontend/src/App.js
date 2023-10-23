import { useEffect, useState } from 'react'
import './App.css';

function App() {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    fetch('http://localhost:4000/')
      .then(res => res.json())
      .then(data => setBlogs(data))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>all blogss</h1>
        {blogs && blogs.map(blog => (
          <div key={blog.ten}>{blog.mssv}</div>
        ))}
      </header>
    </div>
  );
}

export default App;
