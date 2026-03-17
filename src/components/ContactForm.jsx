import React from 'react';
import PropTypes from 'prop-types';

/**
 * Formulario para capturar nombre, teléfono y correo.
 * Muestra errores específicos por campo y deshabilita botones cuando se está enviando.
 */
export default function ContactForm({ data, onChange, onCancel, onSubmit, sending, fieldErrors }) {
  const handleChange = (field) => (e) => {
    onChange(field, e.target.value);
  };

  return (
    <aside
      aria-label="Formulario de datos de contacto"
      className="
            sticky
            top-24
            left-0
            w-90
            max-h-[calc(150vh-200px)]
            backdrop-blur
            rounded-2xl
            shadow-xl
            p-5
            overflow-y-auto
            z-20
            m-5
          "
    >
      <h2 className="text-2xl font-bold text-center py-8 rounded-t-2xl bg-personalizado to-purple-40 -mx-5 mb-8 ">
        DATOS DE CONTACTO
      </h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Nombre
          </label>
          <input
            type="text"
            value={data.nombre}
            onChange={handleChange('nombre')}
            placeholder="Tu nombre"
            className={`w-full px-3 py-2 border-b-2 transition text-sm focus:outline-none ${
              fieldErrors?.nombre
                ? 'border-red-500 focus:border-red-600'
                : 'border-gray-300 focus:border-purple-600'
            }`}
          />
          {fieldErrors?.nombre && (
            <p className="text-sm text-red-600 mt-2">{fieldErrors.nombre}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Teléfono
          </label>
          <input
            type="tel"
            value={data.telefono}
            onChange={handleChange('telefono')}
            placeholder="Tu teléfono"
            className={`w-full px-3 py-2 border-b-2 transition text-sm focus:outline-none ${
              fieldErrors?.telefono
                ? 'border-red-500 focus:border-red-600'
                : 'border-gray-300 focus:border-purple-600'
            }`}
          />
          {fieldErrors?.telefono && (
            <p className="text-sm text-red-600 mt-2">{fieldErrors.telefono}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Correo Electrónico
          </label>
          <input
            type="email"
            value={data.correo}
            onChange={handleChange('correo')}
            placeholder="tu@email.com"
            className={`w-full px-3 py-2 border-b-2 transition text-sm focus:outline-none ${
              fieldErrors?.correo
                ? 'border-red-500 focus:border-red-600'
                : 'border-gray-300 focus:border-purple-600'
            }`}
          />
          {fieldErrors?.correo && (
            <p className="text-sm text-red-600 mt-2">{fieldErrors.correo}</p>
          )}
        </div>

        <div className="flex flex-col gap-3 mt-8">
          <button
            onClick={onCancel}
            disabled={sending}
            className="w-full px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={onSubmit}
            disabled={sending}
            className="w-full px-4 py-2 bg-personalizado hover:bg-personalizado-click-hover font-semibold rounded-lg transition disabled:opacity-50"
          >
            {sending ? 'Enviando...' : 'Contactame'}
          </button>
        </div>
      </div>
    </aside>
  );
}

ContactForm.propTypes = {
  data: PropTypes.shape({
    nombre: PropTypes.string,
    telefono: PropTypes.string,
    correo: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  sending: PropTypes.bool,
  fieldErrors: PropTypes.shape({
    nombre: PropTypes.string,
    telefono: PropTypes.string,
    correo: PropTypes.string,
  }),
};
