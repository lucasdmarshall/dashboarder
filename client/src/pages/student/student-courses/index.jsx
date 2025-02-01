import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthContext } from "@/context/auth-context";
import { fetchStudentViewCourseListService } from "@/services";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentCoursesPage() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [availableCourses, setAvailableCourses] = useState([]);

  useEffect(() => {
    fetchAvailableCourses();
  }, []);

  async function fetchAvailableCourses() {
    try {
      setLoading(true);
      const response = await fetchStudentViewCourseListService("");
      if (response?.success) {
        setAvailableCourses(response.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleViewCourse(courseId) {
    navigate(`/student/course/details/${courseId}`);
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[300px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">Available Courses</h1>

      {availableCourses.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">No courses available</h2>
          <p className="text-muted-foreground mb-4">
            There are no courses available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCourses.map((course) => (
            <Card key={course._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="line-clamp-2">{course.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground line-clamp-3">
                  {course.description}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>By {course.instructorName}</span>
                    <span>Price: ${course.pricing}</span>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => handleViewCourse(course._id)}
                  >
                    View Course
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentCoursesPage;
