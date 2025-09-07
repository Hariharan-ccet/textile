import React, { useState, useCallback, useRef } from 'react';
import Header from './components/Header';
import ChallanForm from './components/ChallanForm';
import ChallanPreview from './components/ChallanPreview';
import OldChallans from './components/OldChallans';
import ConnectionError from './components/ConnectionError';
import { type Challan, View } from './types';
import { useChallans } from './hooks/useChallans';

const getInitialChallan = (): Challan => ({
  id: `challan_${Date.now()}`,
  challanNo: '',
  date: new Date().toISOString().split('T')[0],
  toMs: '',
  poNo: '',
  place: '',
  items: [{ id: `item_${Date.now()}`, sno: 1, particulars: '', weight: '', quantity: '' }],
  notes: 'Goods are received in good condition.',
});

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.NEW);
  const { challans, addChallan, deleteChallan, getChallan, apiStatus, retryFetch } = useChallans();
  const [currentChallan, setCurrentChallan] = useState<Challan>(getInitialChallan());
  const [challanToPrint, setChallanToPrint] = useState<Challan | null>(null);
  
  const formRef = useRef<{ save: () => void }>(null);

  const handleSetView = useCallback((newView: View) => {
    if (newView === View.NEW) {
      setCurrentChallan(getInitialChallan());
    }
    setView(newView);
  }, []);

  const handleSave = () => {
    if (formRef.current) {
        formRef.current.save();
    }
  };

  const handlePrint = () => {
    setChallanToPrint(currentChallan);
    setTimeout(() => {
        window.print();
        setChallanToPrint(null);
    }, 100);
  };
  
  const onChallanSaved = (savedChallan: Challan) => {
    addChallan(savedChallan);
    setCurrentChallan(getInitialChallan());
    alert('Challan saved successfully!');
  };

  const viewChallan = (challanId: string) => {
    const challanToView = getChallan(challanId);
    if (challanToView) {
      setCurrentChallan(challanToView);
      setView(View.NEW);
    }
  };

  const printChallan = (challanId: string) => {
    const challan = getChallan(challanId);
    if (challan) {
      setChallanToPrint(challan);
      setTimeout(() => {
        window.print();
        setChallanToPrint(null);
      }, 100);
    }
  };

  const renderContent = () => {
    if (apiStatus === 'pending') {
      return (
        <div className="text-center py-20">
          <p className="text-lg text-gray-600">Connecting to server...</p>
        </div>
      );
    }

    if (apiStatus === 'offline') {
      return <ConnectionError onRetry={retryFetch} />;
    }

    return (
      view === View.NEW ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChallanForm
            ref={formRef}
            challan={currentChallan}
            setChallan={setCurrentChallan}
            onSave={onChallanSaved}
          />
          <div>
              <ChallanPreview challan={currentChallan} />
          </div>
        </div>
      ) : (
        <OldChallans 
          challans={challans}
          onView={viewChallan}
          onPrint={printChallan}
          onDelete={deleteChallan}
        />
      )
    );
  };

  return (
    <div className="min-h-screen font-sans text-gray-800">
      <Header 
        view={view}
        setView={handleSetView} 
        onSave={handleSave} 
        onPrint={handlePrint}
        apiStatus={apiStatus}
      />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {renderContent()}
      </main>

      {/* This hidden container is exclusively for printing */}
      {challanToPrint && (
        <div className="print-only">
            <div id="print-area">
                <ChallanPreview challan={challanToPrint} />
            </div>
        </div>
      )}
    </div>
  );
};

export default App;