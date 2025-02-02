import axiosInstance from "@/api/axiosInstance";

export async function registerService(formData) {
  console.log('Registration formData:', formData);
  
  // Validate required fields
  if (!formData.userName || !formData.userEmail || !formData.password) {
    console.error('Missing required fields:', formData);
    throw new Error('Username, email, and password are required');
  }
  
  const requestData = {
    userName: formData.userName,
    userEmail: formData.userEmail,
    password: formData.password,
    role: formData.role || "student"
  };
  console.log('Sending registration data:', requestData);
  
  try {
    // Send data in the same format as the working curl command
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });
    
    const data = await response.json();
    console.log('Registration response:', data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    
    return data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error);
    throw error;
  }
}

export async function loginService(formData) {
  const { data } = await axiosInstance.post("/auth/login", {
    userEmail: formData.userEmail,
    password: formData.password
  });

  return data;
}

export async function checkAuthService() {
  const { data } = await axiosInstance.get("/auth/check-auth");

  return data;
}

export async function mediaUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/media/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });

  return data;
}

export async function mediaDeleteService(id) {
  const { data } = await axiosInstance.delete(`/media/${id}`);

  return data;
}

export async function fetchInstructorCourseListService() {
  const { data } = await axiosInstance.get("/instructor/courses/get");

  return data;
}

export async function addNewCourseService(formData) {
  const { data } = await axiosInstance.post("/instructor/courses/add", formData);

  return data;
}

export async function fetchInstructorCourseDetailsService(id) {
  const { data } = await axiosInstance.get(`/instructor/courses/get/details/${id}`);

  return data;
}

export async function updateCourseByIdService(id, formData) {
  const { data } = await axiosInstance.put(`/instructor/courses/update/${id}`, formData);

  return data;
}

export async function mediaBulkUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/media/bulk-upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });

  return data;
}

export async function fetchStudentViewCourseListService(query) {
  const { data } = await axiosInstance.get(`/student/courses/get?q=${query || ""}`);

  return data;
}

export async function fetchStudentViewCourseDetailsService(courseId) {
  const { data } = await axiosInstance.get(`/student/courses/get/details/${courseId}`);

  return data;
}

export async function enrollCourseService(courseId, studentId) {
  const { data } = await axiosInstance.post(`/student/my-courses/enroll`, {
    courseId,
    studentId,
  });

  return data;
}

export async function fetchStudentEnrolledCoursesService(studentId) {
  const { data } = await axiosInstance.get(`/student/my-courses/${studentId}`);

  return data;
}

export async function getCurrentCourseProgressService(userId, courseId) {
  const { data } = await axiosInstance.get(
    `/student/course-progress/get/${userId}/${courseId}`
  );

  return data;
}

export async function markLectureAsViewedService(userId, courseId, lectureId) {
  const { data } = await axiosInstance.post(
    "/student/course-progress/mark-lecture-viewed",
    {
      userId,
      courseId,
      lectureId,
    }
  );

  return data;
}

export async function resetCourseProgressService(userId, courseId) {
  const { data } = await axiosInstance.post(
    "/student/course-progress/reset-progress",
    {
      userId,
      courseId,
    }
  );

  return data;
}
