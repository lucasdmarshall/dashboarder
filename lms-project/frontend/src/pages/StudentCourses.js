import React, { useState, useEffect } from 'react';
import { 
  Box, 
  VStack, 
  Heading, 
  Text, 
  Flex, 
  Grid, 
  GridItem, 
  Card, 
  CardHeader, 
  CardBody, 
  Button,
  Badge,
  Container,
  HStack,
  Progress,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  List,
  ListItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Divider,
  Collapse,
  Icon,
  Alert,
  AlertIcon,
  AlertDescription,
  useBreakpointValue
} from '@chakra-ui/react';
import { 
  FaBook, 
  FaChalkboardTeacher, 
  FaClock, 
  FaClipboardList, 
  FaFileAlt, 
  FaChevronDown, 
  FaChevronRight,
  FaExclamationTriangle 
} from 'react-icons/fa';
import StudentSidebar from '../components/StudentSidebar';
import useSidebarState from '../hooks/useSidebarState';

const personalCoursesData = [
  {
    id: 1,
    title: 'Introduction to Machine Learning',
    instructor: 'Elena Rodriguez',
    progress: 65,
    category: 'Computer Science',
    difficulty: 'Advanced',
    duration: '12 weeks',
    isSchool: false,
    assignments: [
      {
        id: 101,
        title: 'ML Algorithm Implementation',
        dueDate: '2023-09-25',
        status: 'Submitted',
        feedback: 'Good work on the decision tree implementation. Your code is well-structured, but you could improve the documentation. Consider adding more comments explaining your logic for future reference.',
        grade: '85%',
        marks: '85/100',
        allowResubmit: false
      },
      {
        id: 102,
        title: 'Data Pre-processing Exercise',
        dueDate: '2023-10-05',
        status: 'Pending',
        feedback: '',
        grade: '',
        marks: '',
        allowResubmit: false
      },
      {
        id: 103,
        title: 'Neural Network Design',
        dueDate: '2023-09-20',
        status: 'Resubmit',
        feedback: 'Your neural network design has some conceptual issues. Please revise the hidden layer structure and activation functions based on the lecture notes.',
        grade: '62%',
        marks: '62/100',
        allowResubmit: true
      }
    ]
  },
  {
    id: 5,
    title: 'Advanced Python Programming',
    instructor: 'John Miller',
    progress: 70,
    category: 'Computer Science',
    difficulty: 'Advanced',
    duration: '10 weeks',
    isSchool: false,
    assignments: [
      {
        id: 201,
        title: 'Object-Oriented Design Project',
        dueDate: '2023-09-20',
        status: 'Submitted',
        feedback: 'Excellent work on implementing the design patterns. Your solution is efficient and follows best practices. I particularly liked your use of the factory pattern.',
        grade: '95%',
        marks: '95/100',
        allowResubmit: false
      },
      {
        id: 202,
        title: 'Advanced Data Structures Implementation',
        dueDate: '2023-09-15',
        status: 'Submitted',
        feedback: 'Your implementation of AVL trees has several critical bugs. The balancing operation is not working correctly, and your code fails on edge cases. Review the algorithm and fix these issues.',
        grade: '45%',
        marks: '45/100',
        allowResubmit: true
      },
      {
        id: 203,
        title: 'Multithreading Exercise',
        dueDate: '2023-09-25',
        status: 'Submitted',
        feedback: 'There are several race conditions in your multithreading implementation. The synchronization is not properly handled, which could lead to deadlocks in real-world scenarios.',
        grade: '50%',
        marks: '50/100',
        allowResubmit: true
      }
    ]
  }
];

const schoolCoursesData = [
  {
    id: 2,
    title: 'IGCSE English Language',
    instructor: 'Sarah Thompson',
    progress: 30,
    category: 'Language Arts',
    difficulty: 'Intermediate',
    duration: '10 weeks',
    isSchool: true,
    assignments: [
      {
        id: 301,
        title: 'Essay: Analysis of Romeo and Juliet',
        dueDate: '2023-09-22',
        status: 'Submitted',
        feedback: 'Your analysis shows good understanding of the themes, but work on strengthening your thesis statement. Your writing style is engaging, but be careful with run-on sentences.',
        grade: '78%',
        marks: '78/100',
        allowResubmit: false
      },
      {
        id: 302,
        title: 'Reading Comprehension Exercise',
        dueDate: '2023-10-01',
        status: 'Pending',
        feedback: '',
        grade: '',
        marks: '',
        allowResubmit: false
      }
    ]
  },
  {
    id: 3,
    title: 'IGCSE Mathematics',
    instructor: 'Michael Chen',
    progress: 45,
    category: 'Mathematics',
    difficulty: 'Intermediate',
    duration: '14 weeks',
    isSchool: true,
    assignments: [
      {
        id: 401,
        title: 'Quadratic Equations Set',
        dueDate: '2023-09-15',
        status: 'Submitted',
        feedback: 'You demonstrated a solid understanding of the concepts. Make sure to show all your steps, especially in problems 3 and 5.',
        grade: '88%',
        marks: '88/100',
        allowResubmit: false
      },
      {
        id: 402,
        title: 'Trigonometry Problems',
        dueDate: '2023-09-30',
        status: 'Pending',
        feedback: '',
        grade: '',
        marks: '',
        allowResubmit: false
      },
      {
        id: 403,
        title: 'Calculus Integration Problems',
        dueDate: '2023-09-10',
        status: 'Resubmit',
        feedback: 'Several integration methods were incorrectly applied. Please review the fundamental theorem of calculus and try again with the substitution method.',
        grade: '55%',
        marks: '55/100',
        allowResubmit: true
      }
    ]
  },
  {
    id: 4,
    title: 'IGCSE Combined Science',
    instructor: 'Dr. Amelia Patel',
    progress: 20,
    category: 'Science',
    difficulty: 'Intermediate',
    duration: '16 weeks',
    isSchool: true,
    assignments: [
      {
        id: 501,
        title: 'Lab Report: Photosynthesis',
        dueDate: '2023-09-18',
        status: 'Submitted',
        feedback: 'Your experimental design was thoughtful, but your analysis needs more depth. Consider discussing the relationship between light intensity and the rate of photosynthesis in more detail.',
        grade: '75%',
        marks: '45/100',
        allowResubmit: false
      },
      {
        id: 502,
        title: 'Chemical Reactions Assessment',
        dueDate: '2023-09-15',
        status: 'Submitted',
        feedback: 'Several concepts related to chemical equilibrium were misunderstood. Please review chapters 4-6 again and pay special attention to Le Chatelier\'s principle.',
        grade: '55%',
        marks: '35/100',
        allowResubmit: false
      },
      {
        id: 503,
        title: 'Physics Motion Problems',
        dueDate: '2023-09-20',
        status: 'Submitted',
        feedback: 'Your calculations contained several errors related to acceleration and velocity. Please review the formulas and try to be more careful with unit conversions.',
        grade: '50%',
        marks: '50/100',
        allowResubmit: false
      }
    ]
  },
  {
    id: 6,
    title: 'IGCSE Chemistry',
    instructor: 'Dr. Rachel Green',
    progress: 40,
    category: 'Science',
    difficulty: 'Advanced',
    duration: '12 weeks',
    isSchool: true,
    assignments: [
      {
        id: 601,
        title: 'Periodic Table Element Research',
        dueDate: '2023-09-28',
        status: 'Pending',
        feedback: '',
        grade: ''
      }
    ]
  },
  {
    id: 7,
    title: 'IGCSE Physics',
    instructor: 'Dr. David Kumar',
    progress: 35,
    category: 'Science',
    difficulty: 'Advanced',
    duration: '12 weeks',
    isSchool: true,
    assignments: [
      {
        id: 701,
        title: 'Forces and Motion Calculations',
        dueDate: '2023-10-03',
        status: 'Pending',
        feedback: '',
        grade: ''
      }
    ]
  }
];

const CourseAssignmentsList = ({ assignments, onAssignmentClick, onSubmitClick }) => {
  return (
    <List spacing={3} mt={4}>
      {assignments.map((assignment) => (
        <ListItem 
          key={assignment.id} 
          p={3} 
          borderWidth="1px" 
          borderRadius="md"
          cursor="pointer"
          bg="white"
          _hover={{ bg: "gray.100", transform: "translateY(-2px)" }}
          transition="all 0.2s"
          onClick={() => onAssignmentClick(assignment)}
          boxShadow="sm"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <HStack>
              <FaFileAlt color="#640101" />
              <Text fontWeight="medium">{assignment.title}</Text>
            </HStack>
            <Badge 
              colorScheme={
                assignment.status === 'Submitted' ? 'green' : 
                assignment.status === 'Resubmit' ? 'orange' :
                assignment.status === 'Late' ? 'red' : 'yellow'
              }
              fontSize="0.8em"
              px={2}
              py={1}
            >
              {assignment.status}
            </Badge>
          </Flex>
          
          <Flex justifyContent="space-between" alignItems="center" mt={2}>
            <Text fontSize="sm" color="gray.500">
              Due: {assignment.dueDate}
            </Text>
            {assignment.marks && (
              <Text fontSize="sm" color="gray.600" fontWeight="medium">
                Marks: {assignment.marks}
              </Text>
            )}
          </Flex>
          
          {(assignment.status === 'Pending' || assignment.status === 'Resubmit') && (
            <Button 
              size="sm" 
              colorScheme="red" 
              mt={3} 
              onClick={(e) => {
                e.stopPropagation();
                onSubmitClick(assignment);
              }}
              width="100%"
            >
              {assignment.status === 'Resubmit' ? 'Resubmit Assignment' : 'Submit Assignment'}
            </Button>
          )}
        </ListItem>
      ))}
    </List>
  );
};

const StudentCourses = () => {
  const [personalCourses, setPersonalCourses] = useState(personalCoursesData);
  const [schoolCourses, setSchoolCourses] = useState(schoolCoursesData);
  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submittingAssignment, setSubmittingAssignment] = useState(null);
  const [submissionFile, setSubmissionFile] = useState(null);
  const [submissionComment, setSubmissionComment] = useState("");
  const isSidebarCollapsed = useSidebarState();
  
  const accentColor = useColorModeValue('#640101', 'red.200');

  // Check for low marks and generate warnings
  const checkForWarnings = (courses, isSchoolCourse) => {
    const warnings = [];
    const PASSING_PERCENTAGE = 60; // Assuming 60% is the passing grade
    
    // Calculate average score and count failed assignments
    let totalScore = 0;
    let totalAssignments = 0;
    let failedAssignments = 0;
    let pendingAssignments = 0;
    
    courses.forEach(course => {
      course.assignments.forEach(assignment => {
        if (assignment.marks) {
          const score = parseInt(assignment.marks.split('/')[0]);
          const total = parseInt(assignment.marks.split('/')[1]);
          
          if (score && total) {
            totalScore += (score / total) * 100;
            totalAssignments++;
            
            if ((score / total) * 100 < PASSING_PERCENTAGE) {
              failedAssignments++;
            }
          }
        } else if (assignment.status === 'Pending') {
          pendingAssignments++;
        }
      });
    });
    
    const averageScore = totalAssignments > 0 ? totalScore / totalAssignments : 0;
    
    // Generate warnings based on the data
    if (averageScore < PASSING_PERCENTAGE) {
      if (isSchoolCourse) {
        warnings.push({
          type: 'critical',
          message: `We've found out that your marks are critically low (${averageScore.toFixed(1)}%). We suggest you to contact the representative of your institution or please prepare for your next repeater year.`
        });
      } else {
        warnings.push({
          type: 'critical',
          message: `We have found out that your marks are critically low (${averageScore.toFixed(1)}%). Please pay attention to the course and make every penny worthy.`
        });
      }
    } else if (failedAssignments >= 2) {
      if (isSchoolCourse) {
        warnings.push({
          type: 'warning',
          message: `You have failed ${failedAssignments} assignments. This could impact your overall grade. Consider seeking additional support from your teachers.`
        });
      } else {
        warnings.push({
          type: 'warning',
          message: `You have failed ${failedAssignments} assignments. We recommend reviewing the material and retaking these assignments if possible.`
        });
      }
    }
    
    if (pendingAssignments >= 3) {
      warnings.push({
        type: 'info',
        message: `You have ${pendingAssignments} pending assignments. Make sure to submit them before the due dates.`
      });
    }
    
    return warnings;
  };

  const handleCourseClick = (courseId) => {
    if (expandedCourseId === courseId) {
      setExpandedCourseId(null);
    } else {
      setExpandedCourseId(courseId);
    }
  };

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
    onOpen();
  };

  const handleSubmitClick = (assignment) => {
    setSubmittingAssignment(assignment);
    setSubmissionFile(null);
    setSubmissionComment("");
    setIsSubmitModalOpen(true);
  };

  const handleSubmitAssignment = () => {
    // In a real app, this would send the file to a server
    console.log("Submitting assignment:", submittingAssignment.id);
    console.log("File:", submissionFile);
    console.log("Comment:", submissionComment);
    
    // Update the assignment status in the state
    const isPersonalCourse = personalCourses.some(course => 
      course.assignments.some(a => a.id === submittingAssignment.id)
    );
    
    if (isPersonalCourse) {
      setPersonalCourses(prevCourses => 
        prevCourses.map(course => ({
          ...course,
          assignments: course.assignments.map(assignment => 
            assignment.id === submittingAssignment.id
              ? { ...assignment, status: 'Submitted' }
              : assignment
          )
        }))
      );
    } else {
      setSchoolCourses(prevCourses => 
        prevCourses.map(course => ({
          ...course,
          assignments: course.assignments.map(assignment => 
            assignment.id === submittingAssignment.id
              ? { ...assignment, status: 'Submitted' }
              : assignment
          )
        }))
      );
    }
    
    setIsSubmitModalOpen(false);
  };

  const renderCourseCards = (courses) => {
    if (courses.length === 0) {
      return <Text>No courses found</Text>;
    }

    // Adjust grid layout based on available space
    return (
      <Grid 
        templateColumns={{
          base: "1fr",
          sm: isSidebarCollapsed ? "repeat(auto-fill, minmax(240px, 1fr))" : "repeat(auto-fill, minmax(280px, 1fr))",
          md: isSidebarCollapsed ? "repeat(auto-fill, minmax(220px, 1fr))" : "repeat(auto-fill, minmax(260px, 1fr))",
          lg: isSidebarCollapsed ? "repeat(auto-fill, minmax(230px, 1fr))" : "repeat(auto-fill, minmax(280px, 1fr))",
          xl: isSidebarCollapsed ? "repeat(auto-fill, minmax(250px, 1fr))" : "repeat(auto-fill, minmax(300px, 1fr))"
        }}
        gap={6}
        width="100%"
      >
        {courses.map(course => (
          <GridItem key={course.id} width="full">
            <Card 
              borderWidth="1px" 
              borderRadius="lg" 
              overflow="hidden" 
              boxShadow="md"
              transition="all 0.3s ease"
              width="100%"
              height={expandedCourseId === course.id ? "auto" : "350px"}
              _hover={{ 
                boxShadow: 'xl' 
              }}
              display="flex"
              flexDirection="column"
            >
              <CardHeader 
                bg={`${accentColor}10`} 
                borderBottom={`1px solid ${accentColor}20`}
                cursor="pointer"
                onClick={() => handleCourseClick(course.id)}
                py={4}
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Heading size="md" color={accentColor}>
                    {course.title}
                  </Heading>
                  <Flex alignItems="center">
                    <Badge 
                      colorScheme={
                        course.difficulty === 'Advanced' ? 'red' : 
                        course.difficulty === 'Intermediate' ? 'yellow' : 'green'
                      }
                      mr={2}
                    >
                      {course.difficulty}
                    </Badge>
                    <Icon 
                      as={expandedCourseId === course.id ? FaChevronDown : FaChevronRight} 
                      color={accentColor}
                    />
                  </Flex>
                </Flex>
              </CardHeader>
              <CardBody
                flex="1"
                display="flex"
                flexDirection="column"
              >
                <VStack spacing={4} align="stretch" flex="1">
                  <HStack>
                    <FaChalkboardTeacher color={accentColor} />
                    <Text>Instructor: {course.instructor}</Text>
                  </HStack>
                  <HStack>
                    <FaBook color={accentColor} />
                    <Text>Category: {course.category}</Text>
                  </HStack>
                  <HStack>
                    <FaClock color={accentColor} />
                    <Text>Duration: {course.duration}</Text>
                  </HStack>
                  <Box mt="auto">
                    <Text mb={2}>Progress:</Text>
                    <Progress 
                      value={course.progress} 
                      colorScheme="red" 
                      size="sm" 
                      borderRadius="md"
                    />
                    <Text 
                      mt={2} 
                      fontSize="sm" 
                      color="gray.500"
                      textAlign="right"
                    >
                      {course.progress}% Complete
                    </Text>
                  </Box>
                  <Collapse in={expandedCourseId === course.id}>
                    <Divider my={3} />
                    <Box bg="gray.50" p={3} borderRadius="md" mt={2}>
                      <Flex align="center" mb={2}>
                        <Icon as={FaClipboardList} mr={2} color={accentColor} />
                        <Text fontWeight="medium">Assignments</Text>
                      </Flex>
                      <CourseAssignmentsList 
                        assignments={course.assignments} 
                        onAssignmentClick={handleAssignmentClick}
                        onSubmitClick={handleSubmitClick}
                      />
                    </Box>
                  </Collapse>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
        ))}
      </Grid>
    );
  };

  return (
    <Flex width="100%" height="100%">
      <StudentSidebar />
      
      <Box 
        ml={isSidebarCollapsed ? "60px" : "250px"} 
        width={isSidebarCollapsed ? "calc(100% - 60px)" : "calc(100% - 250px)"}
        mt="85px" 
        pb={8} 
        px={{ base: 4, md: 6 }}
        position="relative"
        bg="gray.50"
        transition="all 0.3s ease"
        id="mainContent"
        flex="1"
        overflowX="hidden"
      >
        <Container 
          maxW={isSidebarCollapsed ? "container.xl" : "container.lg"} 
          p={0} 
          mx="auto" 
          transition="all 0.3s ease"
          width="100%"
        >
          <VStack spacing={8} align="stretch" width="100%">
            <Heading as="h1" size="xl" color={accentColor}>My Workspace</Heading>
            
            <Tabs isFitted variant="enclosed" colorScheme="red" width="100%">
              <TabList mb="1em">
                <Tab _selected={{ color: accentColor, borderColor: accentColor }}>My Courses</Tab>
                <Tab _selected={{ color: accentColor, borderColor: accentColor }}>School Courses</Tab>
              </TabList>
              <TabPanels width="100%">
                <TabPanel p={4} bg="white" borderRadius="md" boxShadow="sm" width="100%">
                  {checkForWarnings(personalCourses, false).map((warning, index) => (
                    <Alert 
                      key={index} 
                      status={warning.type === 'critical' ? 'error' : warning.type === 'warning' ? 'warning' : 'info'} 
                      mb={4}
                      borderRadius="md"
                    >
                      <AlertIcon as={FaExclamationTriangle} />
                      <AlertDescription>{warning.message}</AlertDescription>
                    </Alert>
                  ))}
                  {renderCourseCards(personalCourses)}
                </TabPanel>
                <TabPanel p={4} bg="white" borderRadius="md" boxShadow="sm" width="100%">
                  {checkForWarnings(schoolCourses, true).map((warning, index) => (
                    <Alert 
                      key={index} 
                      status={warning.type === 'critical' ? 'error' : warning.type === 'warning' ? 'warning' : 'info'} 
                      mb={4}
                      borderRadius="md"
                    >
                      <AlertIcon as={FaExclamationTriangle} />
                      <AlertDescription>{warning.message}</AlertDescription>
                    </Alert>
                  ))}
                  {renderCourseCards(schoolCourses)}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        </Container>
      </Box>

      {/* Assignment Feedback Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={accentColor}>
            {selectedAssignment?.title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack align="stretch" spacing={4}>
              <Flex justify="space-between">
                <Text><strong>Due Date:</strong> {selectedAssignment?.dueDate}</Text>
                <Badge 
                  colorScheme={
                    selectedAssignment?.status === 'Submitted' ? 'green' : 
                    selectedAssignment?.status === 'Resubmit' ? 'orange' :
                    selectedAssignment?.status === 'Late' ? 'red' : 'yellow'
                  }
                >
                  {selectedAssignment?.status}
                </Badge>
              </Flex>
              
              {selectedAssignment?.marks && (
                <Text><strong>Marks:</strong> {selectedAssignment.marks}</Text>
              )}
              
              <Box>
                <Text fontWeight="bold" mb={2}>Tutor Feedback:</Text>
                <Box p={4} bg="gray.50" borderRadius="md">
                  {selectedAssignment?.feedback ? (
                    <Text>{selectedAssignment.feedback}</Text>
                  ) : (
                    <Text color="gray.500">No feedback available yet.</Text>
                  )}
                </Box>
              </Box>
              
              {selectedAssignment?.status === 'Resubmit' && (
                <Button 
                  colorScheme="red" 
                  onClick={() => {
                    onClose();
                    handleSubmitClick(selectedAssignment);
                  }}
                >
                  Resubmit This Assignment
                </Button>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* Assignment Submission Modal */}
      <Modal isOpen={isSubmitModalOpen} onClose={() => setIsSubmitModalOpen(false)} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={accentColor}>
            {submittingAssignment?.status === 'Resubmit' ? 'Resubmit Assignment' : 'Submit Assignment'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack align="stretch" spacing={4}>
              <Box>
                <Text fontWeight="bold" mb={2}>Assignment:</Text>
                <Text>{submittingAssignment?.title}</Text>
              </Box>
              
              <Box>
                <Text fontWeight="bold" mb={2}>Due Date:</Text>
                <Text>{submittingAssignment?.dueDate}</Text>
              </Box>
              
              {submittingAssignment?.status === 'Resubmit' && (
                <Box>
                  <Text fontWeight="bold" mb={2}>Previous Feedback:</Text>
                  <Box p={4} bg="gray.50" borderRadius="md">
                    <Text>{submittingAssignment?.feedback}</Text>
                  </Box>
                </Box>
              )}
              
              <Box>
                <Text fontWeight="bold" mb={2}>Upload Your Work:</Text>
                <Flex 
                  direction="column" 
                  borderWidth="2px" 
                  borderRadius="md" 
                  borderStyle="dashed" 
                  borderColor="gray.300"
                  p={6}
                  justify="center"
                  align="center"
                  bg="gray.50"
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  <input
                    type="file"
                    id="file-upload"
                    style={{ display: 'none' }}
                    onChange={(e) => setSubmissionFile(e.target.files[0])}
                  />
                  <Icon as={FaFileAlt} boxSize={10} color="gray.400" mb={3} />
                  <Text>
                    {submissionFile ? submissionFile.name : 'Click to upload or drag and drop'}
                  </Text>
                  <Text fontSize="sm" color="gray.500" mt={2}>
                    Supported formats: PDF, DOCX, ZIP
                  </Text>
                </Flex>
              </Box>
              
              <Box>
                <Text fontWeight="bold" mb={2}>Comments (Optional):</Text>
                <textarea
                  value={submissionComment}
                  onChange={(e) => setSubmissionComment(e.target.value)}
                  placeholder="Add any comments for your instructor..."
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    borderRadius: '4px',
                    border: '1px solid #E2E8F0',
                    minHeight: '100px'
                  }}
                />
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button 
              colorScheme="gray" 
              mr={3} 
              onClick={() => setIsSubmitModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              colorScheme="red" 
              onClick={handleSubmitAssignment}
              isDisabled={!submissionFile}
            >
              {submittingAssignment?.status === 'Resubmit' ? 'Resubmit' : 'Submit'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default StudentCourses;
