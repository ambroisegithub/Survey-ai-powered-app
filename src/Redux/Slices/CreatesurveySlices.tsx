/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showSuccessToast, showErrorToast } from '../../utilis/ToastProps';

export interface Survey {
    id: string;
    title: string;
    description: string;
    creator_id: string;
    created_at: string;
  }
interface Question {
  question_text: string;
  id: string;
  survey_id: string;
  text: string;
  question_type: string;
}

interface Option {
  option_text: string;
  id: string;
  question_id: string;
  text: string;
}


interface Answer {
  question_id: string;
  option_id?: string; 
  text_answer?: string; 
}



interface SurveyState {
  surveys: Survey[];
  currentSurvey: {
    survey: Survey | null;
    questions: Question[];
    options: Option[];
  };
  loading: boolean;
  error: string | null;
}

const initialState: SurveyState = {
  surveys: [],
  currentSurvey: {
    survey: null,
    questions: [],
    options: []
  },
  loading: false,
  error: null
};

const apiUrl = `${import.meta.env.VITE_BASE_URL}/surveys`;


export const fetchSurveys = createAsyncThunk(
  'survey/fetchSurveys',
  async (params: { creator_id?: string; start_date?: string; end_date?: string }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(params as any).toString();
      const response = await axios.get(`${apiUrl}?${queryParams}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch surveys');
    }
  }
);

export const fetchSurveyById = createAsyncThunk(
  'survey/fetchSurveyById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch survey');
    }
  }
);

export const createSurvey = createAsyncThunk(
  'survey/createSurvey',
  async (surveyData: { title: string; description: string; creator_id: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiUrl, surveyData);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create survey');
    }
  }
);

export const updateSurvey = createAsyncThunk(
  'survey/updateSurvey',
  async ({ id, data }: { id: string; data: { title: string; description: string } }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${apiUrl}/${id}`, data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update survey');
    }
  }
);

export const deleteSurvey = createAsyncThunk(
  'Survey/deleteSurvey',
  async (id: string, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No token found');
    }

    try {
       await axios.delete(`${apiUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return id;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete Survey';
      showErrorToast(errorMessage);
      
      return rejectWithValue(errorMessage);
    }
  }
);

export const submitSurveyResponse = createAsyncThunk(
  'survey/submitResponse',
  async (responseData: { survey_id: string; user_id: string; answers: Answer[] }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/responses`, responseData);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit response');
    }
  }
);


export const addQuestion = createAsyncThunk(
  'survey/addQuestion',
  async ({ survey_id, question_data }: { 
    survey_id: string; 
    question_data: { question_text: string; question_type: string } 
  }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/${survey_id}/questions`, question_data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add question');
    }
  }
);

export const addOption = createAsyncThunk(
  'survey/addOption',
  async ({ question_id, option_data }: { 
    question_id: string; 
    option_data: { option_text: string } 
  }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/options/${question_id}`, option_data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add option');
    }
  }
);

export const createAISurvey = createAsyncThunk(
  'survey/createAISurvey',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/ai-survey`, data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create AI survey');
    }
  }
);

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    resetSurveyState: (state) => {
      state.loading = false;
      state.error = null;
    },
    clearCurrentSurvey: (state) => {
      state.currentSurvey = {
        survey: null,
        questions: [],
        options: []
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Surveys
      .addCase(fetchSurveys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSurveys.fulfilled, (state, action) => {
        state.loading = false;
        state.surveys = action.payload;
        state.error = null;
      })
      .addCase(fetchSurveys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        showErrorToast(state.error);
      })

      // Fetch Survey by ID
      .addCase(fetchSurveyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSurveyById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSurvey = action.payload;
        state.error = null;
      })
      .addCase(fetchSurveyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        showErrorToast(state.error);
      })

      // Create Survey
      .addCase(createSurvey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSurvey.fulfilled, (state, action) => {
        state.loading = false;
        state.surveys.push(action.payload);
        showSuccessToast('Survey created successfully');
      })
      .addCase(createSurvey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        showErrorToast(state.error);
      })

      // Update Survey
      .addCase(updateSurvey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSurvey.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.surveys.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.surveys[index] = action.payload;
        }
        showSuccessToast('Survey updated successfully');
      })
      .addCase(updateSurvey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        showErrorToast(state.error);
      })

      // Delete Survey
      .addCase(deleteSurvey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSurvey.fulfilled, (state, action) => {
        state.loading = false;
        state.surveys = state.surveys.filter(s => s.id !== action.payload.id);
        showSuccessToast('Survey deleted successfully');
      })
      .addCase(deleteSurvey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        showErrorToast(state.error);
      })

      // Submit Response
      .addCase(submitSurveyResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitSurveyResponse.fulfilled, (state) => {
        state.loading = false;
        showSuccessToast('Response submitted successfully');
      })
      .addCase(submitSurveyResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        showErrorToast(state.error);
      })

      // Add Question
      .addCase(addQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentSurvey.survey) {
          state.currentSurvey.questions.push(action.payload);
        }
        showSuccessToast('Question added successfully');
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        showErrorToast(state.error);
      })

      // Add Option
      .addCase(addOption.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOption.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentSurvey.survey) {
          state.currentSurvey.options.push(action.payload);
        }
        showSuccessToast('Option added successfully');
      })
      .addCase(addOption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        showErrorToast(state.error);
      })

      // Create AI Survey
      .addCase(createAISurvey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAISurvey.fulfilled, (state, action) => {
        state.loading = false;
        state.surveys.push(action.payload);
        showSuccessToast('AI Survey created successfully');
      })
      .addCase(createAISurvey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        showErrorToast(state.error);
      });
  }
});

export const { resetSurveyState, clearCurrentSurvey } = surveySlice.actions;

export default surveySlice.reducer;