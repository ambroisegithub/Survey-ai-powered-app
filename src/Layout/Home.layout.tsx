import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function HomeLayout() {
  return (
    <div className="flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </header>

      <main className="flex-grow mt-16 overflow-y-auto">
        <Outlet />
      </main>

      <footer className="">
      </footer>
    </div>
  );
}

export default HomeLayout;