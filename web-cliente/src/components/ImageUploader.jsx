import { UploaderComponent } from '@syncfusion/ej2-react-inputs';

import { URL_API } from '../../configuracion.json';

export default function ImageUploader() {
  const asyncSettings = {
    saveUrl: `${URL_API}/api/UploadBox`,
    removeUrl: `${URL_API}/api/UploadBox`,
  };

  const onUploadSuccess = (args) => {
    console.info(args);
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
      <UploaderComponent id='fileUpload' type='file'
        asyncSettings={asyncSettings} uploading={onUploadFile} removing={onRemoveFile} success={onUploadSuccess}
        autoUpload={true} sequentialUpload={false} />
    </div>
  )
}