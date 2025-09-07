import React from 'react';

interface ConnectionErrorProps {
  onRetry: () => void;
}

const ConnectionError: React.FC<ConnectionErrorProps> = ({ onRetry }) => {
  const troubleshootingGuide = [
    {
      heading: "STEP 1: Check your Firebase Configuration.",
      steps: [
        "Open the file named `firebaseConfig.ts` in your project.",
        "Make sure you have replaced the placeholder values (`YOUR_API_KEY`, `YOUR_PROJECT_ID`, etc.) with the actual configuration object you copied from the Firebase Console.",
        "Ensure there are no typos in the configuration keys or values.",
      ]
    },
    {
      heading: "STEP 2: Check your Firebase Database Rules.",
      steps: [
        "Go to the <a href='https://console.firebase.google.com/' target='_blank' rel='noopener noreferrer' class='text-blue-600 underline'>Firebase Console</a> and open your project.",
        "In the left menu, go to **Build > Realtime Database**.",
        "Click on the **Rules** tab.",
        "For development, your rules should be set to allow reads and writes. They should look like this:",
        "<code class='block bg-red-100 text-red-900 font-mono py-2 px-3 rounded-sm text-xs'>{\n  \"rules\": {\n    \".read\": true,\n    \".write\": true\n  }\n}</code>"
      ]
    }
  ];

  return (
    <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h2 className="text-2xl font-bold">Connection to Firebase Failed</h2>
      </div>

      <p className="mb-6">
        The application could not connect to the Firebase database. Please follow the steps below, then click the retry button.
      </p>

      <div className="space-y-6">
        {troubleshootingGuide.map((section) => (
          <div key={section.heading}>
            <h3 className="font-bold text-lg mb-2 text-red-900">{section.heading}</h3>
            <ul className="list-decimal list-inside space-y-2 text-sm">
              {section.steps.map((step, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: step.replace(/`([^`]+)`/g, '<code class="bg-red-100 text-red-900 font-mono py-0.5 px-1 rounded-sm">$1</code>') }}></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
            onClick={onRetry}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-transform duration-150 ease-in-out hover:scale-105"
        >
          Retry Connection
        </button>
      </div>
    </div>
  );
};

export default ConnectionError;