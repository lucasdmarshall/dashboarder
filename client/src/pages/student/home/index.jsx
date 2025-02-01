import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthContext } from "@/context/auth-context";
import { fetchStudentViewCourseListService } from "@/services";
import { Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentHomePage() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [featuredCourses, setFeaturedCourses] = useState([]);

  useEffect(() => {
    fetchFeaturedCourses();
  }, []);

  async function fetchFeaturedCourses() {
    try {
      setLoading(true);
      const response = await fetchStudentViewCourseListService("");
      setFeaturedCourses(response.data.slice(0, 6)); // Show only first 6 courses
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleViewCourseDetails(courseId) {
    navigate(`/course/details/${courseId}`);
  }

  function handleViewAllCourses() {
    navigate("/courses");
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <Skeleton className="h-[200px] w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-[300px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to Our Learning Platform</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover a world of knowledge with our expert-led courses. Start your
          learning journey today!
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" onClick={handleViewAllCourses}>
            Browse All Courses
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Featured Courses</h2>
          <Button variant="link" onClick={handleViewAllCourses}>
            View All Courses
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
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
                    <span>{course.sections?.length || 0} sections</span>
                    <span>{course.totalLectures || 0} lectures</span>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => handleViewCourseDetails(course._id)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentHomePage;
