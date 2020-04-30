import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, ViewEncapsulation } from '@angular/core';
import {bb} from 'billboard.js';

@Component({
  selector: 'gb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('container', {read: false, static: true}) container: ElementRef;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.createChart();
  }

  ngAfterViewInit(): void {
    this.setStyles();
  }

  private setStyles() {
    this.renderer.setStyle(
      this.el.nativeElement.querySelector('#chart .bb-axis-x line'),
      'visibility',
      'hidden'
    );
    this.renderer.setStyle(
      this.el.nativeElement.querySelector('#chart .bb-axis-x path'),
      'visibility',
      'hidden'
    );
    const list = this.el.nativeElement.querySelectorAll('#chart .bb-axis-x text');
    list.forEach((el) => this.renderer.setStyle(el, 'text-anchor', 'start'));
  }

  private createChart() {
    const chart = bb.generate({
      size: {
        width: 308,
        height: 371,
      },
      legend: {
        show: false
      },
      tooltip: {
        format: {
          title(d) { return undefined; },
          // just for exapmple
          value(value, ratio, id, index) { return `${value}s  (${(value / 100 * 3).toFixed(2)}%)`; }
        },
        order: 'desc'
      },
      title: {
        text: 'Worst Performing Pages',
        position: 'left',
        padding: {
          bottom: 19
        }
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      data: {
        x: 'x',
        columns: [
          // tslint:disable-next-line: max-line-length
          ['x', 'Registration', 'Package Selection', 'All Packages', 'Holidays Deals', 'Checkout', 'Confirmation', 'Personal Details ', 'Help', 'Peremium Deals'],
          ['Average TTFB', 230, 200, 100, 400, 150, 250, 300, 150, 250],
          ['Average Rendering Time', 150, 320, 210, 240, 115, 125, 240, 160, 125],
          ['Other', 130, 220, 140, 200, 250, 450, 100, 350, 410]
        ],
        type: 'bar',
        colors: {
           'Average TTFB': '#79D8FA',
           'Average Rendering Time': '#C0A3FF',
           'Other': '#C4C4C4'
        },
        groups: [
          [
            'Average TTFB',
            'Average Rendering Time',
            'Other'
          ]
        ]
      },
      axis: {
        rotated: true,
        x: {
          type: 'category',
          clipPath: false,
          tick: {
            width: 308,
            text: {
              position: {
                x: 9,
                y: -13
              }
            }
          }
        },
        y: {
          show: false
        }
      },
      bar: {
        width: 10,
        radius: {
          ratio: 0.1,
        },
      },
      bindto: '#chart'
    });
  }
}
