```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server->>browser: The server responds with HTTP status 201 Created
    deactivate server

   
    Note right of browser:  This time the server does not ask for a redirect so no further HTTP requests.
    Note right of browser:  The browser stay in the same page and display the updated note
```

