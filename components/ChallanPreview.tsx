import React from 'react';
import { type Challan } from '../types';

interface ChallanPreviewProps {
  challan: Challan;
}

const ChallanPreview: React.FC<ChallanPreviewProps> = ({ challan }) => {
  const minRows = 12;
  // Render all items from the state to ensure live updates, including empty rows.
  const allItems = challan.items;
  const emptyRows = Math.max(0, minRows - allItems.length);

  const totalQuantity = challan.items.reduce((total, item) => {
    const quantity = parseInt(item.quantity, 10);
    return total + (isNaN(quantity) ? 0 : quantity);
  }, 0);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 print:shadow-none print:border-none font-sans flex flex-col min-h-[21cm]" id="challan-preview-content">
      {/* Top Bar with GSTIN */}
      <div className="flex justify-between items-center text-xs text-gray-600 pb-2">
          <span>GSTIN: 33DMVPR2742Q1Z2</span>
          <span>GSTIN: 63821 22594</span>
      </div>

      {/* Header */}
      <header className="text-center pb-2">
        <div className="inline-block bg-green-700 text-white text-sm font-bold px-4 py-1 mb-2">DELIVERY CHALLAN</div>
        <h1 className="text-2xl font-bold text-green-800" style={{ letterSpacing: '0.1em' }}>V M POLYMERS</h1>
        <p className="text-xs text-gray-700">No. 7/1, Kamarajapuram North, Karur - 639 001.</p>
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
        <table className="w-full text-xs text-gray-800">
          <thead className="border-t-2 border-b-2 border-gray-400 text-gray-900">
            <tr>
              <th className="p-2 text-center font-semibold w-16">S.No</th>
              <th className="p-2 text-left font-semibold">Particulars</th>
              <th className="p-2 text-center font-semibold w-32">Weight</th>
              <th className="p-2 text-center font-semibold w-32">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {allItems.map((item) => (
              <tr key={item.id} className="align-top border-b border-gray-300 last:border-b-0">
                <td className="p-2 text-center">{item.sno}</td>
                <td className="p-2">{item.particulars}</td>
                <td className="p-2 text-center">{item.weight}</td>
                <td className="p-2 text-center">{item.quantity}</td>
              </tr>
            ))}
            {Array.from({ length: emptyRows }).map((_, index) => (
                <tr key={`empty-${index}`} className="h-8 border-b border-gray-300 last:border-b-0">
                    <td className="p-2"></td>
                    <td className="p-2"></td>
                    <td className="p-2"></td>
                    <td className="p-2"></td>
                </tr>
            ))}
          </tbody>
           <tfoot className="border-t-2 border-b-2 border-gray-400">
            <tr className="font-bold">
              <td colSpan={3} className="p-2 text-right">Total</td>
              <td className="p-2 text-center">{totalQuantity > 0 ? `${totalQuantity} Pcs` : ''}</td>
            </tr>
          </tfoot>
        </table>
      </main>

      {/* Footer */}
      <footer className="mt-auto pt-8 text-xs">
        <div className="flex justify-between items-end font-semibold">
            <p>Checked by</p>
            <p>Packed by</p>
        </div>
      </footer>
    </div>
  );
};

export default ChallanPreview;