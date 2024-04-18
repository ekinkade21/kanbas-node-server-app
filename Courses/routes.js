import * as dao from "./dao.js";
let currentCourse = null;
export default function CourseRoutes(app) {
  const createCourse = async (req, res) => {
    const course = await dao.createCourse(req.body);
    res.json(course);
  };
  const deleteCourse = async (req, res) => {
    const status = await dao.deleteCourse(req.params.courseId);
    res.json(status);
  };
  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  };
  const findCourseById = async (req, res) => {
    const { courseId } = req.params;
    const course = await dao.findCourseById(courseId);
    res.json(course);
  };
  const signup = async (req, res) => {
    const course = await dao.findCourseByCoursename(req.body.name);
    if (course) {
      res.status(400).json(
        { message: "Course name already taken" });
    } else {
        currentCourse = await dao.createCourse(req.body);
        res.json(currentCourse);
    }
  };
  const profile = async (req, res) => {
    res.json(currentCourse);
  };
  const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.updateCourse(courseId, req.body);
    currentCourse = await dao.findCourseById(courseId);
    res.json(status);
  };
  const signout = (req, res) => {
    currentCourse = null;
    res.sendStatus(200);
  };
  
  app.post("/api/courses", createCourse);
  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:courseId", findCourseById);
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.post("/api/courses/signup", signup);
  app.post("/api/courses/signout", signout);
  app.post("/api/courses/profile", profile);
}
