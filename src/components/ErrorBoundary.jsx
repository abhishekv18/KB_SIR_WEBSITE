import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  componentDidCatch(error, info) { console.error(error, info) }
  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="grid min-h-[100svh] place-items-center bg-navy px-6 text-center text-white">
        <div>
          <p className="font-display text-4xl">Something went wrong.</p>
          <p className="mt-3 text-white/70">Please reload the page. If it keeps happening, email info@kunalbharadwaj.com.</p>
          <button type="button" onClick={() => window.location.reload()} className="pill pill-gold mt-8">Reload page</button>
        </div>
      </div>
    )
  }
}
