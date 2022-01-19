import React from 'react';
import Scheduler from 'devextreme-react/scheduler';
import { CheckBox } from 'devextreme-react/check-box';

import { loadMessages } from 'devextreme/localization';
import notify from 'devextreme/ui/notify';

import { es } from './languaje.js';
import { eventoServices } from '../../../services/evento.service.js';

const currentDate = new Date();
const views = ['day', 'week'];

class Demo extends React.Component {
  constructor(props) {
    
    super(props);
    this.state = {
      allowAdding: true,
      allowDeleting: true,
      allowResizing: true,
      allowDragging: true,
      allowUpdating: false,
      data: {}
    };
    this.onAllowAddingChanged = this.onAllowAddingChanged.bind(this);
    this.onAllowDeletingChanged = this.onAllowDeletingChanged.bind(this);
    this.onAllowResizingChanged = this.onAllowResizingChanged.bind(this);
    this.onAllowDraggingChanged = this.onAllowDraggingChanged.bind(this);
    this.onAllowUpdatingChanged = this.onAllowUpdatingChanged.bind(this);
    this.showAddedToast = this.showAddedToast.bind(this);
    this.showUpdatedToast = this.showUpdatedToast.bind(this);
    this.showDeletedToast = this.showDeletedToast.bind(this);

    loadMessages({
      "en": es
    });

    eventoServices.obtenerEventos().then(
      response => {
        this.setState({ data: response.evento });
      }
    )
  }

  render() {
    return (
      <React.Fragment>
        <Scheduler
          timeZone="America/Argentina/Buenos_Aires"
          dataSource={this.state.data}
          views={views}
          defaultCurrentView="week"
          defaultCurrentDate={currentDate}
          startDayHour={9}
          endDayHour={23}
          height={600}
          editing={this.state}
          onAppointmentAdded={this.showAddedToast}
          onAppointmentUpdated={false} //this.showUpdatedToast
          onAppointmentDeleted={this.showDeletedToast}
        />
        {/* <div className="options">
          <div className="caption">Options</div>
          <div className="options-container">
            <div className="option">
              <CheckBox
                defaultValue={this.state.allowAdding}
                text="Allow adding"
                onValueChanged={this.onAllowAddingChanged}
              />
            </div>
            <div className="option">
              <CheckBox
                defaultValue={this.state.allowDeleting}
                text="Allow deleting"
                onValueChanged={this.onAllowDeletingChanged}
              />
            </div>
            <div className="option">
              <CheckBox
                defaultValue={this.state.allowUpdating}
                text="Allow updating"
                onValueChanged={this.onAllowUpdatingChanged}
              />
            </div>
            <div className="option">
              <CheckBox
                defaultValue={this.state.allowResizing}
                text="Allow resizing"
                onValueChanged={this.onAllowResizingChanged}
                disabled={!this.state.allowUpdating}
              />
            </div>
            <div className="option">
              <CheckBox
                defaultValue={this.state.allowDragging}
                text="Allow dragging"
                onValueChanged={this.onAllowDraggingChanged}
                disabled={!this.state.allowUpdating}
              />
            </div>
          </div>
        </div> */}
      </React.Fragment>
    );
  }

  onAllowAddingChanged(e) {
    this.setState({ allowAdding: e.value });
  }

  onAllowDeletingChanged(e) {
    this.setState({ allowDeleting: e.value });
  }

  onAllowResizingChanged(e) {
    this.setState({ allowResizing: e.value });
  }

  onAllowDraggingChanged(e) {
    this.setState({ allowDragging: e.value });
  }

  onAllowUpdatingChanged(e) {
    this.setState({ allowUpdating: e.value });
  }

  showToast(event, value, type) {
    notify(`${event} "${value}" task`, type, 800);
  }

  showAddedToast(e) {
    eventoServices.guardarEvento(e.appointmentData).then(
      response => {
        this.showToast('Added', e.appointmentData.text, 'success');
      },
      error => {
        debugger  
      }
    )
    
  }

  showUpdatedToast(e) {
    this.showToast('Updated', e.appointmentData.text, 'info');
  }

  showDeletedToast(e) {
    debugger
    eventoServices.eliminarEvento(e.appointmentData._id).then(
      response => {
        debugger
        this.showToast('Eliminado', e.appointmentData.text, 'warning');
      },
      error => {
        debugger  
      }
    )
    // this.showToast('Deleted', e.appointmentData.text, 'warning');
  }

}

export default Demo;
