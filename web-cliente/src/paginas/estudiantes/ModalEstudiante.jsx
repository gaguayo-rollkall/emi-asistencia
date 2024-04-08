import { DialogComponent } from '@syncfusion/ej2-react-popups';

export default function ModalEstudiante({
  status,
  setStatus,
}) {
  const animationSettings = { effect: 'None' };

  const dlgButtonClick = () => {
    window.open("https://www.syncfusion.com/company/about-us");
  };
  const buttons = [
    {
      click: dlgButtonClick,
      buttonModel: {
        content: 'Learn More',
        isPrimary: true,
      }
    }
  ];

  const dialogClose = () => {
    setStatus(false);
  };
  const dialogOpen = () => {
    setStatus(true);
  };

  return (
    <DialogComponent
      id="estudiantesDialog"
      showCloseIcon={true}
      animationSettings={animationSettings}
      width="500px"
      target="#estudiantes-main"
      header="About SYNCFUSION Succinctly Series"
      visible={status}
      buttons={buttons}
      open={dialogOpen}
      close={dialogClose}
      isModal={true}
    >
      <div>
        <div>
          In the Succinctly series, Syncfusion created a robust free library
          of more than 130 technical e-books formatted for PDF, Kindle, and
          EPUB.
          <br />
          <br />
          The Succinctly series was born in 2012 out of a desire to provide
          concise technical e-books for software developers Each title in
          the Succinctly series is written by a carefully chosen expert and
          provides essential content in about 100 pages.
        </div>
      </div>
    </DialogComponent>
  )
}