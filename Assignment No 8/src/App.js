
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <h2>My Website</h2>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div className="page">
              <h1>Home Page</h1>
              <p>Welcome to my React application!</p>
            </div>
          }
        />

        <Route
          path="/about"
          element={
            <div className="page">
              <h1>About Page</h1>
              <p>This application uses React Router DOM.</p>
            </div>
          }
        />

        <Route
          path="/contact"
          element={
            <div className="page">
              <h1>Contact Page</h1>
              <p>Email: example@gmail.com</p>
            </div>
          }
        />

        <Route
          path="*"
          element={<h1 className="page">404 - Page Not Found</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
