import { Component } from '@angular/core';
import * as CanvasJS from '../assets/canvasjs.min';
import { Options } from './models/options';
import { SimuladorService } from './services/simulador.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  options = null;

  constructor(private simuladorService: SimuladorService) {}

  ngOnInit() {
    this.initOptions();
  }

  initOptions(){
    this.options = new Options();
    this.options.time = 1000;
    this.options.topology = "NSFNet";
    this.options.fswidth = 12.5;
    this.options.capacity = 350;
    this.options.erlang = 100;
    this.options.lambda = 5;
    this.options.fsrangemin = 2;
    this.options.fsrangemax = 8;
  }

  simular(){
    this.simuladorService.simular(this.options)
    .toPromise().then(
      res => {
        this.draw(res)
      }
    );
  }

  draw(res){
    let dataPoints = [];
    let bloqueos = [];
  	let y = 0;
    bloqueos = [{x:50, y: 0.05}, {x:125, y: 0.05}, {x:250, y: 0.05}, {x:400, y: 0.05}, {x:450, y: 0.05}];

    for (var i = 0; i < 1000; i += 1) {
    	y += Math.round(Math.random() * 10 - 5);
    	dataPoints.push({
    		x: i,
    		y: y
    	});
    }
    this.createChart(dataPoints, bloqueos, "chartEntropia", 'Entropía', '#a84032')
    y = 0;
    dataPoints = [];
  	for ( var i = 0; i < 1000; i++ ) {
  		y =  Math.random() * 400;
  		dataPoints.push({ y: y});
  	}
    this.createChart(dataPoints, bloqueos, "chartMsi", 'MSI', '#3a87ad')
    y = 0;
    dataPoints = [];
  	for ( var i = 0; i < 1000; i++ ) {
  		y =  Math.random();
  		dataPoints.push({ y: y});
  	}
    this.createChart(dataPoints, bloqueos, "chartBFR", 'BFR', '#32a852')
    y = 0;
    dataPoints = [];
  	for ( var i = 0; i < 1000; i++ ) {
  		y =  Math.random() * 250;
  		dataPoints.push({ y: y});
  	}
    this.createChart(dataPoints, bloqueos, "chartLightPaths", 'Cantidad de Light Paths', '#a89e32')
    y = 0;
    dataPoints = [];
  	for ( var i = 0; i < 1000; i++ ) {
  		y =  Math.random() * 150;
  		dataPoints.push({ y: y});
  	}
    this.createChart(dataPoints, bloqueos, "chartPathConEntropia", 'Path Consecutivos', '#7532a8')
    y = 0;
    dataPoints = [];
  	for ( var i = 0; i < 1000; i++ ) {
  		y =  Math.random() * 0.8;
  		dataPoints.push({ y: y});
  	}
    this.createChart(dataPoints, bloqueos, "chartEntUso", 'Entropía/Uso', '#32a892')
  }

  createChart(dataPoints, bloqueos, dom, tittle, color){
    let chart = new CanvasJS.Chart(dom, {
  		zoomEnabled: true,
  		animationEnabled: true,
  		exportEnabled: true,
  		title: {
  			text: ""
  		},
  		subtitles:[{
  			text: tittle
  		}],
  		data: [
  		{
  			type: "line",
  			dataPoints: dataPoints,
        lineColor: color,
        indexLabelBackgroundColor: color,
        markerColor: color,
        markerBorderColor: color,
        fallingColor: color,
        color: color,
        indexLabelFontColor: color,

  		}]
  	});

  	chart.render();
  }
}
