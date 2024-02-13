import { DialogComponent } from '@syncfusion/ej2-react-popups';

/* eslint-disable react/prop-types */
const ShowError = ({ validation }) => {
  if (Array.isArray(validation)) {
    return (
      validation.map((v, i) => (
        <span key={i}>
          {v} <br />
        </span>
      ))
    )
  }

  return validation;
}

export default function Errores({
  errors,
  cleanErrors
}) {
  const animationSettings = { effect: 'None' };
  const validations = Object.values(errors);

  const buttons = [
    {
      // Click the footer buttons to hide the Dialog
      click: () => {
        cleanErrors();
      },
      // Accessing button component properties by buttonModel property
      buttonModel: {
        //Enables the primary button
        isPrimary: true,
        content: 'OK',
      },
    },
  ];

  const dialogClose = () => {
    cleanErrors();
  };

  return (
    <DialogComponent id="modalDialog" isModal={true} buttons={buttons} header="Revise la siguiente informacion" width="335px" content={() => (validations.map((v, i) => <ShowError key={i} validation={v} />))}
      target="#root" visible={validations.length > 0} close={dialogClose} animationSettings={animationSettings}></DialogComponent>
  )
}