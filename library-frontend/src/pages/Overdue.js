import React, { useEffect, useState } from 'react'
import API from '../api/api'
import './Overdue.css'

const Overdue = () => {
  const [overdue, setOverdue] = useState([])

  const fetchOverdue = async () => {
    const res = await API.get('/borrow/overdue')
    setOverdue(res.data)
  }

  useEffect(() => {
    fetchOverdue()
  }, [])

  return (
    <div className="overdue-container container py-4">
      <h2 className="text-center mb-4 text-danger">Overdue Books</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-danger">
            <tr>
              <th>Book Title</th>
              <th>Borrowed On</th>
              <th>Due Date</th>
              <th>Days Overdue</th>
            </tr>
          </thead>
          <tbody>
            {overdue.map((item) => {
              const today = new Date()
              const dueDate = new Date(item.dueDate)
              const daysLate = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24))

              return (
                <tr key={item._id}>
                  <td>{item.book?.title}</td>
                  <td>{new Date(item.borrowedAt).toLocaleDateString()}</td>
                  <td>{dueDate.toLocaleDateString()}</td>
                  <td className="text-danger fw-bold">{daysLate}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Overdue
