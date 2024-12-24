import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { fetchSurveyById, addOption } from '../Redux/Slices/CreatesurveySlices';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Loader, Plus } from 'lucide-react';
import Input from '../components/ui/input';

interface AddOptionForm {
  questionId: string;
  optionText: string;
}

const SingleSurveyPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentSurvey, loading } = useAppSelector((state) => state.Survey);
  const [isAddOptionModalOpen, setIsAddOptionModalOpen] = useState(false);
  const [addOptionForm, setAddOptionForm] = useState<AddOptionForm>({
    questionId: '',
    optionText: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchSurveyById(id));
    }
  }, [dispatch, id]);

  const handleAddOptionClick = (questionId: string) => {
    setAddOptionForm({
      questionId,
      optionText: '',
    });
    setIsAddOptionModalOpen(true);
  };

  const handleAddOptionSubmit = async () => {
    try {
      await dispatch(
        addOption({
          question_id: addOptionForm.questionId,
          option_data: { option_text: addOptionForm.optionText },
        })
      ).unwrap();
      
      setIsAddOptionModalOpen(false);
      setAddOptionForm({ questionId: '', optionText: '' });
      
      if (id) {
        dispatch(fetchSurveyById(id));
      }
    } catch (error) {
      console.error('Failed to add option:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!currentSurvey.survey) {
    return <div className="text-center p-4">Survey not found</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {currentSurvey.survey.title}
          </CardTitle>
          <p className="text-gray-600">{currentSurvey.survey.description}</p>
        </CardHeader>
      </Card>

      <div className="space-y-6">
        {currentSurvey.questions.map((question) => {
          const questionOptions = currentSurvey.options.filter(
            (option) => option.question_id === question.id
          );

          return (
            <Card key={question.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{question.question_text}</CardTitle>
                  <button
                    onClick={() => handleAddOptionClick(question.id)}
                    className="bg-[#1C4A93] px-4 py-2 rounded-md flex items-center gap-2 text-sm text-white hover:bg-[#15397A] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Option
                  </button>
                </div>
                <p className="text-sm text-gray-500">Type: {question.question_type}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {questionOptions.map((option) => (
                    <div
                      key={option.id}
                      className="p-3 bg-gray-50 rounded-md flex items-center"
                    >
                      <span>{option.option_text}</span>
                    </div>
                  ))}
                  {questionOptions.length === 0 && (
                    <p className="text-gray-500 italic">No options added yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={isAddOptionModalOpen} onOpenChange={setIsAddOptionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Option</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={addOptionForm.optionText}
              onChange={(e) =>
                setAddOptionForm({ ...addOptionForm, optionText: e.target.value })
              }
              placeholder="Enter option text"
            />
          </div>
          <DialogFooter>
            <button
              onClick={() => setIsAddOptionModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleAddOptionSubmit}
              className="bg-[#1C4A93] px-4 py-2 rounded-md text-white hover:bg-[#15397A] transition-colors"
            >
              Add Option
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SingleSurveyPage;