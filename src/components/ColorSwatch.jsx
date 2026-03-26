import React from "react";
import PropTypes from "prop-types";

/**
 * Small square showing a color value with a border and optional title.
 */
export default function ColorSwatch({ color, title }) {
  if (!color) return <span>—</span>;
  return (
    <span
      className="inline-block w-6 h-6 rounded border border-gray-300 ml-1"
      style={{ backgroundColor: color }}
      title={title || color}
    />
  );
}

ColorSwatch.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
};
