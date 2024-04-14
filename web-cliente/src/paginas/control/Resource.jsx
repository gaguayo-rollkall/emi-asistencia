/* eslint-disable react/prop-types */

import apiService from '../../servicios/api-service';

const URL = '/control';

const CloseButton = ({
  onClick
}) => {
  return (
    <button className="btn btn-circle btn-error btn-xs absolute" style={{
      right: -10,
      top: -10,
    }}
    onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
    </button>
  )
}

export default function Resource({
  id,
  url,
  tipo,
  onRemove,
}) {
  const styles = tipo === 0 ? {
    background: `url(${url}) no-repeat`,
    backgroundSize: '100% 100%',
  } : {};

  const removeControl = async () => {
    try {
      await apiService.delete(`${URL}/${id}`);
      onRemove();
    } catch (error) {
      console.error('Remove Control', error);
    }
  }

  return (
    <div className="border-slate-800 bg-gray-300 relative" style={{
      // width: 400,
      height: 300,
      ...styles,
    }}>
      <CloseButton onClick={removeControl} />
      {tipo === 1 && (
        <iframe width="100%" height="300" src={url} title="YouTube video player" frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      )}
    </div>
  )
}