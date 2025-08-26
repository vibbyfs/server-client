import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state = { hasError: false } }
  static getDerivedStateFromError(){ return { hasError: true } }
  componentDidCatch(err, info){ console.error(err, info) }
  render(){
    if(this.state.hasError){
      return <div className="p-6 text-red-600">Terjadi kesalahan. Muat ulang halaman.</div>
    }
    return this.props.children
  }
}
