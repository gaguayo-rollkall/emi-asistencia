/* eslint-disable react/prop-types */
export default function Errores({
  errors,
}) {
  const validations = Object.values(errors).map(([e]) => e);

  if (validations.length === 0) {
    return null;
  }

  return (
    <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mt-4" role="alert">
      <p className="font-bold">Observaciones</p>
      {validations.map((validation, i) => (
        <div className="text-xs" key={i}>{validation}</div>
      ))}
    </div>
  )
}