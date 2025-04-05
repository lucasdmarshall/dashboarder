import React from 'react';
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
  useColorModeValue
} from '@chakra-ui/react';
import { FaBook, FaChalkboardTeacher, FaClock } from 'react-icons/fa';
import StudentSidebar from '../components/StudentSidebar';

const coursesData = [
  {
    id: 1,
    title: 'Introduction to Machine Learning',
    instructor: 'Elena Rodriguez',
    progress: 65,
    category: 'Computer Science',
    difficulty: 'Advanced',
    duration: '12 weeks'
  },
  {
    id: 2,
    title: 'IGCSE English Language',
    instructor: 'Sarah Thompson',
    progress: 30,
    category: 'Language Arts',
    difficulty: 'Intermediate',
    duration: '10 weeks'
  },
  {
    id: 3,
    title: 'IGCSE Mathematics',
    instructor: 'Michael Chen',
    progress: 45,
    category: 'Mathematics',
    difficulty: 'Intermediate',
    duration: '14 weeks'
  },
  {
    id: 4,
    title: 'IGCSE Combined Science',
    instructor: 'Dr. Amelia Patel',
    progress: 20,
    category: 'Science',
    difficulty: 'Intermediate',
    duration: '16 weeks'
  },
  {
    id: 5,
    title: 'IGCSE Biology',
    instructor: 'Dr. James Wilson',
    progress: 55,
    category: 'Science',
    difficulty: 'Advanced',
    duration: '12 weeks'
  },
  {
    id: 6,
    title: 'IGCSE Chemistry',
    instructor: 'Dr. Rachel Green',
    progress: 40,
    category: 'Science',
    difficulty: 'Advanced',
    duration: '12 weeks'
  },
  {
    id: 7,
    title: 'IGCSE Physics',
    instructor: 'Dr. David Kumar',
    progress: 35,
    category: 'Science',
    difficulty: 'Advanced',
    duration: '12 weeks'
  }
];

const StudentCourses = () => {
  const [courses, setCourses] = React.useState(coursesData);
  
  const accentColor = useColorModeValue('#640101', 'red.200');

  React.useEffect(() => {
    console.log('Courses:', courses);
  }, [courses]);

  if (courses.length === 0) {
    return (
      <Flex>
        <StudentSidebar />
        <Box ml="250px" width="calc(100% - 250px)" mt="85px">
          <Text>No courses available</Text>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex>
      <StudentSidebar />
      
      <Box 
        ml="250px" 
        width="calc(100% - 250px)" 
        mt="85px" 
        pb={8} 
        px={6} 
        position="relative"
        bg="gray.50"
      >
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            <Heading as="h1" size="xl" color={accentColor}>My Courses</Heading>
            
            {courses.length > 0 ? (
              <Grid 
                templateColumns="repeat(auto-fill, minmax(250px, 1fr))" 
                gap={6}
                width="full"
              >
                {courses.map(course => (
                  <GridItem key={course.id} width="full">
                    <Card 
                      borderWidth="1px" 
                      borderRadius="lg" 
                      overflow="hidden" 
                      boxShadow="md"
                      transition="all 0.3s"
                      width="full"
                      _hover={{ 
                        transform: 'scale(1.02)', 
                        boxShadow: 'xl' 
                      }}
                    >
                      <CardHeader 
                        bg={`${accentColor}10`} 
                        borderBottom={`1px solid ${accentColor}20`}
                      >
                        <Flex justifyContent="space-between" alignItems="center">
                          <Heading size="md" color={accentColor}>
                            {course.title}
                          </Heading>
                          <Badge 
                            colorScheme={
                              course.difficulty === 'Advanced' ? 'red' : 
                              course.difficulty === 'Intermediate' ? 'yellow' : 'green'
                            }
                          >
                            {course.difficulty}
                          </Badge>
                        </Flex>
                      </CardHeader>
                      <CardBody>
                        <VStack spacing={4} align="stretch">
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
                          <Box>
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
                        </VStack>
                      </CardBody>
                    </Card>
                  </GridItem>
                ))}
              </Grid>
            ) : (
              <Text>No courses found</Text>
            )}
          </VStack>
        </Container>
      </Box>
    </Flex>
  );
};

export default StudentCourses;
