/* eslint-disable react/prop-types */
export default function Resource({
  id,
  url,
  tipo,
}) {
  const styles = tipo === 0 ? {
    background: `url(${url}) no-repeat`,
    backgroundSize: '100% 100%',
  } : {};

  return (
    <div className="border-slate-800 bg-gray-300" style={{
      // width: 400,
      height: 300,
      ...styles,
    }}>
      {tipo === 1 && (
        <iframe width="100%" height="300" src={url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      )}
    </div>
  )
}