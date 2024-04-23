import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  email: "",
  role: "",
  first_name: "",
  last_name: "",
  telegram:"",
  position:"",
  phone_number: "",
  profile_photo: "",
  student_courses: [],
  mentor_courses: [],
  tokens: {
    refresh: "",
    access: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: ( state, action) => {
      const {
        id,
        email,
        role,
        first_name,
        last_name,
        telegram,
        phone_number,
        profile_photo,
        position,
        tokens,
        student_courses,
        mentor_courses,
      } = action.payload;

      state.id = id;
      state.email = email;
      state.role = role;
      state.first_name = first_name;
      state.last_name = last_name;
      state.phone_number = phone_number;
      state.telegram = telegram;
      state.profile_photo = profile_photo;
      state.position = position;
      state.tokens = tokens;
      state.student_courses = student_courses;
      state.mentor_courses = mentor_courses;

      localStorage.setItem("user", JSON.stringify(state));
      localStorage.setItem("token", state.tokens.access);
      localStorage.setItem("refresh", state.tokens.refresh)
    },
    logout: () => {
      localStorage.clear()
    },
  },
});

export const selectAuth = (state) => state.auth;

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
