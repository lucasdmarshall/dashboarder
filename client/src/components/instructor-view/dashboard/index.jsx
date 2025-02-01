import { useContext, useEffect } from "react";
import { InstructorContext } from "@/context/instructor-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Users } from "lucide-react";

function InstructorDashboard() {
  const { instructorCoursesList } = useContext(InstructorContext);

  const stats = [
    {
      title: "Total Courses",
      value: instructorCoursesList?.length || 0,
      icon: Book,
    },
    {
      title: "Total Students",
      value: instructorCoursesList?.reduce((acc, course) => acc + (course.enrolledStudents?.length || 0), 0),
      icon: Users,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Recent Courses</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {instructorCoursesList?.slice(0, 6).map((course) => (
          <Card key={course._id}>
            <CardHeader>
              <CardTitle className="text-lg">{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {course.enrolledStudents?.length || 0} students enrolled
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default InstructorDashboard;
