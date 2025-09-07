
import React from 'react';
import { View } from '../types';
import { Icon } from './Icon';

interface HeaderProps {
  view: View;
  setView: (view: View) => void;
  onSave: () => void;
  onPrint: () => void;
}

const Header: React.FC<HeaderProps> = ({ view, setView, onSave, onPrint }) => {
  const navButtonClasses = (buttonView: View) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      view === buttonView
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700'
    }`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-10 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">Delivery Challan System</h1>
            <nav className="ml-10 flex items-baseline space-x-4">
              <button onClick={() => setView(View.NEW)} className={navButtonClasses(View.NEW)}>
                New Data
              </button>
              <button onClick={() => setView(View.OLD)} className={navButtonClasses(View.OLD)}>
                Old Data
              </button>
            </nav>
          </div>
          {view === View.NEW && (
            <div className="flex items-center space-x-3">
              <button
                onClick={onSave}
                className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition-transform duration-150 ease-in-out hover:scale-105"
              >
                <Icon type="save" className="h-5 w-5 mr-2" />
                Save
              </button>
              <button
                onClick={onPrint}
                className="flex items-center justify-center bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md transition-transform duration-150 ease-in-out hover:scale-105"
              >
                <Icon type="print" className="h-5 w-5 mr-2" />
                Print
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
