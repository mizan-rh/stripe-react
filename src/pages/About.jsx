// src/pages/About.jsx
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">My App</h1>
            <div className="space-x-6">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            About Us
          </h2>
          <div className="prose prose-lg text-gray-600 space-y-6">
            <p>
              We are a company dedicated to creating amazing web experiences. 
              Our team is passionate about building modern, fast, and user-friendly applications.
            </p>
            <p>
              Founded in 2024, we've been committed to delivering high-quality 
              solutions that meet our users' needs.
            </p>
            <p>
              Our mission is to make the web a better place, one application at a time.
            </p>
          </div>
          <div className="mt-8">
            <Link 
              to="/"
              className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default About