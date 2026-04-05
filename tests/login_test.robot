*** Settings ***
Library     Browser    auto_closing_level=KEEP
Variables   env_python.py

*** Test Cases ***
Test Own App Login Headless
    [Documentation]    Testaa kirjautuminen omalle sovellukselle käyttäen .env
    New Browser    firefox    headless=False
    New Page       ${BASE_URL}

    # Syötä käyttäjätunnus ja salasana
    Type Text             form.loginForm >> [name="username"]    ${USERNAME}    delay=0.2 s
    Type Secret           form.loginForm >> [name="password"]    $PASSWORD      delay=0.2 s

    # Klikkaa kirjautumisnappia
    Click With Options    form.loginForm >> input.loginform[type="submit"]    delay=1 s

    # Odota, että login-vastaus näkyy
    Wait For Elements State    div#loginResponse    visible    timeout=15 s
    Sleep    1 s

    # Hae ja tarkista viesti
    ${message}=    Get Text    div#loginResponse
    Log    Login response: ${message}
    Should Contain    ${message}    Login successful
    Should Contain    ${message}    ${USERNAME}
