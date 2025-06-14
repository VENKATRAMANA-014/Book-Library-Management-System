import React, { useEffect, useState } from 'react'
import API from '../api/api'
import './BorrowHistory.css'

const BorrowHistory = () => {
  const [history, setHistory] = useState([])

  const fetchHistory = async () => {
    const res = await API.get('/borrow/history')
    setHistory(res.data)
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  return (
    <div className="history-container container py-4">
      <h2 className="text-center mb-4">Borrowing History</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Book Title</th>
              <th>Borrowed On</th>
              <th>Due Date</th>
              <th>Returned</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item._id}>
                <td>{item.book?.title}</td>
                <td>{new Date(item.borrowedAt).toLocaleDateString()}</td>
                <td>{new Date(item.dueDate).toLocaleDateString()}</td>
                <td>{item.returned ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BorrowHistory

