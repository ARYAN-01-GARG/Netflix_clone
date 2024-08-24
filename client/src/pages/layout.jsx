import Navbar from './Navbar/Navbar';
import { Outlet } from 'react-router-dom';

export default function layout() {
  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  )
}
