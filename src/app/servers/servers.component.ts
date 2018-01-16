import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewProcess = false;
  processCreationStatus = '';
  deviceCreationStatus = '';
  processName = '';
  deviceName = '';
  processes = [];

  constructor() {
    setTimeout(() => {
      this.allowNewProcess = true;
    }, 2000);
  }
  ngOnInit() {
  }

  onCreateProcess() {
    this.processCreationStatus = 'New Process Data received:\n'
    + this.processName;
    this.processes.push(this.processName);
  }

  onUpdateProcessTitle(event: any) {
    console.log(event);
  }

  setDeviceName(name: string) {
    if (!this.isEmpty(this.deviceName)) {
      this.deviceCreationStatus = 'New Device:\n' + name;
    }
  }

  isEmpty(status: string) {
    if (status === '') {
      return true;
    }
  }

  resetDeviceName() {
    this.deviceName = '';
    this.deviceCreationStatus = '';
  }
}
