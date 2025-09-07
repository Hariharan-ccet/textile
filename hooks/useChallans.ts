import { useState, useCallback } from 'react';
import { type Challan } from '../types';

const MOCK_CHALLANS: Challan[] = [
  {
    id: 'challan_image_1',
    challanNo: '77',
    date: '2025-09-05', // Interpreted from 5/9/25
    toMs: 'Alaska Export',
    poNo: 'AE-404',
    place: 'Karur',
    items: [
      { id: 'item_1', sno: 1, particulars: '27x32+3"F', weight: '', quantity: '105 Pcs' },
      { id: 'item_2', sno: 2, particulars: '8x15+3"F', weight: '', quantity: '1605 Pcs' },
      { id: 'item_3', sno: 3, particulars: '9x13+3"F', weight: '', quantity: '375 Pcs' },
      { id: 'item_4', sno: 4, particulars: '7x9+3"F', weight: '', quantity: '105 Pcs' },
      { id: 'item_5', sno: 5, particulars: '18x21+3"F', weight: '', quantity: '875 Pcs' },
      { id: 'item_6', sno: 6, particulars: '11.5x17+3"F', weight: '', quantity: '1015 Pcs' },
      { id: 'item_7', sno: 7, particulars: '15.5x15+3"F', weight: '', quantity: '320 Pcs' },
      { id: 'item_8', sno: 8, particulars: '7.5x11+3"F', weight: '', quantity: '1260 Pcs' },
      { id: 'item_9', sno: 9, particulars: '9.5x14+3"F', weight: '', quantity: '495 Pcs' },
      { id: 'item_10', sno: 10, particulars: '5x9+2"F', weight: '', quantity: '870 Pcs' },
      { id: 'item_11', sno: 11, particulars: 'LD Poly bag 200 gauge red line sealing two end our holes', weight: '', quantity: '610 Pcs' },
    ],
    notes: 'Goods are received in good condition.',
  },
];

export const useChallans = () => {
  const [challans, setChallans] = useState<Challan[]>(MOCK_CHALLANS);

  const addChallan = useCallback((newChallan: Challan) => {
    setChallans(prev => {
        const existingIndex = prev.findIndex(c => c.id === newChallan.id);
        if (existingIndex > -1) {
            const updatedChallans = [...prev];
            updatedChallans[existingIndex] = newChallan;
            return updatedChallans;
        }
        return [...prev, newChallan];
    });
  }, []);

  const deleteChallan = useCallback((challanId: string) => {
    if (window.confirm('Are you sure you want to delete this challan?')) {
        setChallans(prev => prev.filter(c => c.id !== challanId));
    }
  }, []);
  
  const getChallan = useCallback((challanId: string): Challan | undefined => {
    return challans.find(c => c.id === challanId);
  }, [challans]);

  return { challans, addChallan, deleteChallan, getChallan };
};