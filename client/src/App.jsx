import Chat from "./components/Chat";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>AI Assistant</h1>
        <p>Ask anything and get an AI-powered response.</p>
      </header>

      <Chat />
    </div>
  );
}

export default App;