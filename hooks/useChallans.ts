import { useState, useCallback, useEffect } from 'react';
import { type Challan, type ApiStatus } from '../types';
import { database } from '../firebaseConfig';
import { ref, onValue, push, set, remove } from 'firebase/database';

// Firebase returns an object with unique keys, not an array.
// We need to transform this into the array format our app uses.
const mapFirebaseDataToChallans = (data: any): Challan[] => {
    if (!data) return [];
    return Object.entries(data)
        .map(([key, value]) => ({
            ...(value as Omit<Challan, 'id'>),
            id: key, // The Firebase key is our challan ID
            items: (value as Challan).items || [] // Ensure items is always an array
        }))
        .sort((a, b) => (b.challanNo > a.challanNo ? 1 : -1)); // Sort by challan number or timestamp
};


export const useChallans = () => {
  const [challans, setChallans] = useState<Challan[]>([]);
  const [apiStatus, setApiStatus] = useState<ApiStatus>('pending');
  const challansRef = ref(database, 'challans');

  const fetchChallans = useCallback(() => {
    setApiStatus('pending');
    
    // onValue creates a real-time listener.
    // The callback will fire once with the initial data, and then
    // again every time the data changes in the database.
    onValue(challansRef, (snapshot) => {
        const data = snapshot.val();
        const challanList = mapFirebaseDataToChallans(data);
        setChallans(challanList);
        setApiStatus('online');
    }, (error) => {
        console.error("Firebase connection error:", error);
        setApiStatus('offline');
    });

  }, [challansRef]);

  useEffect(() => {
    fetchChallans();
  }, [fetchChallans]);

  const addChallan = useCallback(async (challanToAdd: Challan) => {
    try {
      // We don't need the frontend-generated ID.
      const { id, ...challanData } = challanToAdd;
      
      // push() creates a new reference with a unique, chronological key.
      const newChallanRef = push(challansRef);
      // set() writes the data to that new reference.
      await set(newChallanRef, challanData);

    } catch (error) {
      console.error("Failed to add challan:", error);
      alert('Error: Could not save challan to Firebase.');
    }
  }, [challansRef]);

  const deleteChallan = useCallback(async (challanId: string) => {
    if (window.confirm('Are you sure you want to delete this challan?')) {
      try {
        const specificChallanRef = ref(database, `challans/${challanId}`);
        await remove(specificChallanRef);
      } catch (error) {
          console.error("Failed to delete challan:", error);
          alert('Error: Could not delete challan from Firebase.');
      }
    }
  }, []);
  
  const getChallan = useCallback((challanId: string): Challan | undefined => {
    return challans.find(c => c.id === challanId);
  }, [challans]);

  return { challans, addChallan, deleteChallan, getChallan, apiStatus, retryFetch: fetchChallans };
};