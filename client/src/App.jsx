
import Auth from './pages/Auth';
import Layout from './pages/layout';
import { Routes , Route } from 'react-router-dom';
import ToastProvider from './Providers/ToastProviders';

function App() {
  return (
    <div className='w-[100%] h-[100vh]'>
      <ToastProvider />
      <Routes>
         <Route index element={<Layout/>} />
         <Route path="/auth" element={<Auth/>} />
      </Routes>
    </div>
    
  )
}

export default App
