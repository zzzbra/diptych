import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { UnauthOnlyRoute, PrivateRoute } from 'views/PrivateRoute';
import TeacherDashboard from 'views/Dashboard/TeacherDashboard';
import StudentDashboard from 'views/Dashboard/StudentDashboard';
import Login from 'views/Login';
import Signup from 'views/Signup';
import TeacherRegistrar from 'views/Registrar/TeacherView';
import StudentRegistrar from 'views/Registrar/StudentView';
import CoursePlanner from 'views/CourseOverview/CoursePlanner';
import Syllabus from 'views/CourseOverview/Syllabus';
import LessonPlanner from 'views/Lesson/LessonPlanner';
import Lesson from 'views/Lesson/Lesson';
import StudySession from 'views/StudySession';
import ModalDispatcher from 'features/modalStack/ModalDispatcher';
import Button from 'components/Button';

import PageContentWrapper from 'components/PageContentWrapper';

import { useAuth } from 'features/auth/hooks';
import { useSelector } from 'react-redux';
import {
  pushModal,
  popModal,
  selectCurrentModal,
} from 'features/modalStack/modalStack.slice';

function App() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  // const { Component: CurrentModalChildren, props: currentModalProps } =
  //   useSelector(selectCurrentModal);
  const modalState = useSelector(selectCurrentModal);
  console.log(modalState);

  const modalProps = {
    title: 'Title',
    children: () => <div>Hello world!</div>,
    onConfirmation: () => {
      window.alert('Confirmed!');
      dispatch(popModal());
    },
    confirmButtonText: 'Confirm',
    onDismissal: () => {
      dispatch(popModal());
    },
    dismissButtonText: 'Nevermind',
  };

  return (
    <>
      <Button
        onClick={() => {
          console.log('clicked');
          dispatch(pushModal({ props: modalProps }));
        }}
      >
        Push Modal
      </Button>
      <Router>
        <PageContentWrapper>
          <Switch>
            <Route exact path="/">
              <h2>Welcome!</h2>
              <h1>This is MOOC-SRS</h1>
              <p>Get ready to learn better than ever.</p>
            </Route>

            <UnauthOnlyRoute exact path="/login">
              <Login />
            </UnauthOnlyRoute>

            <UnauthOnlyRoute exact path="/signup">
              <Signup />
            </UnauthOnlyRoute>

            <PrivateRoute exact path="/dashboard">
              {user?.userIsTeacher ? (
                <TeacherDashboard />
              ) : (
                <StudentDashboard />
              )}
            </PrivateRoute>

            <PrivateRoute exact path="/registrar">
              {user?.userIsTeacher ? (
                <TeacherRegistrar />
              ) : (
                <StudentRegistrar />
              )}
            </PrivateRoute>

            <PrivateRoute exact path="/courses/:courseId">
              {user?.userIsTeacher ? <CoursePlanner /> : <Syllabus />}
            </PrivateRoute>

            <PrivateRoute exact path="/lessons/:lessonId">
              {user?.userIsTeacher ? <LessonPlanner /> : <Lesson />}
            </PrivateRoute>

            {/* TODO: StudySession */}
            <PrivateRoute exact path="/study-session">
              <StudySession />
            </PrivateRoute>

            <Route
              path="*"
              component={() => <h1>Uh Oh! Page not found!!</h1>}
            />
          </Switch>
        </PageContentWrapper>
      </Router>
      <ModalDispatcher />
    </>
  );
}

export default App;
