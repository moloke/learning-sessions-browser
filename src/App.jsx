import { useState, useEffect } from 'react'
import { fetchSessions } from './api'

function App() {
  // Data state
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // UI state
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [sortOrder, setSortOrder] = useState('desc')
  const [simulateError, setSimulateError] = useState(false)


  // Fetch sessions on mount
  useEffect(() => {
    loadSessions()
  }, [])

  const loadSessions = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchSessions(simulateError)
      setSessions(data)
    } catch (err) {
      console.error('Error fetching sessions:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSimulateErrorChange = async (e) => {
    const checked = e.target.checked
    setSimulateError(checked)
    await loadSessionsWithErrorFlag(checked)
  }

  // Load sessions with error flag
  const loadSessionsWithErrorFlag = async (shouldFail) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchSessions(shouldFail)
      setSessions(data)
    } catch (err) {
      console.error('Error fetching sessions:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleComplete = (id) => {
    setSessions(previousSessions => {
      return previousSessions.map(session => {
        if (session.id === id) {
          return { ...session, completed: !session.completed }
        }
        return session
      })
    })
  }

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')
  }


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const filtered = sessions.filter(s =>
    s.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  )
  const sorted = [...filtered].sort((a, b) => {
    const diff = sortOrder === 'desc'
      ? b.popularity - a.popularity
      : a.popularity - b.popularity
    
    if (diff === 0) {
      return a.title.localeCompare(b.title)
    }
    return diff
  })


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Learning Sessions Browser
          </h1>
          <p className="text-gray-600">
            Browse and manage your AI learning sessions
          </p>
        </header>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="space-y-4">
            {/* Search Input */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Sessions
              </label>
              <input
                id="search"
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>

            {/* Controls Row */}
            <div className="flex flex-wrap gap-3">
              {/* Sort Toggle */}
              <button
                onClick={toggleSortOrder}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
              >
                Sort: Popularity {sortOrder === 'desc' ? '↓' : '↑'}
              </button>

              {/* Simulate Error Checkbox */}
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={simulateError}
                  onChange={handleSimulateErrorChange}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-2 focus:ring-red-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Simulate Error
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div role="status" aria-live="polite" className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading sessions...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h2 className="text-red-900 font-semibold mb-2">Error</h2>
            <p className="text-red-800 mb-4">{error}</p>
            <button
              onClick={loadSessions}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 font-medium"
            >
              Retry
            </button>
          </div>
        )}

        {/* Sessions List */}
        {!loading && !error && (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Showing {sorted.length} of {sessions.length} sessions
            </div>

            <ul className="space-y-4" role="list">
              {sorted.map(session => (
                <li
                  key={session.id}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {session.title}
                    </h3>
                    <button
                      onClick={() => toggleComplete(session.id)}
                      aria-pressed={session.completed}
                      className={`px-3 py-1 rounded-md text-sm font-medium focus:ring-2 focus:ring-offset-2 transition-colors ${
                        session.completed
                          ? 'bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500'
                      }`}
                    >
                      {session.completed ? '✓ Completed' : 'Mark Complete'}
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {/* Tags */}
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Tags:</span>
                      <span>
                        {session.tags.length > 0 ? session.tags.join(', ') : '-'}
                      </span>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Duration:</span>
                      <span>{session.mins} mins</span>
                    </div>

                    {/* Difficulty */}
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Difficulty:</span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          session.difficulty === 'beginner'
                            ? 'bg-green-100 text-green-800'
                            : session.difficulty === 'intermediate'
                            ? 'bg-yellow-100 text-yellow-800'
                            : session.difficulty === 'advanced'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {session.difficulty}
                      </span>
                    </div>

                    {/* Popularity */}
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Popularity:</span>
                      <span className="font-semibold text-blue-600">
                        {session.popularity}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {/* Empty State */}
            {filtered.length === 0 && sessions.length > 0 && (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-600">
                  No sessions found matching "{debouncedSearch}"
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App