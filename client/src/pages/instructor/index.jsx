import { useContext, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import { fetchInstructorCourseListService } from "@/services";
import { BarChart, Book, Plus, LogOut } from "lucide-react";

function InstructorDashboardpage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetCredentials } = useContext(AuthContext);
  const { setInstructorCoursesList } = useContext(InstructorContext);

  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      path: "/instructor/dashboard",
    },
    {
      icon: Book,
      label: "Courses",
      path: "/instructor/courses",
    },
    {
      icon: Plus,
      label: "Add Course",
      path: "/instructor/add-course",
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

  async function fetchAllCourses() {
    try {
      const response = await fetchInstructorCourseListService();
      if (response?.success) {
        setInstructorCoursesList(response?.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }

  useEffect(() => {
    fetchAllCourses();
  }, [location.pathname]); // Refetch when path changes

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

export default InstructorDashboardpage;
