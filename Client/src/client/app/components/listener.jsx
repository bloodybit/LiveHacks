import React, { Component } from 'react';

class Listener extends Component {



    movement() {
        // shim layer with setTimeout fallback
        window.requestAnimationFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();

        var $parent = $("#parent"),
            $elements = $('img', $parent),
            vertSpeed = 2,
            horiSpeed = 2;

        var height = $parent.height(),
            width = $parent.width();
        $parent.css("position", "relative")
            .css("overflow", "hidden");

        // store all the data for animation
        var items = [];
        for (var i = 0; i < $elements.length; i++) {
            var $element = $($elements[i]),
                elementWidth = $element.width(),
                elementHeight = $element.height();

            $element.css("position", "absolute");

            var item = {
                element: $element[0],
                elementHeight: elementHeight,
                elementWidth: elementWidth,
                ySpeed: -vertSpeed,

                omega: 2 * Math.PI * horiSpeed / (width * 60), //omega= 2Pi*frequency
                random: (Math.random() / 2 + 0.5) * i * 10000, //random time offset
                x: function (time) {
                    return (Math.sin(this.omega * (time + this.random)) + 1) / 2 * (width - elementWidth);
                },
                y: height + (Math.random() + 1) * i * elementHeight,
            }
            items.push(item);
        }

        var counter = 0;
        var animationStep = function () { //called 60 times a second
            var time = +new Date(); //little trick, gives unix time in ms
            var check = (counter % 10 === 0);

            for (var i = 0; i < items.length; i++) {
                var item = items[i];

                transformString = "translate3d(" + item.x(time) + "px," + item.y + "px,0px)";
                item.element.style.transform = transformString;
                item.element.style.webkitTransform = transformString;

                item.y += item.ySpeed;
                if (check && item.y < -item.elementHeight) { //check bounds every 10th iteration
                    item.y = height;
                }
            }

            counter %= 10;
            counter++;
            requestAnimationFrame(animationStep);
        }

        requestAnimationFrame(animationStep);   
    }

    listen() {
        const socket = new WebSocket(`ws://stagecast.se/api/events/comments/ws?x-user-listener=1`)

        socket.onmessage = function (event) {

            console.log(event.data);

            let json = JSON.parse(event.data)
            console.log("JSON", json);
            if (json.msg == "end") {
                console.log("END");
            }

            if (json.msg == "begin") {
                console.log(json.msg);
            }
        }

        socket.onerror = function () {
            console.log("error")
        }

        socket.onopen = function () {
            console.log("connected to socket")
        }
    }

    render() {
        return null;
    }
}

export default Listener;