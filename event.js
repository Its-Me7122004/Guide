        // Sample JSON data (could also be fetched from an external file)
        const eventsData = {
            "events": [
                {
                    "event_name": "Pranah Fest",
                    "time": "9:00 AM",
                    "venue": "Main Auditorium"
                },
                {
                    "event_name": "Ethnic day",
                    "time": "10:00 AM",
                    "venue": "Chavara Garden"
                },
                {
                    "event_name": "Cultural Night",
                    "time": "4:30 PM",
                    "venue": "Indoor Stadium"
                }
            ]
        };

        // Function to populate the event list
        function populateEventList(events) {
            const eventListElement = document.getElementById('event-list');
            events.forEach(event => {
                const listItem = document.createElement('li');
                listItem.classList.add('event');
                listItem.textContent = `${event.event_name} - ${event.time} @ ${event.venue}`;
                eventListElement.appendChild(listItem);
            });
        }

        // Call the function to populate the event list when the page loads
        populateEventList(eventsData.events);

        let countdownInterval;
        function startCountdown(duration, display) {
            let timer = duration, hours, minutes, seconds;
            countdownInterval = setInterval(function () {
                hours = parseInt(timer / 3600, 10);
                minutes = parseInt((timer % 3600) / 60, 10);
                seconds = parseInt(timer % 60, 10);

                hours = hours < 10 ? "0" + hours : hours;
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = hours + ":" + minutes + ":" + seconds;

                if (--timer < 0) {
                    clearInterval(countdownInterval);
                }
            }, 1000);
        }

        function stopCountdown() {
            clearInterval(countdownInterval);
        }

        window.onload = function () {
            const countdownElement = document.getElementById('countdown');
            const countdownDuration = 24 * 60 * 60; // 24 hours in seconds
            startCountdown(countdownDuration, countdownElement);
        };
