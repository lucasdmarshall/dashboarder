const StudentCourses = require("../../models/StudentCourses");

async function getCoursesByStudentId(req, res) {
  try {
    const { studentId } = req.params;
    const studentCourses = await StudentCourses.findOne({ userId: studentId });
    
    if (!studentCourses) {
      return res.status(404).json({ message: "No courses found" });
    }

    res.status(200).json(studentCourses.courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getCoursesByStudentId };
