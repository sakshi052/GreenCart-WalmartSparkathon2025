import MainNav from './MainNav';
import TopMenu from './TopMenu';

export default function Layout({ children }) {
  return (
    <>
      <MainNav />
      <div className=""> {/* Adjusted for fixed navbar height */}
        <TopMenu />
        <main className="bg-gray-50 min-h-screen">
          {children}
        </main>
      </div>
    </>
  );
}
