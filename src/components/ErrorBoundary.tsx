import { Component, ReactNode } from 'react';
export default class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (!this.state.failed) return this.props.children;
    return <main className="system-page error-page"><div role="alert"><h1>We couldn’t open this chapter.</h1><p>Please reload the page, or return to the studio.</p></div><button className="demo-play" onClick={() => window.location.reload()}>Reload page</button><a href={`${import.meta.env.BASE_URL}#`}>Return to the studio</a></main>;
  }
}
