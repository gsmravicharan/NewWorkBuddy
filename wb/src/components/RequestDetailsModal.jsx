import React from 'react';

const RequestDetailsModal = ({ isOpen, onClose, service }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white w-full max-w-2xl mx-4 rounded shadow-lg p-6 z-10">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">{service?.title || service?.name || 'Details'}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 ml-4"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {service?.description && <p className="text-sm text-gray-700">{service.description}</p>}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500">Category</div>
              <div className="font-medium">{service?.category || '—'}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Price</div>
              <div className="font-medium">{service?.price ? `₹${service.price}` : 'Contact'}</div>
            </div>
          </div>

          {service?.features && (
            <div>
              <div className="text-xs text-gray-500">Features</div>
              <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
                {service.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsModal;
