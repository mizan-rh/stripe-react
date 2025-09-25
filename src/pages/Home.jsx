// src/pages/Home.jsx
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">My App</h1>
            <div className="space-x-6">
              <Link 
                to="/" 
                className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                About
              </Link>
              <Link 
                to="/test" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Stripe
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to My App
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            This is the home page of your application.
          </p>
          <Link 
            to="/about"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Learn More About Us
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Home