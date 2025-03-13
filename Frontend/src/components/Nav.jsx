import React from 'react'

export const Nav = () => {
  return (
    <nav style={{ marginBottom: '20px' }}>
    <ul style={{ listStyle: 'none', display: 'flex', gap: '20px' }}>
      <li><a href="/">Home</a></li>
      <li><a href="/register-team">Register Team</a></li>
      <li><a href="/matches">Matches</a></li>
      <li><a href="/standings">Standings</a></li>
    </ul>
  </nav>
  )
}
