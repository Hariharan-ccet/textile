import React, { useCallback, useImperativeHandle, forwardRef } from 'react';
import { type Challan, type ChallanItem } from '../types';
import { Icon } from './Icon';

interface ChallanFormProps {
  challan: Challan;
  setChallan: React.Dispatch<React.SetStateAction<Challan>>;
  onSave: (challan: Challan) => void;
}

const ChallanForm = forwardRef<{ save: () => void }, ChallanFormProps>(({ challan, setChallan, onSave }, ref) => {

  useImperativeHandle(ref, () => ({
    save: () => {
       if (!challan.challanNo || !challan.toMs) {
        alert('Please fill in Challan No. and Customer fields.');
        return;
      }
      onSave(challan);
    }
  }));

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setChallan(prev => ({ ...prev, [name]: value }));
  }, [setChallan]);

  const handleItemChange = useCallback((index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChallan(prevChallan => {
      const updatedItems = [...prevChallan.items];
      updatedItems[index] = { ...updatedItems[index], [name]: value };
      return { ...prevChallan, items: updatedItems };
    });
  }, [setChallan]);

  const addRow = useCallback(() => {
    setChallan(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { id: `item_${Date.now()}`, sno: prev.items.length + 1, particulars: '', weight: '', quantity: '' },
      ],
    }));
  }, [setChallan]);

  const deleteRow = useCallback((index: number) => {
    setChallan(prev => {
      const newItems = prev.items.filter((_, i) => i !== index);
      // Re-calculate sno
      return {
        ...prev,
        items: newItems.map((item, i) => ({ ...item, sno: i + 1 })),
      };
    });
  }, [setChallan]);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg print:hidden">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 border-b pb-2">New Challan Form</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <InputField label="Challan No." name="challanNo" value={challan.challanNo} onChange={handleInputChange} required />
        <InputField label="Date" name="date" type="date" value={challan.date} onChange={handleInputChange} />
        <InputField label="Customer (To M/s)" name="toMs" value={challan.toMs} onChange={handleInputChange} required />
        <InputField label="P.O. No" name="poNo" value={challan.poNo} onChange={handleInputChange} />
        <div className="md:col-span-2">
            <InputField label="Place" name="place" value={challan.place} onChange={handleInputChange} />
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-600">Items</h3>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th scope="col" className="px-4 py-3 w-16">S.No</th>
                        <th scope="col" className="px-4 py-3">Particulars</th>
                        <th scope="col" className="px-4 py-3 w-32">Weight</th>
                        <th scope="col" className="px-4 py-3 w-32">Quantity</th>
                        <th scope="col" className="px-4 py-3 w-16"></th>
                    </tr>
                </thead>
                <tbody>
                    {challan.items.map((item, index) => (
                        <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-4 py-2">{item.sno}</td>
                            <td className="px-4 py-2">
                                <input type="text" name="particulars" value={item.particulars} onChange={(e) => handleItemChange(index, e)} className="w-full p-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                            </td>
                            <td className="px-4 py-2">
                                <input type="text" name="weight" value={item.weight} onChange={(e) => handleItemChange(index, e)} className="w-full p-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                            </td>
                            <td className="px-4 py-2">
                                <input type="text" name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} className="w-full p-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                            </td>
                            <td className="px-4 py-2 text-center">
                                <button onClick={() => deleteRow(index)} className="text-red-500 hover:text-red-700">
                                    <Icon type="delete" className="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <button onClick={addRow} className="mt-3 flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm">
          <Icon type="add" className="h-5 w-5 mr-1" />
          Add Row
        </button>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea id="notes" name="notes" value={challan.notes} onChange={handleInputChange} rows={3} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>
    </div>
  );
});

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, ...props }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input id={name} name={name} {...props} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
    </div>
);


export default ChallanForm;