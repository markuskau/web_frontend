*** Settings ***
Documentation       Terveyspäiväkirja – Uuden päiväkirjamerkinnän lisääminen
Library             SeleniumLibrary
Suite Setup         Avaa selain ja kirjaudu sisään
Suite Teardown      Close All Browsers

*** Variables ***
${LOGIN_URL}        http://localhost:5173/login.html
${DIARY_URL}        http://localhost:5173/diary.html
${BROWSER}          Firefox

# Vaihda omasi
${USERNAME}         username
${PASSWORD}         password

# Login-lomake
${LOGIN_USERNAME}   css:.loginForm input[name=username]
${LOGIN_PASSWORD}   css:.loginForm input[name=password]
${LOGIN_BTN}        css:.loginForm input[type=submit]
${LOGIN_RESPONSE}   id:loginResponse

# Diary-sivu
${ADD_ENTRIES_BTN}  css:.add_entries

# Add entry -dialogi
${ADD_DIALOG}       css:.add_entry_dialog
${DATE_INPUT}       id:entryDate
${MOOD_INPUT}       id:mood
${WEIGHT_INPUT}     id:weight
${SLEEP_INPUT}      id:sleepHours
${NOTES_INPUT}      id:notes
${ADD_BTN}          id:addEntryDialogBtn
${CLOSE_ADD_BTN}    id:closeAddDialogBtn

*** Test Cases ***

TC-01 Dialogi avautuu Add a new diary entry -napista
    [Documentation]    Klikataan "Add a new diary entry" -nappia ja
    ...                varmistetaan, että dialogi aukeaa.
    [Tags]    smoke

    Go To    ${DIARY_URL}
    Wait Until Page Contains Element    ${ADD_ENTRIES_BTN}
    Click Button    ${ADD_ENTRIES_BTN}
    Wait Until Element Is Visible    ${ADD_DIALOG}    timeout=5s
    Element Should Be Visible    ${ADD_DIALOG}

TC-02 Onnistunut merkinnän lisääminen kaikilla kentillä
    [Documentation]    Täytetään kaikki lomakekentät ja klikataan Add.
    ...                Sovellus näyttää onnistumis-alertin joka hyväksytään,
    ...                minkä jälkeen dialogi sulkeutuu.
    [Tags]    smoke    happy_path

    Go To    ${DIARY_URL}
    Avaa lisäysdialogi

    Input Text    ${DATE_INPUT}     2025-06-15
    Input Text    ${MOOD_INPUT}     Happy
    Input Text    ${WEIGHT_INPUT}   75
    Input Text    ${SLEEP_INPUT}    8
    Input Text    ${NOTES_INPUT}    Testi – kaikki kentät täytetty.

    Click Button    ${ADD_BTN}

    # Sovellus näyttää alert-ikkunan onnistumisesta – hyväksytään se
    ${alert_text}=    Handle Alert    ACCEPT    timeout=5s

    # Varmistetaan että alert sisälsi onnistumisviestin
    Should Contain    ${alert_text}    Entry added successfully

    # Dialogi sulkeutuu alertin jälkeen
    Wait Until Element Is Not Visible    ${ADD_DIALOG}    timeout=5s
    Element Should Not Be Visible        ${ADD_DIALOG}

TC-03 Dialogi suljetaan Close-napilla ilman tallennusta
    [Tags]    happy_path

    Go To    ${DIARY_URL}
    Avaa lisäysdialogi
    Input Text      ${MOOD_INPUT}    Tätä ei tallenneta
    Click Button    ${CLOSE_ADD_BTN}
    Wait Until Element Is Not Visible    ${ADD_DIALOG}    timeout=5s
    Element Should Not Be Visible        ${ADD_DIALOG}

TC-04 Kaikki lomakekentät löytyvät dialogista
    [Tags]    ui

    Go To    ${DIARY_URL}
    Avaa lisäysdialogi

    Element Should Be Visible    ${DATE_INPUT}
    Element Should Be Visible    ${MOOD_INPUT}
    Element Should Be Visible    ${WEIGHT_INPUT}
    Element Should Be Visible    ${SLEEP_INPUT}
    Element Should Be Visible    ${NOTES_INPUT}
    Element Should Be Visible    ${ADD_BTN}
    Element Should Be Visible    ${CLOSE_ADD_BTN}

TC-05 Kenttiin voi kirjoittaa tietoja
    [Tags]    ui

    Go To    ${DIARY_URL}
    Avaa lisäysdialogi

    Input Text    ${DATE_INPUT}     2025-07-01
    Input Text    ${MOOD_INPUT}     Energized
    Input Text    ${WEIGHT_INPUT}   80
    Input Text    ${SLEEP_INPUT}    7
    Input Text    ${NOTES_INPUT}    Aamulenkki 5 km.

    ${mood_val}=      Get Value    ${MOOD_INPUT}
    ${weight_val}=    Get Value    ${WEIGHT_INPUT}
    ${sleep_val}=     Get Value    ${SLEEP_INPUT}
    ${notes_val}=     Get Value    ${NOTES_INPUT}

    Should Be Equal    ${mood_val}      Energized
    Should Be Equal    ${weight_val}    80
    Should Be Equal    ${sleep_val}     7
    Should Be Equal    ${notes_val}     Aamulenkki 5 km.

*** Keywords ***

Avaa selain ja kirjaudu sisään
    Open Browser    ${LOGIN_URL}    ${BROWSER}
    Maximize Browser Window
    Kirjaudu sisään

Kirjaudu sisään
    Wait Until Element Is Visible    ${LOGIN_USERNAME}    timeout=10s
    Input Text        ${LOGIN_USERNAME}    ${USERNAME}
    Input Text        ${LOGIN_PASSWORD}    ${PASSWORD}
    Click Element     ${LOGIN_BTN}
    Wait Until Element Contains    ${LOGIN_RESPONSE}    Login successful    timeout=10s
    Go To    ${DIARY_URL}
    Wait Until Page Contains Element    ${ADD_ENTRIES_BTN}    timeout=10s

Avaa lisäysdialogi
    Wait Until Page Contains Element    ${ADD_ENTRIES_BTN}    timeout=10s
    Click Button    ${ADD_ENTRIES_BTN}
    Wait Until Element Is Visible       ${ADD_DIALOG}    timeout=5s
