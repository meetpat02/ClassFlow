

import { ScheduleComponent,Week, Inject } from '@syncfusion/ej2-react-schedule';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-react-schedule/styles/material.css';
import { registerLicense } from '@syncfusion/ej2-base';
import PropTypes from 'prop-types';

export function Calendar() {
  registerLicense('ORg4AjUWIQA/Gnt2XVhhQlJHfVxdXnxLflFzVWpTe116dVVWACFaRnZdR11hSXxTdkBrWHhecXVS');
  const classSchedule = [
    {
      Id: 1,
      Subject: 'Calc 1 ',
      StartTime: new Date(2025, 1, 3, 9, 0), // Monday 9 AM
      EndTime: new Date(2025, 1, 3, 10, 20),
      CategoryColor: 'blue'
    },
    {
      Id: 2,
      Subject: 'Intro To Computer Science',
      StartTime: new Date(2025, 1, 4, 11, 0), // Tuesday 11 AM
      EndTime: new Date(2025, 1, 4, 12, 30),
      CategoryColor: 'blue'
    },
    {
      Id: 3,
      Subject: 'College Writing',
      StartTime: new Date(2025, 1, 5, 14, 0), // Wednesday 2 PM
      EndTime: new Date(2025, 1, 5, 15, 30),
      CategoryColor: 'yellow'
    },
    {
      Id: 4,
      Subject: 'General Physics Lab',
      StartTime: new Date(2025, 1, 5, 14, 0), // Wednesday 2 PM
      EndTime: new Date(2025, 1, 5, 15, 30),
      CategoryColor: 'green'
    },
    {
      Id: 5,
      Subject: 'General Physics',
      StartTime: new Date(2025, 1, 5, 14, 0), // Wednesday 2 PM
      EndTime: new Date(2025, 1, 5, 15, 30),
      CategoryColor: 'blue'
    }
  ];

  
  const onPopupOpen = (args) => {
    args.cancel = true;
  }

  const fixedDate = new Date(2025, 1, 2); 

  const actionBegin = (args) => {
    // Prevent event creation or saving actions
    if (args.requestType === 'eventCreate' || args.requestType === 'eventSave') {
      args.cancel = true; // Prevent creating or saving events
    }
    // Prevent event editing (Save, Cancel, Delete buttons)
    if (args.requestType === 'eventChange' || args.requestType === 'eventDelete') {
      args.cancel = true; // Prevent editing and deleting events
    }
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ width: '50%' }}>
        <h2>Weekly Class Scheduler</h2>
        <ScheduleComponent
          currentView="Week"
          currentDate={fixedDate} // Set currentDate to a fixed value
          startHour="08:00"
          endHour="24:00"
          eventSettings={{ dataSource: classSchedule }}
          popupOpen={onPopupOpen}
          height="600px"
          showHeaderBar={false}

          showDateHeader={false}
          showTimeIndicator={false}
          firstDayOfWeek={0} // Start from Sunday
          workDays={[0, 1, 2, 3, 4, 5, 6]} // Display all days of the week
          dateHeaderTemplate={(props) => {
            const dayOfWeek = new Date(props.date).toLocaleString('en-US', { weekday: 'long' }); // Display only the day name
            return (
              <div style={{ textAlign: 'center' }}>
                {dayOfWeek}
              </div>
            );
          }}
          readonly={true} // Make the schedule readonly to prevent interaction
          showWeekNumber={false} // Hide the week number to prevent confusion
          allowMultiDrag={true} // Prevent dragging events across weeks
          enableDragAndDrop={false} // Disable drag and drop functionality
          enableResizing={false} // Disable resizing of events
          enableTooltip={false} // Optionally, disable tooltips
          showQuickInfo={false} // Hide the event editor and its buttons (Save, Cancel, Delete)
          showQuickAdd={false} // Hide the Add Event button and toolbar
          actionBegin={actionBegin} // Prevent event creation, editing, and deletion
        >
          <Inject services={[Week]}  />
        </ScheduleComponent>
      </div>
    </div>
  );



}

Calendar.defaultProps = {
  date: null, // Set default to null if no user is passed
};
