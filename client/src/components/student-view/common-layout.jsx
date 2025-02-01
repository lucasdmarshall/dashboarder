import { AuthContext } from "@/context/auth-context";
import { Book, GraduationCap, Home, LogOut } from "lucide-react";
import { useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

function StudentViewCommonLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetCredentials } = useContext(AuthContext);

  const menuItems = [
    {
      icon: Home,
      label: "Home",
      path: "/student/home",
    },
    {
      icon: Book,
      label: "Browse Courses",
      path: "/student/courses",
    },
    {
      icon: GraduationCap,
      label: "My Courses",
      path: "/student/my-courses",
    },
    {
      icon: LogOut,
      label: "Logout",
      path: "#",
      onClick: () => {
        resetCredentials();
        sessionStorage.clear();
        navigate("/auth");
      },
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Dashboarder</h1>
        </div>
        <nav>
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={item.onClick}
              className={`flex items-center gap-2 p-3 rounded-lg mb-2 ${
                location.pathname === item.path
                  ? "bg-gray-700"
                  : "hover:bg-gray-800"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default StudentViewCommonLayout;
