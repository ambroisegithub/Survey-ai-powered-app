import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { fetchSurveyById, submitSurveyResponse } from '../Redux/Slices/CreatesurveySlices';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Check, Loader, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

interface Answer {
  question_id: string;
  option_id: string;
  text_answer: string;
}

interface SelectedOption {
  option_id: string;
  option_text: string;
}

const SurveyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentSurvey, loading } = useAppSelector((state) => state.Survey);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, SelectedOption>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (id) {
      // Check if survey was already submitted
      const submittedSurveys = JSON.parse(localStorage.getItem('submittedSurveys') || '{}');
      if (submittedSurveys[id]) {
        setHasSubmitted(true);
      }
      dispatch(fetchSurveyById(id));
    }
  }, [dispatch, id]);

  const handleOptionSelect = (questionId: string, optionId: string, optionText: string) => {
    if (hasSubmitted) return;
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: {
        option_id: optionId,
        option_text: optionText
      },
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentSurvey.questions.length - 1) {
      setSlideDirection('right');
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setSlideDirection('left');
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!id || hasSubmitted) return;
    
    setIsSubmitting(true);
    const answers: Answer[] = Object.entries(selectedOptions).map(([questionId, selected]) => ({
      question_id: questionId,
      option_id: selected.option_id,
      text_answer: selected.option_text
    }));

    try {
      await dispatch(submitSurveyResponse({
        survey_id: id,
        user_id: '8d95b634-5e24-4829-b12b-184861e586c2',
        answers,
      })).unwrap();
      
      // Store submission in localStorage
      const submittedSurveys = JSON.parse(localStorage.getItem('submittedSurveys') || '{}');
      submittedSurveys[id] = true;
      localStorage.setItem('submittedSurveys', JSON.stringify(submittedSurveys));
      
      setHasSubmitted(true);
      setShowThankYouModal(true);
    } catch (error) {
      console.error('Failed to submit survey:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ThankYouModal = () => (
    <Dialog open={showThankYouModal} onOpenChange={setShowThankYouModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-green  flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Thank You!</h2>
              <p className="text-gray-600 text-base font-normal">
                Your survey response has been successfully submitted.
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-8 h-8 animate-spin text-[#1C4A93]" />
      </div>
    );
  }

  if (!currentSurvey.survey || currentSurvey.questions.length === 0) {
    return <div className="text-center p-4">Survey not found</div>;
  }

  const currentQuestion = currentSurvey.questions[currentQuestionIndex];
  const questionOptions = currentSurvey.options.filter(
    (option) => option.question_id === currentQuestion.id
  );
  const isLastQuestion = currentQuestionIndex === currentSurvey.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const hasSelectedOption = Boolean(selectedOptions[currentQuestion.id]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {hasSubmitted && (
        <div className="bg-blue border border-[#1C4A93] rounded-md p-4 mb-4">
          <p className="text-white text-center">
            You have already submitted this survey. Thank you for your participation!
          </p>
        </div>
      )}

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#1C4A93] to-purple-600 bg-clip-text text-transparent">
            {currentSurvey.survey.title}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="h-1 flex-grow bg-gray-200 rounded-full">
              <div 
                className="h-full bg-blue rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / currentSurvey.questions.length) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600">
              {currentQuestionIndex + 1}/{currentSurvey.questions.length}
            </span>
          </div>
        </CardHeader>
      </Card>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: slideDirection === 'right' ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: slideDirection === 'right' ? -50 : 50 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Card className="shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">{currentQuestion.question_text}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {questionOptions.map((option, index) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleOptionSelect(currentQuestion.id, option.id, option.option_text)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 flex justify-between items-center group ${
                      hasSubmitted ? 'opacity-75 cursor-not-allowed' : ''
                    } ${
                      selectedOptions[currentQuestion.id]?.option_id === option.id
                        ? 'bg-gradient-to-r from-[#1C4A93] to-indigo-700 text-white shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`w-6 h-6 flex items-center justify-center rounded-full border ${
                        selectedOptions[currentQuestion.id]?.option_id === option.id
                          ? 'bg-white text-[#1C4A93]'
                          : 'border-gray-300 group-hover:border-[#1C4A93]'
                      }`}>
                        {index + 1}
                      </span>
                      <span>{option.option_text}</span>
                    </div>
                    {selectedOptions[currentQuestion.id]?.option_id === option.id && (
                      <Check className="w-5 h-5 text-white" />
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between gap-4 mt-6">
        <button
          onClick={handlePrevious}
          disabled={isFirstQuestion || hasSubmitted}
          className={`px-6 py-2 rounded-md transition-all duration-200 flex items-center gap-2 ${
            isFirstQuestion || hasSubmitted
              ? 'bg-gray-300 cursor-not-allowed opacity-50'
              : 'bg-gray-600 hover:bg-gray-700 text-white shadow-md hover:shadow-lg'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>

        {!isLastQuestion ? (
          <button
            onClick={handleNext}
            disabled={!hasSelectedOption || hasSubmitted}
            className={`px-6 py-2 rounded-md transition-all duration-200 flex items-center gap-2 ${
              hasSelectedOption && !hasSubmitted
                ? 'bg-gradient-to-r from-[#1C4A93] to-indigo-700 hover:from-[#4281e6] hover:to-indigo-800 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!hasSelectedOption || isSubmitting || hasSubmitted}
            className={`px-6 py-2 rounded-md transition-all duration-200 ${
              hasSelectedOption && !isSubmitting && !hasSubmitted
                ? 'bg-gradient-to-r from-[#1C4A93] to-indigo-700 hover:from-[#4281e6] hover:to-indigo-800 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader className="w-4 h-4 animate-spin" />
                Submitting...
              </span>
            ) : (
              'Submit Survey'
            )}
          </button>
        )}
      </div>

      <ThankYouModal />
    </div>
  );
};

export default SurveyDetailPage;