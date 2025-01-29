//import { Application } from '@splinetool/runtime';
import { Application } from 'https://unpkg.com/@splinetool/runtime@latest/build/runtime.js';

var w = window.innerWidth;
if(w > 991){   

    // Initial tresholds:
    let tresholds = {};
    tresholds.splineCTA = 0.05;

    let playSpline = function (splid){
        splines[splid].setVariable('Playme',  true);

    }
    let stopSpline = function (splid){
        splines[splid].setVariable('Playme',  false);
    }
    // Initial callbacks:
    let callbacks = {};
    callbacks.splineCTA =  (entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                playSpline('splineCTA');
            }else{
                stopSpline('splineCTA');
            }
        });
    };
 
    // INITIAL: load splines and their observers
    var splines = {};
    const splineELS = document.querySelectorAll('[data-splineurl]');

    splineELS.forEach((el) => {
        var parent = el.parentElement;
        if (parent) var myCover = parent.querySelector(".spline-cover");
        var myid = el.getAttribute("id");
        splines[myid] = new Application(el);
        splines[myid].load(el.getAttribute("data-splineurl")).then(() => {
            splines[myid].observer = new IntersectionObserver(callbacks[myid],{threshold: tresholds[myid]});
            splines[myid].observer.observe(el.parentElement);
            splines[myid].observer.id = myid;
            splines[myid].myel = el;
            if (myCover) {
                setTimeout(() => {
                    myCover.style.display = "none";
                }, 100);
            }
        });
    });
}