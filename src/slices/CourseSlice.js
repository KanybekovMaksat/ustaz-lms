// coursesSlice.js

import { createSlice } from '@reduxjs/toolkit';
import CourseService from '../services/CourseService';

const initialState = {
  courses: [],
  loading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    fetchCoursesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCoursesSuccess(state, action) {
      state.loading = false;
      state.courses = action.payload;
    },
    fetchCoursesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCoursesStart, fetchCoursesSuccess, fetchCoursesFailure } = coursesSlice.actions;

export const fetchAllCourses = (courseIds) => async (dispatch) => {
  try {
    dispatch(fetchCoursesStart());

    const courses = [];

    for (const courseId of courseIds) {
      const response = await CourseService.getCourse(courseId);
      courses.push(response.data);
    }
     dispatch(fetchCoursesSuccess(courses));
  } catch (error) {
    console.error(error.response);
    dispatch(fetchCoursesFailure('Failed to fetch courses.'));
  }
};

export const selectCourses = (state) => state.courses.courses;
export const selectLoading = (state) => state.loading;
export const selectError = (state) => state.error;

export default coursesSlice.reducer;
