import { BarChart3, FileSpreadsheet } from 'lucide-react';

function SurveyDashHome() {
  function getGreeting(): string {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 12) {
      return 'Good Morning';
    }
    if (hour < 18) {
      return 'Good Afternoon';
    }
    return 'Good Evening';
  }

  const surveyStats = [
    { title: "Active Surveys", count: 12, change: "+2 this week" },
    { title: "Total Responses", count: 1458, change: "+126 today" },
    { title: "Completion Rate", count: "78%", change: "+5% vs last week" },
    { title: "Avg Response Time", count: "6.5m", change: "-1m this week" }
  ];

  const greetings = getGreeting();

  return (
    <div>
      <div className="bg-slate-50 min-h-screen">
        <div className="rounded-md">
          <div className="md:flex items-center justify-between rounded-2xl bg-white p-4">
            <div>
              <p className="text-dashgreytext text-sm">{greetings},</p>
              <div className="font-semibold text-2xl">
                Survey Administrator
              </div>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <>
            <div className="mt-4 p-5 rounded-2xl bg-white">
              <div className="flex items-center justify-between">
                <h1>Survey Analytics Overview</h1>
                <button
                  className="border flex items-center px-2 py-1 rounded-md hover:bg-gray-50"
                  type="button"
                >
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Export Report
                </button>
              </div>
              <p className="text-dashgreytext text-sm mb-7">Survey Performance Summary</p>
              <div className="grid md:grid-cols-4 gap-4">
                {surveyStats.map((stat, index) => (
                  <div key={index} className="p-4 rounded-lg border border-gray-200">
                    <h3 className="text-gray-600 text-sm">{stat.title}</h3>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-2xl font-bold">{stat.count}</span>
                      <span className="text-sm text-green-600">{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full xs:flex-col lg:flex-row mt-4 flex items-center xs:gap-4 lg:gap-4">
              <div className="w-full lg:w-1/2 p-4 rounded-2xl bg-white">
                <h2 className="font-semibold mb-4">Recent Surveys</h2>
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="p-3 border rounded-lg flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Customer Satisfaction Q4</h3>
                        <p className="text-sm text-gray-500">Created 2 days ago</p>
                      </div>
                      <span className="px-2 py-1 bg-blue text-white rounded-full text-sm">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-1/2 p-4 rounded-2xl bg-white">
                <h2 className="font-semibold mb-4">Response Trends</h2>
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Product Feedback</span>
                        <span className="text-sm text-gray-500">89 responses</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue h-2 rounded-full w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-2/3 p-4 rounded-2xl bg-white">
                <h2 className="font-semibold mb-4">Recent Responses</h2>
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Employee Engagement Survey</h3>
                          <p className="text-sm text-gray-500">Completed 30 minutes ago</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/3 p-4 rounded-2xl bg-white">
                <h2 className="font-semibold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full p-3 text-left border rounded-lg hover:bg-gray-50">
                    Create New Survey
                  </button>
                  <button className="w-full p-3 text-left border rounded-lg hover:bg-gray-50">
                    View All Responses
                  </button>
                  <button className="w-full p-3 text-left border rounded-lg hover:bg-gray-50">
                    Manage Templates
                  </button>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

export default SurveyDashHome;