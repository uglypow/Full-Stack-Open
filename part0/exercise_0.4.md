sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: Enter input
    user->>browser: click save button

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    server->>browser: The server responds with HTTP status code 302
    browser->>server: HTTP GET request to the address defined in the header's Location - the address notes.


    activate server
    server-->>browser: HTML document
    deactivate server
    Note right of browser: The browser will do 3 more HTTP(css, js, json) requests which is the same process as the last diagram
    Note right of browser: The browser display the updated note after it finished all the process