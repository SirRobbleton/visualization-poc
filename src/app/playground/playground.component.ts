import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Vis2dGraphDirective} from '../visuals/vis2dgraph.directive';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  animations: [
    trigger('infoState', [
      state('hidden', style({
        // width: '100px',
        // height: '100px',
        transform: 'translateX(0) scale(0)'
      })),
      state('selected1', style({
        // width: '150px',
        // height: '150px',
        transform: 'translateX(0) scale(1)'
      })),
      state('selected2', style({
        // width: '150px',
        // height: '150px',
        transform: 'translateX(0) scale(1)'
      })),
      transition('* => selected1', [
        animate(100, style({
          transform: 'translateX(0) scale(0)'
        })),
        animate(300)
      ]),
      transition('* => selected2', [
        animate(100, style({
          transform: 'translateX(0) scale(0)'
        })),
        animate(300)
      ]),
    ]),
    trigger('wildState', [
      state('normal', style({
        width: '100px',
        height: '100px',
        transform: 'translateX(0) scale(1)'
      })),
      state('special', style({
        width: '150px',
        height: '150px',
        transform: 'translateX(50px) scale(1)'
      })),
      state('maximized', style({
        width: '200px',
        height: '200px',
        transform: 'translateX(200px) scale(1)'
      })),
      transition('normal => special', animate(500)),
      transition('special => normal', animate(500)),
      transition('maximized => *', animate(1000)),
      transition('* => maximized', [
        style({
          backgroundColor: 'red'
        }),
        animate(1000, style({
          width: '50%'
        })),
        animate(1000, style({
          backgroundColor: 'blue'
        })),
        animate(1000)
      ]),
    ])
  ]
})
export class PlaygroundComponent implements OnInit {
  public infoState = 'hidden';
  public wildState = 'normal';
  public wildText = 'Normal';
  public isTest = true;

  @ViewChild(Vis2dGraphDirective) private _2dGraph: Vis2dGraphDirective;

  constructor() { }

  ngOnInit() {
  }

  public transformInfo() {
    switch (this.infoState) {
      case 'selected1': {
        this.infoState = 'selected2';
        break;
      }
      case 'selected2': {
        this.infoState = 'selected1';
        break;
      }
      default: {
        this.infoState = 'selected1';
        break;
      }
    }
    console.log('Infostate: ' + this.infoState);
  }

  public maximizeInfo() {
    switch (this.wildState) {
      case 'normal' : {
        this.wildState = 'special';
        this.wildText = 'Special';
        break;
      }
      case 'special' : {
        this.wildState = 'maximized';
        this.wildText = 'WILD';
        break;
      }
      default : {
        this.wildState = 'normal';
        this.wildText = 'normal';
        break;
      }
    }
  }
}
