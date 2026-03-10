// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Outlet } from "react-router-dom";

// const HomeLayout = () => {
//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <header className="fixed top-0 left-0 w-full z-50 bg-white shadow">
//         <Navbar />
//       </header>
//       <main className="flex-1 pb-16">
//         <Outlet />
//       </main>
//       <footer className="bg-white shadow mt-auto">
//         <Footer />
//       </footer>
//     </div>
//   );
// };

// export default HomeLayout;



import { Navigate, Outlet } from "react-router-dom";
import { getUserFromToken } from "../api/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomeLayout = () => {
  const user = getUserFromToken();

  // ❌ Admin user site pe allowed nahi
  if (user?.isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <Navbar />
      </header>

      <main className="flex-1 pb-16">
        <Outlet />
      </main>

      <footer className="bg-white shadow mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default HomeLayout;
