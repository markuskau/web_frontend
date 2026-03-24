# Tehtävä 2

### Tein Robot Framework -kirjautumistestin omalle päiväkirjasovellukselle ohjeiden mukaisesti.

#### Tein tiedoston nimeltä `browser_demo.robot` ja sinne lisäsin seuraavat rivit:

```bash
*** Settings ***
Library     Browser    auto_closing_level=KEEP
Library     BuiltIn
Resource    Keywords.robot


*** Test Cases ***
Test Own App Login Headless
    [Documentation]    Test successful login without browser popups
    New Browser    firefox    headless=No
    New Page       https://users.metropolia.fi/~markkaur/web_hyte/Final%20version/dist/
    Get Title      ==    Login page
    Type Text      form.loginForm >> [name="username"]    ${Username}    delay=0.1 s
    Type Secret    form.loginForm >> [name="password"]    $Password    delay=0.1 s
    Click With Options    form.loginForm >> input.loginform[type="submit"]    delay=1 s
    Wait For Elements State    div#loginResponse    visible    timeout=10 s
    Sleep   1 s
    ${message}=    Get Text    div#loginResponse
    Should Contain    ${message}    Login successful
    Should Contain    ${message}    markus3
```
### Päädyin käyttämään firefoxia, sillä robotFrameworks toimi paremmin users.metropolia -linkin kanssa kyseisessä selaimessa

### Testin tulos löytyy tiedostosta [output.xml](../../outputs/output.xml).







