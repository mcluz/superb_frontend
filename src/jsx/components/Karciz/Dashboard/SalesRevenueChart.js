import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class SalesRevenueChart extends Component {
   render() {
      const data = {
			defaultFontFamily: "Poppins",
			labels: ["Jan", "Febr", "Mar", "Apr", "May", "Jun", "Jul"],

			datasets: [
				{
					label: "My First dataset",
					data: [25, 20, 60, 41, 66, 45, 80],
					borderColor: 'rgba(19, 180, 151, 1)',
					borderWidth: "2",
					backgroundColor: 'transparent',
					pointBackgroundColor: 'transparent',
					pointBorderColor:'transparent',
					pointHoverBackgroundColor:'rgba(19,180,151,1)',
					pointBorderWidth:30,
					pointHoverRadius: 10,
				}
			]
      };
      const options = {
			legend: false, 
			scales: {
				yAxes: [{
					color: "rgba(255, 255, 255,1)",
					ticks: {
						beginAtZero: true, 
						max: 100, 
						min: 0, 
						stepSize: 20, 
						padding: 10								
					},
					gridLines: {
						color: "rgba(255, 255, 255,0.05)",
						drawBorder: true
					}
				}],
				xAxes: [{
					ticks: {
						padding: 5
					},
					gridLines: {
						color: "rgba(255, 255, 255,0.05)",
						drawBorder: true
					}
				}]
			}
      };

      return (
         <>
            <Line data={data} height={100} options={options} />
         </>
      );
   }
}

export default SalesRevenueChart;
