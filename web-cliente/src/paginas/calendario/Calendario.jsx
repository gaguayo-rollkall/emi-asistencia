import { useEffect, useRef, useState } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { extend } from '@syncfusion/ej2-base';

import './Calendario.css';

// const fake = [{
//   "Id": 1,
//   "Subject": "Story Time for Kids",
//   "StartTime": "2021-02-14T04:30:00.000Z",
//   "EndTime": "2021-02-14T06:00:00.000Z",
//   "CategoryColor": "#1aaa55"
// }]

export default function Calendario() {
  const scheduleObj = useRef(null);
  const [data, setData] = useState([]);

  const actionComplete = (args) => {
    console.log(args);
  }

  const onEventRendered = (args) => {
      let categoryColor = args.data.CategoryColor;
      if (!args.element || !categoryColor) {
          return;
      }
      if (scheduleObj.current.currentView === 'Agenda') {
          args.element.firstChild.style.borderLeftColor = categoryColor;
      }
      else {
          args.element.style.backgroundColor = categoryColor;
      }
  };

  return (
    <div className="w-full h-full">
      <ScheduleComponent
        width='100%'
        height='100%'
        selectedDate={new Date()}
        ref={scheduleObj}
        eventSettings={{ dataSource: data }}
        eventRendered={onEventRendered}
        actionComplete={actionComplete}>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
    </div>
  )
}