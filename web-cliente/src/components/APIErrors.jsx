/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

export default function APIErrors({
  error
}) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (error?.response?.data?.errors) {
      setMessages(Object.values(error.response.data.errors));
    }
  }, [error]);

  if (!error) {
    return null;
  }

  return (
    <div role="alert" className="alert alert-error mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <div>
        <h3 className="font-bold">Hubo un problema, revise la informacion del formulario.</h3>
        {messages.map((message, index) => (
          <div className="text-xs" key={index}>{message}</div>
        ))}
      </div>
    </div>
  )
}