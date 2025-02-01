import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  enrollCourseService,
  fetchStudentViewCourseDetailsService,
} from "@/services";
import { CheckCircle, Globe, Lock, PlayCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function StudentViewCourseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { setEnrolledCourses } = useContext(StudentContext);

  const [loading, setLoading] = useState(true);
  const [courseDetails, setCourseDetails] = useState(null);
  const [enrolling, setEnrolling] = useState(false);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  async function fetchCourseDetails() {
    try {
      const response = await fetchStudentViewCourseDetailsService(id);
      console.log('Course details response:', response);
      if (response?.success) {
        setCourseDetails(response.data);
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
      toast.error("Failed to fetch course details");
    } finally {
      setLoading(false);
    }
  }

  async function handleEnrollCourse() {
    if (!auth.authenticate) {
      navigate("/auth");
      return;
    }

    try {
      setEnrolling(true);
      await enrollCourseService(id, auth.user._id);
      toast.success("Successfully enrolled in the course!");
      setEnrolledCourses((prev) => [...prev, courseDetails]);
      navigate("/student/my-courses");
    } catch (error) {
      console.error(error);
      toast.error("Failed to enroll in the course");
    } finally {
      setEnrolling(false);
    }
  }

  function handlePreviewVideo(videoUrl) {
    setPreviewVideo(videoUrl);
    setShowPreviewDialog(true);
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <Skeleton className="h-[400px] w-full" />
        <div className="grid grid-cols-3 gap-6">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{courseDetails?.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {courseDetails?.description}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Instructor:</span>{" "}
                  {courseDetails?.instructorName}
                </div>
                <div>
                  <span className="font-semibold">Level:</span>{" "}
                  {courseDetails?.level}
                </div>
                <div>
                  <span className="font-semibold">Language:</span>{" "}
                  {courseDetails?.primaryLanguage}
                </div>
                <div>
                  <span className="font-semibold">Category:</span>{" "}
                  {courseDetails?.category}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {courseDetails?.curriculum?.length > 0 ? (
                courseDetails.curriculum.map((lecture, index) => (
                  <div
                    key={lecture._id || index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {lecture.freePreview ? (
                        <Globe className="w-5 h-5 text-green-500" />
                      ) : (
                        <Lock className="w-5 h-5 text-gray-500" />
                      )}
                      <span>{lecture.title}</span>
                    </div>
                    {lecture.freePreview && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePreviewVideo(lecture.videoUrl)}
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No lectures available yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold">${courseDetails?.pricing}</div>
              </div>
              <Button
                className="w-full"
                onClick={handleEnrollCourse}
                disabled={enrolling}
              >
                {enrolling ? "Enrolling..." : "Enroll Now"}
              </Button>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Full lifetime access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>{courseDetails?.curriculum?.length} lectures</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Certificate of completion</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Preview Lecture</DialogTitle>
          </DialogHeader>
          {previewVideo && (
            <div className="aspect-video">
              <VideoPlayer url={previewVideo} />
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentViewCourseDetailsPage;
