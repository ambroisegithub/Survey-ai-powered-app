import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import {
  fetchSurveys,
  deleteSurvey,
  updateSurvey,
  createSurvey,
  addQuestion,
  Survey,
} from "../Redux/Slices/CreatesurveySlices";
import { useNavigate } from "react-router-dom";
import { Card, CardTitle, CardContent } from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import Input from "../components/ui/input";
import Textarea from "../components/ui/textarea";
import { Loader, Pencil, Trash2, Plus, FileQuestion,Eye } from "lucide-react";
import ConfirmationCard from "../components/Confirmation/ConfirmationCard";

interface SurveyFormData {
  title: string;
  description: string;
}

const SurveyManagement = () => {
  const dispatch = useAppDispatch();
  const { surveys, loading, error } = useAppSelector((state) => state.Survey);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [currentsurveyId, setCurrentSurveyId] = useState<
  string | null
>(null);
const [isConfirmationModalVisible, setModalVisible] = useState(false);
const navigate = useNavigate();
  const [formData, setFormData] = useState<SurveyFormData>({
    title: "",
    description: "",
  });
  const [questionData, setQuestionData] = useState({
    question_text: "",
    question_type: "MULTIPLE_CHOICE",
  });

  useEffect(() => {
    dispatch(fetchSurveys({}));
  }, [dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuestionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setQuestionData({
      ...questionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (survey: Survey) => {
    setSelectedSurvey(survey);
    setFormData({
      title: survey.title,
      description: survey.description,
    });
    setIsEditModalOpen(true);
  };



  const handleAddQuestion = (survey: Survey) => {
    setSelectedSurvey(survey);
    setIsAddQuestionModalOpen(true);
  };

  const handleSubmitEdit = async () => {
    if (selectedSurvey) {
      await dispatch(updateSurvey({ id: selectedSurvey.id, data: formData }));
      setIsEditModalOpen(false);
      dispatch(fetchSurveys({}));
    }
  };

  const handleDeleteClick = (id: string) => {
    setCurrentSurveyId(id);
    setModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (currentsurveyId !== null) {
      await dispatch(deleteSurvey(currentsurveyId));
      setModalVisible(false);
      dispatch(fetchSurveys({}));
    }
    setCurrentSurveyId(null);
  };

  const handleDeleteCancel = () => {
    setModalVisible(false);
    setCurrentSurveyId(null);
  };
  const handleSubmitNewSurvey = async () => {
    await dispatch(createSurvey({ ...formData, creator_id: "8d95b634-5e24-4829-b12b-184861e586c2" })); 
    setIsAddModalOpen(false);
    setFormData({ title: "", description: "" });
    dispatch(fetchSurveys({}));
  };

  const handleSubmitQuestion = async () => {
    if (selectedSurvey) {
      await dispatch(
        addQuestion({
          survey_id: selectedSurvey.id,
          question_data: questionData,
        })
      );
      setIsAddQuestionModalOpen(false);
      setQuestionData({ question_text: "", question_type: "MULTIPLE_CHOICE" });
    }
  };
  const handleView = (surveyId: string) => {
    navigate(`/survey/${surveyId}`);
  };
  if (loading && !surveys.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <CardTitle className="text-2xl font-bold">Survey Management</CardTitle>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#1C4A93]  px-6 py-3 rounded-md flex justify-center items-center gap-2 text-sm active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in transition-all text-white"
        >
          <Plus className="w-4 h-4" /> Create Survey
        </button>
      </div>

      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left">Title</th>
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4 text-left">Created At</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {surveys.map((survey) => (
                  <tr key={survey.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{survey.title}</td>
                    <td className="p-4">
                      <div className="max-w-md truncate">
                        {survey.description}
                      </div>
                    </td>
                    <td className="p-4">
                      {new Date(survey.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(survey)}
                          className="bg-[#1C4A93]  px-6 py-3 rounded-md flex justify-center items-center gap-2 text-sm active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in transition-all text-white"
                          title="Edit Survey"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAddQuestion(survey)}
                          className="bg-[#1C4A93]  px-6 py-3 rounded-md flex justify-center items-center gap-2 text-sm active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in transition-all text-white"
                          title="Add Question"
                        >
                          <FileQuestion className="w-4 h-4" />
                        </button>
                        <button
                           onClick={() => handleDeleteClick(survey.id)}
                          className="bg-[#1C4A93]  px-6 py-3 rounded-md flex justify-center items-center gap-2 text-sm active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in transition-all text-white"
                          title="Delete Survey"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleView(survey.id)}
                          className="bg-[#1C4A93] px-6 py-3 rounded-md flex justify-center items-center gap-2 text-sm active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in transition-all text-white"
                          title="View Survey"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Survey Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Survey</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Survey Title"
            />
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Survey Description"
            />
          </div>
          <DialogFooter>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="bg-[#1C4A93]  px-6 py-3 rounded-md flex justify-center items-center gap-2 text-sm active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in transition-all text-white"
            >
              Cancel
            </button>
            <button onClick={handleSubmitEdit}>Save Changes</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Survey</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Survey Title"
            />
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Survey Description"
            />
          </div>
          <DialogFooter>
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="bg-[#1C4A93]  px-6 py-3 rounded-md flex justify-center items-center gap-2 text-sm active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in transition-all text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitNewSurvey}
              className="bg-[#1C4A93]  px-6 py-3 rounded-md flex justify-center items-center gap-2 text-sm active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in transition-all text-white"
            >
              Create Survey
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isAddQuestionModalOpen}
        onOpenChange={setIsAddQuestionModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Question</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              name="question_text"
              value={questionData.question_text}
              onChange={handleQuestionChange}
              placeholder="Question Text"
            />
            <select
              name="question_type"
              value={questionData.question_type}
              onChange={handleQuestionChange}
              className="w-full p-2 border rounded"
            >
              <option value="MULTIPLE_CHOICE">Multiple Choice</option>
              <option value="SINGLE_CHOICE">Single Choice</option>
              <option value="TEXT">Text</option>
            </select>
          </div>
          <DialogFooter>
            <button
              onClick={() => setIsAddQuestionModalOpen(false)}
              className="bg-[#1C4A93]  px-6 py-3 rounded-md flex justify-center items-center gap-2 text-sm active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in transition-all text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitQuestion}
              className="bg-[#1C4A93]  px-6 py-3 rounded-md flex justify-center items-center gap-2 text-sm active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in transition-all text-white"
            >
              Add Question
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmationCard
        isVisible={isConfirmationModalVisible}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        message="Are you sure you want to delete this Survey?"
      />
      
    </div>
  );
};

export default SurveyManagement;
