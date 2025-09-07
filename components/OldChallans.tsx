
import React, { useState, useMemo } from 'react';
import { type Challan } from '../types';
import { Icon } from './Icon';

interface OldChallansProps {
  challans: Challan[];
  onView: (id: string) => void;
  onPrint: (id: string) => void;
  onDelete: (id: string) => void;
}

const OldChallans: React.FC<OldChallansProps> = ({ challans, onView, onPrint, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChallans = useMemo(() => {
    if (!searchTerm) return challans;
    return challans.filter(c =>
      c.challanNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.toMs.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.date.includes(searchTerm)
    );
  }, [challans, searchTerm]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Saved Challans</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search challans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
             <Icon type="search" className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">Challan No</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Customer</th>
              <th scope="col" className="px-6 py-3">P.O. No</th>
              <th scope="col" className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredChallans.length > 0 ? filteredChallans.map((challan) => (
              <tr key={challan.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{challan.challanNo}</td>
                <td className="px-6 py-4">{challan.date}</td>
                <td className="px-6 py-4">{challan.toMs}</td>
                <td className="px-6 py-4">{challan.poNo}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <ActionButton onClick={() => onView(challan.id)} icon="view" tooltip="View/Edit" className="text-blue-500 hover:text-blue-700" />
                    <ActionButton onClick={() => onPrint(challan.id)} icon="print" tooltip="Print" className="text-gray-500 hover:text-gray-700" />
                    <ActionButton onClick={() => onDelete(challan.id)} icon="delete" tooltip="Delete" className="text-red-500 hover:text-red-700" />
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">
                  No challans found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface ActionButtonProps {
    onClick: () => void;
    icon: React.ComponentProps<typeof Icon>['type'];
    tooltip: string;
    className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, icon, tooltip, className }) => (
    <button onClick={onClick} className={`relative group p-1 rounded-full hover:bg-gray-200 transition-colors ${className}`}>
        <Icon type={icon} className="h-5 w-5" />
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {tooltip}
        </span>
    </button>
);


export default OldChallans;
