import { createContext, useState } from "react";

export const StudentContext = createContext({
  enrolledCourses: [],
  setEnrolledCourses: () => {},
});

export function StudentContextProvider({ children }) {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const value = {
    enrolledCourses,
    setEnrolledCourses,
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
}
