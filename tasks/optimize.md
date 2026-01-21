I want you to implement the "optimize routes" button in the @src/components/ConfigPanel.tsx file.

There are few key pieces of information that you must use during this implementation.

1. There is a primary curl request that returns all of the necessary information. Here is what it looks like in practice:

```zsh
     curl -X POST "http://localhost:3001/rides" \
          -H "Content-Type: application/json" \
          -d '{
                "drivers": [
                  {
                    "name": "Driver Name",
                    "lat": "38.537726",
                    "lng": "-121.727852"
                  }
                ],
                "riders": [
                  {
                    "name": "Rider Name",
                    "lat": "38.541214",
                    "lng": "-121.762121"
                  }
                ],
                "destination": {
                  "lat": "38.565671",
                  "lng": "-121.441993"
                }
              }'

<REDACTED>
```

2. Display the fetched information with a focus on a clean UI. There should also be a "copy text" button that allows the user to copy the optimal route as text. The copied text should look like:

<driver_1_name>: <service_time_of_driver_2>
<rider_1>
<rider_2>
<rider_3>
...

<driver_2_name> : <service_time_of_driver_2>
...
