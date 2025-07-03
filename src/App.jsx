import AdminPanel from './AdminPanel';

function App() {
  // Basit route kontrolü
  if (window.location.pathname === '/admin') {
    return <AdminPanel />;
  }
}

export default App; 