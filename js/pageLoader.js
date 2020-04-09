/*---------------------------------------------------------
* Template Name    : Sophia | Responsive Personal Template
* Author           : CasanovasThemes
* Version          : 1.0
* Created          : December 2019
* File Description : Page Loader JS file of the Template
*----------------------------------------------------------
*/
"use strict";
document.addEventListener("DOMContentLoaded", function (event) {
	var C = document.createElement('canvas');
	var c = C.getContext('2d');

	C.width = 300; C.height = 200;
	C.classList.add("loader2");
	document.getElementsByClassName("loader")[0].appendChild(C);

	var particles = [];
	for (var i = 100; i--; particles.push([
		Math.random() * Math.PI * 2,
		Math.random() * Math.PI * 2,
		[
			Math.random() * 256 | 0,
			Math.random() * 256 | 0,
			Math.random() * 256 | 0
		]
	]));

	(function render() {
		c.setTransform(1, 0, 0, 1, 0, 0);
		c.scale(C.width / 2, C.height / 2);
		c.translate(1, 1);

		c.globalCompositeOperation = 'destination-out';
		c.fillStyle = 'rgba(0, 0, 0, .1)';
		c.fillRect(-1, -1, 2, 2);

		var x, y, z, w, t, p, r = 0.1, f = 1;
		c.globalCompositeOperation = 'lighter';

		for (var i = 0; p = particles[i++];) {
			t = Date.now() / 2000 * (i % 2 ? 1 : -1);
			x = r * Math.sin(p[0] + t * 2) * Math.cos(p[1] + t * 20);
			y = r * Math.tan(p[0] + t / 3);
			z = r * Math.sin(p[0] + t * 2) * Math.cos(p[1] + t * 2);
			w = f / (f - z);
			c.beginPath(); c.arc(x * w, y * w, w / 100, 0, 2 * Math.PI);
			c.fillStyle = 'rgba(' + p[2] + ', ' + w / 5 + ')';
			c.fill();
		}

		requestAnimationFrame(render);
	})();
	window.onload = function () {
		fadePreLoading();
	};
	function fadePreLoading() {
		document.getElementsByClassName("container-loader-pre")[0].style.visibility = "hidden";
		document.getElementsByClassName("container-loader-pre")[0].style.opacity = "0";
		document.getElementsByClassName("container-loader-pre")[0].style.transition = "0.5s";

		var fontSize = 72;

		if (window.screen.width < 700) {
			fontSize = 32;
		} else if (window.screen.width < 1200) {
			fontSize = 56;
		}
		var alt = (window.innerHeight / 2) - fontSize - 20;

		/****HAND WRITTING EFFECT******/
		var vara = new Vara(
			"#container-pageLoader",
			"./json/Satisfy/SatisfySL.json",
			[
				{
					text: "Abir Halwa",//Put your name instead of Shopia Ross
					y: alt,
					fromCurrentPosition: { y: false },
					duration: 1800,
					id: "draw",
					autoAnimation: false
				}
			],
			{
				strokeWidth: 0.5,
				color: "#fff",
				fontSize: fontSize,
				textAlign: "center"
			}
		);
		vara.ready(function () {
			vara.draw("draw");
			vara.animationEnd(function (i, o) {
				setTimeout(function () {
					$(".container-loader").fadeOut('fast');
					$("body").css({ "overflow": "auto" });
					//when the page is loaded, overflow auto	
				}, 500);
			});
		});
	}
});