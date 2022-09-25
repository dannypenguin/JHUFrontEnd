(function() {
    // Coursera Way
    var guest = {};
    guest.names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];
    for (element in guest.names) {
        var firstletter = guest.names[element].charAt(0).toLowerCase();
        if (firstletter === 'j') {
            byeSpeaker.speak(guest.names[element]);
        } else {
            helloSpeaker.speak(guest.names[element]);
        }
    }

    // Map Function Way
    guest.logic = function(name) {
        var firstletter = name.charAt(0).toLowerCase();
        if (firstletter === 'j') {
            return byeSpeaker.speakSimple(name);
        } else {
            return helloSpeaker.speakSimple(name);
        }
    }
    guest.namesMap = guest.names.map(x => guest.logic(x));

    for (element in guest.namesMap) {
        console.log(guest.namesMap[element]);
    }

    // Reduce Function Way
    guest.reduceFunction = guest.names.reduce((previousValue, currentValue) => {
        if (currentValue.charAt(0).toLowerCase() === 'j') {
            previousValue.bye.push(byeSpeaker.speakSimple(currentValue));
            return previousValue;
        } else {
            previousValue.hello.push(helloSpeaker.speakSimple(currentValue));
            return previousValue;
        }
    }, { hello: [], bye: [] })

    for (element in guest.reduceFunction.hello) {
        console.log(guest.reduceFunction.hello[element]);
    }

    for (element in guest.reduceFunction.bye) {
        console.log(guest.reduceFunction.bye[element]);
    }
})();