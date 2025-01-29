import { Application } from 'https://unpkg.com/@splinetool/runtime@latest/build/runtime.js';

var w = window.innerWidth;
if(w > 991){   

    // Initial tresholds:
    let tresholds = {};
    tresholds.spline01 = 0.05;
    tresholds.spline02 = 0.95;
    tresholds.splineCTA = 0.05;

    let playSpline = function (splid){
        splines[splid].setVariable('Playme',  true);

    }
    let stopSpline = function (splid){
        splines[splid].setVariable('Playme',  false);
    }

    // Initial callbacks:
    let callbacks = {};
    callbacks.spline01 = (entries) => {
        entries.forEach(entry => {
            if(!splines.spline01.observeFlg) return;  
            if(entry.isIntersecting){
                playSpline('spline01');
            }else{
                stopSpline('spline01');
            }
        });
    };
    callbacks.spline02 = (entries, observer) => {
        var id = observer.id;
        var myel = splines.spline02.myel;
        entries.forEach(entry => {
            if(!splines.spline01.observeFlg){
                splines.spline01.observeFlg = true;
            }
            if(entry.isIntersecting){
                stopSpline('spline01');
                playSpline('spline02');
                splines.spline02.observer.unobserve(myel.parentElement);
                splines.spline02.observer = new IntersectionObserver(callbacks.spline02_02,{threshold:0.05});
                splines.spline02.observer.observe(myel.parentElement);
                splines.spline02.observer.id = id;
            }
        });
    };
    callbacks.splineCTA =  (entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                playSpline('splineCTA');
            }else{
                stopSpline('splineCTA');
            }
        });
    };
 

    // Chained callback:
    // threshold 0.05
    callbacks.spline02_02 = (entries, observer) => {
        var id = observer.id;
        var myel = splines.spline02.myel;
        entries.forEach(entry => {
            if(splines.spline01.observeFlg){
                splines.spline01.observeFl= false;
            }
            if(entry.isIntersecting){
                stopSpline('spline01');
                playSpline('spline02');
            }else{
                if(entry.boundingClientRect.top > 0) {
                    playSpline('spline01');
                    stopSpline('spline02');
                    splines.spline02.observer.unobserve(myel.parentElement);
                    splines.spline02.observer = new IntersectionObserver(callbacks.spline02,{threshold:0.95});
                    splines.spline02.observer.observe(myel.parentElement);
                    splines.spline02.observer.id = id;
                }else{
                    stopSpline('spline01');
                    stopSpline('spline02');
                }
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
            if(myid == 'spline01'){
                splines[myid].observeFlg = true;
            }
            splines[myid].myel = el;
            if (myCover) {
                setTimeout(() => {
                    myCover.style.display = "none";
                }, 100);
            }
        });
    });


}