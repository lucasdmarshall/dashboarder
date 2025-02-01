import { useContext } from "react";
import { Link } from "react-router-dom";
import { InstructorContext } from "@/context/instructor-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

function InstructorCourses() {
  const { instructorCoursesList } = useContext(InstructorContext);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <Link to="/instructor/add-course">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Course
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {instructorCoursesList?.map((course) => (
          <Card key={course._id}>
            <CardHeader>
              <CardTitle className="text-lg">{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {course.description}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-sm">
                  {course.enrolledStudents?.length || 0} students enrolled
                </p>
                <Link to={`/instructor/edit-course/${course._id}`}>
                  <Button variant="outline" size="sm">
                    Edit Course
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}

        {instructorCoursesList?.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground mb-4">No courses created yet</p>
            <Link to="/instructor/add-course">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Course
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default InstructorCourses;
