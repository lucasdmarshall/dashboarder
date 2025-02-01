import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import { StudentContextProvider } from "./context/student-context";
import RouteGuard from "./components/route-guard";

// Pages
import AuthPage from "./pages/auth";
import NotFoundPage from "./pages/not-found";

// Student Pages
import StudentViewCommonLayout from "./components/student-view/common-layout";
import StudentHomePage from "./pages/student/home";
import StudentViewCoursesPage from "./pages/student/courses";
import StudentViewCourseDetailsPage from "./pages/student/course-details";
import StudentCoursesPage from "./pages/student/student-courses";
import StudentViewCourseProgressPage from "./pages/student/course-progress";

// Instructor Pages
import InstructorDashboardpage from "./pages/instructor";
import InstructorDashboard from "./components/instructor-view/dashboard";
import InstructorCourses from "./components/instructor-view/courses";
import AddNewCoursePage from "./pages/instructor/add-new-course";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <StudentContextProvider>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/auth"
          element={
            <RouteGuard
              authenticated={auth.authenticate}
              user={auth.user}
              element={<AuthPage />}
            />
          }
        />

        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <RouteGuard
              authenticated={auth.authenticate}
              user={auth.user}
              allowedRoles={["student"]}
              element={<StudentViewCommonLayout />}
            />
          }
        >
          <Route index element={<Navigate to="courses" replace />} />
          <Route path="home" element={<StudentHomePage />} />
          <Route path="courses" element={<StudentViewCoursesPage />} />
          <Route path="course/details/:id" element={<StudentViewCourseDetailsPage />} />
          <Route path="my-courses" element={<StudentCoursesPage />} />
          <Route path="course-progress/:id" element={<StudentViewCourseProgressPage />} />
        </Route>

        {/* Instructor Routes */}
        <Route
          path="/instructor"
          element={
            <RouteGuard
              authenticated={auth.authenticate}
              user={auth.user}
              allowedRoles={["instructor"]}
              element={<InstructorDashboardpage />}
            />
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<InstructorDashboard />} />
          <Route path="courses" element={<InstructorCourses />} />
          <Route path="add-course" element={<AddNewCoursePage />} />
          <Route path="edit-course/:id" element={<AddNewCoursePage />} />
        </Route>

        {/* Root Redirect */}
        <Route
          path="/"
          element={
            <RouteGuard
              authenticated={auth.authenticate}
              user={auth.user}
              element={
                <Navigate
                  to={auth.user?.role === "instructor" ? "/instructor/dashboard" : "/student/courses"}
                  replace
                />
              }
            />
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </StudentContextProvider>
  );
}

export default App;
