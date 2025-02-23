import { Application } from 'https://unpkg.com/@splinetool/runtime@latest/build/runtime.js';

const w = window.innerWidth;
if (w > 991) {   

function waitForElement(selector, parent = document, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const element = parent.querySelector(selector);
        if (element) {
            return resolve(element);
        }

        const observer = new MutationObserver((mutations, obs) => {
            const el = parent.querySelector(selector);
            if (el) {
                resolve(el);
                obs.disconnect();
            }
        });

        observer.observe(parent, { childList: true, subtree: true });

        - Timeout
        setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Element ${selector} not found within ${timeout}ms`));
        }, timeout);
    });
}

let splines = {};
const callbacks = {};

const hasSliders = document.querySelector('[data-splineslider]') !== null;

// Callbacks for Spline slider slides
if (hasSliders) {
    callbacks.first = (entries, observer) => {
        const mykey = observer.mykey;
        const myobj = splines[observer.sliderkey]?.[mykey] || splines[mykey];
        entries.forEach(entry => {
            if (myobj.observeFlg === false) return;
            if (entry.isIntersecting) {
                myobj.play();
            } else {
                myobj.stop();
            }
            if (entry.boundingClientRect.top < 0) {
                myobj.observeFlg = false;
            }
        });
    };

    callbacks.middle = (entries, observer) => {
        const sliderkey = observer.sliderkey ?? null;
        const obj = key => splines[observer.sliderkey]?.[key] || splines[key];
        const mykey = observer.mykey;
        const myobj = obj(mykey);
        const prevkey = "_" + (mykey.slice(1) - 1);
        const prevobj = obj(prevkey);
        const myel = myobj.myel;
        if (prevobj) prevobj.observeFlg = true;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                myobj.observer.unobserve(myel.parentElement);
                myobj.observer = new IntersectionObserver(callbacks.middle_02, { threshold: 0.05 });
                myobj.observer.observe(myel.parentElement);
                myobj.observer.mykey = mykey;
                myobj.observer.sliderkey = sliderkey;
            }
        });
    };

    callbacks.middle_02 = (entries, observer) => {
        const sliderkey = observer.sliderkey ?? null;
        const obj = key => splines[observer.sliderkey]?.[key] || splines[key];
        const mykey = observer.mykey;
        const myobj = obj(mykey);
        const prevkey = "_" + (mykey.slice(1) - 1);
        const prevobj = obj(prevkey);
        const myel = myobj.myel;

        entries.forEach(entry => {
            if (myobj.observeFlg === false) return;
            if (entry.isIntersecting) {
                prevobj?.stop();
                myobj.play();
            } else {
                if (entry.boundingClientRect.top > 0) {
                    prevobj?.play();
                    myobj.stop();
                    myobj.observer.unobserve(myel.parentElement);
                    myobj.observer = new IntersectionObserver(callbacks.middle, { threshold: 0.95 });
                    myobj.observer.observe(myel.parentElement);
                    myobj.observer.mykey = mykey;
                    myobj.observer.sliderkey = sliderkey;
                } else {
                    myobj.observeFlg = false;
                }
            }
        });
    };

    callbacks.last = (entries, observer) => {
        const sliderkey = observer.sliderkey ?? null;
        const obj = key => splines[observer.sliderkey]?.[key] || splines[key];
        const mykey = observer.mykey;
        const myobj = obj(mykey);
        const prevkey = "_" + (mykey.slice(1) - 1);
        const prevobj = obj(prevkey);
        const myel = myobj.myel;
        if (prevobj) prevobj.observeFlg = true;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                myobj.observer.unobserve(myel.parentElement);
                myobj.observer = new IntersectionObserver(callbacks.last_02, { threshold: 0.05 });
                myobj.observer.observe(myel.parentElement);
                myobj.observer.mykey = mykey;
                myobj.observer.sliderkey = sliderkey;
            }
        });
    };

    callbacks.last_02 = (entries, observer) => {
        const sliderkey = observer.sliderkey ?? null;
        const obj = key => splines[observer.sliderkey]?.[key] || splines[key];
        const mykey = observer.mykey;
        const myobj = obj(mykey);
        const prevkey = "_" + (mykey.slice(1) - 1);
        const prevobj = obj(prevkey);
        const myel = myobj.myel;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                prevobj?.stop();
                myobj.play();
            } else {
                if (entry.boundingClientRect.top > 0) {
                    prevobj?.play();
                    myobj.stop();
                    myobj.observer.unobserve(myel.parentElement);
                    myobj.observer = new IntersectionObserver(callbacks.last, { threshold: 0.95 });
                    myobj.observer.observe(myel.parentElement);
                    myobj.observer.mykey = mykey;
                    myobj.observer.sliderkey = sliderkey;
                } else {
                    splines[observer.sliderkey]?.stopAll();
                }
            }
        });
    };

    // Init Spline sliders
    const splineSliders = document.querySelectorAll('[data-splineslider]');
    splineSliders.forEach(splineSlider => {
        const splSldrID = splineSlider.getAttribute('data-splineslider');
        const splSldrKey = "slider" + splSldrID;
        const myobj = (splines[splSldrKey] ??= {});

        myobj.stopAll = () => {
            Object.values(myobj).forEach(obj => obj.stop?.());
        };

        const splineELS = splineSlider.querySelectorAll('[data-splSlideID]');
        let splslideCounter = 1;
        const splslideTotal = splineELS.length;

        splineELS.forEach((el) => {
            const myid = el.getAttribute("data-splSlideID");
            const parent = el.parentElement;
            const mykey = "_" + splslideCounter;

            myobj[mykey] = new Application(el);
            const callbck = (splslideCounter === 1) ? callbacks.first :
                            (splslideCounter === splslideTotal) ? callbacks.last :
                            callbacks.middle;

            const mytreshold = (splslideCounter === 1) ? 0.05 : 0.95;
            myobj[mykey].myel = el;
            myobj[mykey].load(el.getAttribute("data-splineurl")).then(() => {
                myobj[mykey].observer = new IntersectionObserver(callbck, { threshold: mytreshold });
                myobj[mykey].observer.observe(el.parentElement);
                myobj[mykey].observer.mykey = mykey;
                myobj[mykey].observer.sliderkey = splSldrKey;

                myobj[mykey].play = function () {
                    this.setVariable('Playme', true);
                    const className = "sp" + myid;
                    const myInd = document.querySelector("." + className);
                    if (myInd) {
                         myInd.style.backgroundColor = "green";
                    }
                };
                myobj[mykey].stop = function () {
                    this.setVariable('Playme', false);
                    const className = "sp" + myid;
                    const myInd = document.querySelector("." + className);
                    if (myInd) {
                         myInd.style.backgroundColor = "red";
                    }
                };

                if (splslideCounter < splslideTotal) {
                    myobj[mykey].observeFlg = true;
                }

                waitForElement(".spline-cover", parent)
                    .then(myCover => {
                        setTimeout(() => { myCover.style.display = "none"; }, 100);
                    })
                    .catch(console.warn);
            });

            splslideCounter++;
        });
    });
}

// Callbacks for regular Splines
callbacks.solo = (entries, observer) => {
    const mykey = observer.mykey;
    const myobj = splines[mykey];
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            myobj.play();
        } else {
            myobj.stop();
        }
    });
};

// Init regular Splines
const splineELS = document.querySelectorAll('[data-splineID]');
splineELS.forEach((el) => {
    const parent = el.parentElement;
    const myid = el.getAttribute("data-splineID");
    const mykey = "_" + myid;

    splines[mykey] = new Application(el);
    splines[mykey].load(el.getAttribute("data-splineurl")).then(() => {
        splines[mykey].observer = new IntersectionObserver(callbacks.solo, { threshold: 0.05 });
        splines[mykey].play = function () {
            this.setVariable('Playme', true);
            const className = "sp" + myid;
            const myInd = document.querySelector("." + className);
            if (myInd) {
                 myInd.style.backgroundColor = "green";
            }
        };
        splines[mykey].stop = function () {
            this.setVariable('Playme', false);
            const className = "sp" + myid;
            const myInd = document.querySelector("." + className);
            if (myInd) {
                 myInd.style.backgroundColor = "red";
            }
        };
        splines[mykey].observer.observe(el.parentElement);
        splines[mykey].observer.mykey = mykey;
        splines[mykey].myel = el;

        waitForElement(".spline-cover", parent)
            .then(myCover => {
                setTimeout(() => { myCover.style.display = "none"; }, 100);
            })
            .catch(console.warn);
    });
});
}