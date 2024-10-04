import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";

// userLogin action
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });
      
      // If login is successful, store token and redirect
      if (data.success) {
        alert(data.message);
        localStorage.setItem("token", data.token);
        window.location.replace("/");
        return data;
      }
      
      // Handle case where login was not successful but no error was thrown
      return rejectWithValue(data.message || "Login failed");
      
    } catch (error) {
      // Handle error responses
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// userRegister action
export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      role,
      email,
      password,
      phone,
      organisationName,
      address,
      hospitalName,
      website,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("/auth/register", {
        name,
        role,
        email,
        password,
        phone,
        organisationName,
        address,
        hospitalName,
        website,
      });

      // If registration is successful, redirect to login page
      if (data?.success) {
        alert("User Registered Successfully");
        window.location.replace("/login");
        return data;
      } 
      // Handle case where email already exists
      else if (email) {
        window.location.reload();
        return rejectWithValue("User already exists");
      }

    } catch (error) {
      // Log error and return custom message
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// getCurrentUser action
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/auth/current-user");
      
      // Return the user data if it exists
      if (data) {
        return data;
      }

    } catch (error) {
      // Log the error and return custom error message
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
