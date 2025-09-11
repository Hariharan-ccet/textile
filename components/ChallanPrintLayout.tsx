import React from 'react';
import { type Challan } from '../types';

interface ChallanPrintLayoutProps {
  challan: Challan;
}

const ChallanCopy: React.FC<{ challan: Challan; type: 'ORIGINAL' | 'DUPLICATE' }> = ({ challan, type }) => {
  const minRows = 12;
  const allItems = challan.items;
  const emptyRows = Math.max(0, minRows - allItems.length);

  const totalQuantity = challan.items.reduce((total, item) => {
    const quantity = parseInt(item.quantity, 10);
    return total + (isNaN(quantity) ? 0 : quantity);
  }, 0);

  return (
    <div className="bg-white font-sans flex flex-col h-full text-[12px]">
      {/* Header */}
      <header className="text-center pb-2">
        <div className="text-center font-bold text-green-700 mb-2">{`DELIVERY CHALLAN - ${type}`}</div>
        <h1 className="text-2xl font-bold text-gray-800" style={{ letterSpacing: '0.1em' }}>V M POLYMERS</h1>
        <p className="text-xs text-gray-700">No. 7/1, Kamarajapuram North, Karur - 639 001.</p>
        <div className="flex justify-between items-center text-xs text-gray-600 pt-2">
          <span>GSTIN: 33DMVPR2742Q1Z2</span>
          <span>Cell No: 9345792383</span>
        </div>
      </header>
      
      {/* Details Section */}
      <section className="mt-4 text-xs">
        <div className="grid grid-cols-2 gap-x-8 border-t border-gray-400 pt-1">
            <div className="flex border-b border-gray-300 py-1.5">
                <span className="font-semibold w-20">No.</span>
                <span className="font-mono">{challan.challanNo}</span>
            </div>
            <div className="flex border-b border-gray-300 py-1.5">
                <span className="font-semibold w-20">Date:</span>
                <span className="font-mono">{challan.date ? new Date(challan.date).toLocaleDateString('en-GB', {timeZone: 'UTC'}) : ''}</span>
            </div>
        </div>
        <div className="grid grid-cols-1 border-b border-gray-300 py-1.5">
            <div className="flex">
                <span className="font-semibold w-20">To M/s.</span>
                <span className="font-mono">{challan.toMs}</span>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-x-8 border-b border-gray-400 py-1.5">
            <div className="flex">
                <span className="font-semibold w-20">P.O. No.</span>
                <span className="font-mono">{challan.poNo}</span>
            </div>
            <div className="flex justify-start">
                 <span className="font-mono">{challan.place}</span>
            </div>
        </div>
      </section>

      {/* Items Table */}
      <main className="flex-grow mt-2">
        <table className="w-full text-xs text-gray-800 border-collapse border border-slate-500">
          <thead className="border-t-2 border-b-2 border-gray-400 text-gray-900">
            <tr>
              <th className="p-2 text-center font-semibold w-16 border border-slate-600">S.No</th>
              <th className="p-2 text-left font-semibold border border-slate-600">Particulars</th>
              <th className="p-2 text-center font-semibold w-24 border border-slate-600">Weight</th>
              <th className="p-2 text-center font-semibold w-24 border border-slate-600">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {allItems.map((item) => (
              <tr key={item.id} className="align-top">
                <td className="p-2 text-center border border-slate-600">{item.sno}</td>
                <td className="p-2 border border-slate-600">{item.particulars}</td>
                <td className="p-2 text-center border border-slate-600">{item.weight}</td>
                <td className="p-2 text-center border border-slate-600">{item.quantity}</td>
              </tr>
            ))}
            {Array.from({ length: emptyRows }).map((_, index) => (
                <tr key={`empty-${index}`} className="h-6">
                    <td className="p-2 border border-slate-600"></td>
                    <td className="p-2 border border-slate-600"></td>
                    <td className="p-2 border border-slate-600"></td>
                    <td className="p-2 border border-slate-600"></td>
                </tr>
            ))}
          </tbody>
           <tfoot className="border-t-2 border-gray-400">
            <tr className="font-bold">
              <td colSpan={3} className="p-2 text-right border border-slate-600">Total</td>
              <td className="p-2 text-center border border-slate-600">{totalQuantity > 0 ? `${totalQuantity} Pcs` : ''}</td>
            </tr>
          </tfoot>
        </table>
      </main>

      {/* Footer */}
      <footer className="mt-auto pt-4 text-xs">
        <p className="mb-4">Notes: {challan.notes}</p>
        <div className="flex justify-between items-end font-semibold pt-4">
            <p>Checked by</p>
            <p>Packed by</p>
        </div>
      </footer>
    </div>
  );
};

const ChallanPrintLayout: React.FC<ChallanPrintLayoutProps> = ({ challan }) => {
  return (
    <div className="challan-print-wrapper">
        <div className="challan-print-copy">
            <ChallanCopy challan={challan} type="ORIGINAL" />
        </div>
        <div className="challan-print-copy">
            <ChallanCopy challan={challan} type="DUPLICATE" />
        </div>
    </div>
  );
};

export default ChallanPrintLayout;