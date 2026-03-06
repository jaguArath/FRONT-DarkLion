import React, { useEffect } from "react";

export default function SuccessMessage({ isOpen, title, message, onClose }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
        {/* Ícono de éxito */}
        <div className="text-5xl mb-4">✓</div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>

        {/* Mensaje */}
        <p className="text-gray-600 text-lg">{message}</p>
      </div>
    </div>
  );
}
