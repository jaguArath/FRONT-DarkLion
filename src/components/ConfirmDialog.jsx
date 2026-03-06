import React from "react";

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  type = "confirm", // 'confirm' or 'success' or 'error'
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
        {/* Título */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>

        {/* Mensaje */}
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">{message}</p>

        {/* Botones */}
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 rounded-lg bg-purple-700 text-white font-semibold hover:bg-purple-800 transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
