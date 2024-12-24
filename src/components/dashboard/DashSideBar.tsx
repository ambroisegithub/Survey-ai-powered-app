import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { ChevronDown, ChevronRight, ClipboardList, Settings, Users, LineChart, Bell, FolderOpen, FilePlus, History } from 'lucide-react';

const sideBarItems = [
  {
    path: '/surveys',
    name: 'Overview',
    icon: <ClipboardList className="icon" />,
  },
  {
    name: 'Surveys',
    icon: <FolderOpen className="icon" />,
    subItems: [
      { path: '/surveys/active', name: 'Active Surveys' },
      { path: '/surveys/drafts', name: 'Draft Surveys' },
      { path: '/surveys/completed', name: 'Completed Surveys' },
      { path: '/surveys/archived', name: 'Archived Surveys' },
    ],
  },
  {
    name: 'Create',
    icon: <FilePlus className="icon" />,
    subItems: [
      { path: '/surveys/create/blank', name: 'Blank Survey' },
      { path: '/surveys/create/template', name: 'From Template' },
      { path: '/surveys/templates', name: 'Manage Templates' },
      { path: '/surveys/create/all-survey', name: 'All Surveys' },

    ],
  },
  {
    name: 'Responses',
    icon: <Users className="icon" />,
    subItems: [
      { path: '/surveys/responses/all', name: 'All Responses' },
      { path: '/surveys/responses/analysis', name: 'Response Analysis' },
      { path: '/surveys/responses/export', name: 'Export Data' },
    ],
  },
  {
    name: 'Analytics',
    icon: <LineChart className="icon" />,
    subItems: [
      { path: '/surveys/analytics/overview', name: 'Analytics Overview' },
      { path: '/surveys/analytics/engagement', name: 'Engagement Metrics' },
      { path: '/surveys/analytics/completion', name: 'Completion Rates' },
    ],
  },
  {
    name: 'History',
    icon: <History className="icon" />,
    subItems: [
      { path: '/surveys/history/changes', name: 'Change History' },
      { path: '/surveys/history/versions', name: 'Version Control' },
    ],
  },
  {
    name: 'Notifications',
    icon: <Bell className="icon" />,
    subItems: [
      { path: '/surveys/notifications/all', name: 'All Notifications' },
      { path: '/surveys/notifications/settings', name: 'Notification Settings' },
    ],
  },
  {
    name: 'Settings',
    icon: <Settings className="icon" />,
    subItems: [
      { path: '/surveys/settings/distribution', name: 'Distribution Settings' },
      { path: '/surveys/settings/branching', name: 'Branching Logic' },
      { path: '/surveys/settings/styling', name: 'Survey Styling' },
    ],
  },
];

interface SideBarItemProps {
  item: {
    path?: string;
    name: string;
    icon: React.ReactNode;
    subItems?: { path?: string; name: string; icon?: React.ReactNode; subItems?: { path?: string; name: string }[] }[];
  };
  activeItem: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
}

function SideBarItem({ item, activeItem, setActiveItem }: SideBarItemProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <li className={`p-3 ${activeItem === item.name ? 'bg-[#1C4A93] text-white' : ''}`}>
      <div
        className="flex  justify-between cursor-pointer hover:bg-[#1C4A93] hover:text-white p-2 rounded-md transition-all duration-300 ease-in-out"
        onClick={() => {
          if (item.subItems) {
            handleExpand();
          } else {
            setActiveItem(item.name);
          }
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            if (item.subItems) {
              handleExpand();
            } else {
              setActiveItem(item.name);
            }
          }
        }}
      >
        <div className="flex gap-3 text-lg">
          {item.icon}
          <span>{item.name}</span>
        </div>
        {item.subItems &&
          (expanded ? (
            <ChevronDown className="ml-6" />
          ) : (
            <ChevronRight className="ml-6" />
          ))}
      </div>
      {expanded && item.subItems && (
        <ul className="p-2 pl-6 rounded-b-md">
          {item.subItems.map((subItem) => (
            <li
              key={subItem.name}
              className="px-2 py-1 hover:text-white hover:bg-[#1C4A93] w-full rounded-sm transition-all duration-300 ease-in-out"
            >
              <a
                href={subItem.path}
                className="flex gap-3 text-lg"
                onClick={() => setActiveItem(subItem.name)}
              >
                {subItem.icon && subItem.icon}
                <span>{subItem.name}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function SurveyDashboardSideNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeItem, setActiveItem] = useState<string>('Overview');

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-3 z-50 p-1"
        onClick={toggleSidebar}
        type="button"
        aria-label="Toggle Menu"
      >
        <AiOutlineMenu className="text-2xl" />
      </button>
      <aside
        className={`h-screen bg-white fixed left-0 z-40 ${isVisible ? 'block' : 'hidden'} lg:block w-[220px]`} 
      >
        <nav className="h-full flex flex-col justify-between shadow-sm">
          <ul className="flex-1 mt-6 overflow-x-auto pb-[100px]">
            <li className="lg:hidden flex justify-end p-3">
              <button
                onClick={toggleSidebar}
                type="button"
                aria-label="Close Menu"
              >
                <AiOutlineClose className="text-2xl cursor-pointer" />
              </button>
            </li>
            {sideBarItems.map((item) => (
              <SideBarItem
                key={item.name}
                item={item}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default SurveyDashboardSideNav;