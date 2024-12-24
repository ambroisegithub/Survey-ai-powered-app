import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { fetchSurveys } from "../Redux/Slices/CreatesurveySlices";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Loader, Eye, Calendar, Users, ArrowRight } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { surveys, loading, error } = useAppSelector((state) => state.Survey);

  useEffect(() => {
    dispatch(fetchSurveys({}));
  }, [dispatch]);

  const handleView = (surveyId: string) => {
    navigate(`/survey-details/${surveyId}`);
  };

  if (loading && !surveys.length) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#15397A] to-indigo-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Participate in Surveys
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-2xl">
            Share your valuable insights and help shape the future through our
            carefully crafted surveys.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          Available Surveys
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surveys.map((survey) => (
            <Card
              key={survey.id}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 line-clamp-2">
                  {survey.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {survey.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(survey.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Open for all
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <button
                  onClick={() => handleView(survey.id)}
                  className="w-full bg-[#1C4A93] hover:bg-[#15397A] text-white py-3 rounded-md flex justify-center items-center gap-2 text-sm transition-colors group-hover:shadow-md"
                >
                  <Eye className="w-4 h-4" />
                  View Survey
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {surveys.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="bg-blue-50 rounded-full p-6 mb-4">
            <Users className="w-12 h-12 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Surveys Available
          </h3>
          <p className="text-gray-600 text-center max-w-md">
            Check back later for new surveys. We regularly update our collection
            with new and interesting topics.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;