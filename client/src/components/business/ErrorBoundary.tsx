// src/components/ErrorBoundary.tsx
import React from "react";

export default class ErrorBoundary extends React.Component<
  { name?: string; children: React.ReactNode },
  { error?: Error }
> {
  state: { error?: Error } = {};
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: any) {
    console.error(`[EB] ${this.props.name || ""}`, error, info);
  }
  render() {
    if (this.state.error)
      return (
        <div style={{ padding: 16, color: "crimson" }}>
          组件渲染出错{this.props.name ? `（${this.props.name}）` : ""}：{this.state.error.message}
        </div>
      );
    return this.props.children as any;
  }
}
