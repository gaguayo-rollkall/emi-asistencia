/* eslint-disable react/prop-types */
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';

import { URL_API } from '../../configuracion.json';

export default function ImageUploader({
  value,
  change
}) {
  const asyncSettings = {
    saveUrl: `${URL_API}/api/UploadBox/upload`,
    removeUrl: `${URL_API}/api/UploadBox/remove`,
  };

  const onUploadSuccess = (args) => {
    change({ value: args.e.target.responseText });
  }

  const onUploadFile = (args) => {
    console.info(args)
  }

  const onRemoveFile = (args) => {
    console.log(args);
  }

  return (
    <div className='upload_wrapper'>
      {/* Render Uploader */}
      <div className="avatar">
        <div className="w-24 rounded">
          <img src={value || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"} />
        </div>
      </div>

      <UploaderComponent id='fileUpload' type='file'
        asyncSettings={asyncSettings} uploading={onUploadFile} removing={onRemoveFile} success={onUploadSuccess}
        autoUpload={true} sequentialUpload={false} />
    </div>
  )
}