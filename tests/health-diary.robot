*** Settings ***
Library     Browser    auto_closing_level=KEEP

*** Variables ***
${URL}        https://users.metropolia.fi/~markkaur/web_hyte/Final%20version/dist/
${Username}   markus3

*** Test Cases ***
Test Own App Login Headless
    Set Suite Variable    $Password    salasana-tähän
    New Browser    firefox    headless=No
    New Page       ${URL}
    Type Text      form.loginForm >> [name="username"]    ${Username}    delay=0.1 s
    Type Secret    form.loginForm >> [name="password"]    $Password    delay=0.1 s
    Click With Options    form.loginForm >> input.loginform[type="submit"]    delay=1 s
    Wait For Elements State    div#loginResponse    attached    timeout=10 s
    Sleep    1 s
    ${message}=    Get Text    div#loginResponse
    Should Contain    ${message}    Login successful
    Should Contain    ${message}    ${Username}
