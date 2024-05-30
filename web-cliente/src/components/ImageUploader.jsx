/* eslint-disable react/prop-types */
import { useState } from 'react';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';

import { URL_API } from '../../configuracion.json';

export default function ImageUploader({
  value,
  change,
  hidePreview,
  video = false,
}) {
  const [videoUrl, setVideo] = useState('');

  const asyncSettings = {
    saveUrl: `${URL_API}/api/UploadBox/upload`,
    removeUrl: `${URL_API}/api/UploadBox/remove`,
  };

  const uploadVideo = () => {
    if (!videoUrl) return;

    change({ value: videoUrl, tipo: 1 });
  }

  const onUploadSuccess = (args) => {
    change({ value: args.e.target.responseText, tipo: 0 });
  }

  const onUploadFile = (args) => {
    console.info(args)
  }

  const onRemoveFile = (args) => {
    console.log(args);
  }

  return (
    <div className='upload_wrapper'>
      {!hidePreview &&
        <div className="avatar">
          <div className="w-48 rounded">
            <img src={value || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"} />
          </div>
        </div>}

      {video && <div className="flex content-end">
        <label className="form-control w-full max-w-xs mb-6">
          <div className="label">
            <span className="label-text">Video?</span>
            <span className="label-text-alt">Copie la URL del video</span>
          </div>
          <input type="text" placeholder="URL Video" className="input input-bordered w-full max-w-xs" value={videoUrl} onChange={({ target: { value } }) => setVideo(value)} />
        </label>
        <button className="btn btn-sm btn-outline ml-4 self-center" onClick={uploadVideo}>Subir</button>
      </div>}

      <UploaderComponent id='fileUpload' type='file'
        asyncSettings={asyncSettings} uploading={onUploadFile} removing={onRemoveFile} success={onUploadSuccess}
        autoUpload={true} sequentialUpload={false} />
    </div>
  )
}