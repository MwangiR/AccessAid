import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useQuery } from '@apollo/client';
import { SHOW_EVENT_DATES } from '../../utils/queries';

// const events = [{ title: 'Meeting', start: new Date() }];

export default function DemoApp() {
  const { loading, data } = useQuery(SHOW_EVENT_DATES);
  console.log('CALENDER', data);

  function transformEventData(eventData) {
    console.log('EventData', eventData);
    return eventData.map((event) => ({
      title: event.clientName,
      status: event.status,
      start: new Date(event.dueDate),
    }));
  }

  const events = loading ? [] : transformEventData(data.events);

  //   function renderEventContent(events) {
  //     return (
  //       <>
  //         <b>{events.start}</b>
  //         <i>{events.title}</i>
  //       </>
  //     );
  //   }
  return (
    <>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          weekends={false}
          events={events}
        />
      </div>
    </>
  );
}

// a custom render function
