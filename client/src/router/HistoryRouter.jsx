import React from 'react'
import { Router } from 'react-router'

export default function HistoryRouter({ history, children }) {
  const [location, setLocation] = React.useState(history.location)
  React.useLayoutEffect(() => history.listen(setLocation), [history])
  return (
    <Router navigator={history} location={location}>
      {children}
    </Router>
  )
}
