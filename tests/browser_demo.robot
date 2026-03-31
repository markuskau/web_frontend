*** Settings ***
Library     Browser    auto_closing_level=KEEP

*** Variables ***
${URL}        https://www.selenium.dev/selenium/web/web-form.html
${Username}   somebody@example.com
${Password}   SuperSecret!
${Message}    Hello, Robot Framework!\nHow are you today?
${FILE}       ${CURDIR}/testfile.txt

*** Test Cases ***
Test Web Form Full
    # --- Avaa selain ---
    New Browser    chromium    headless=False
    New Page       ${URL}

    # --- Tarkista otsikko ---
    Get Title    ==    Web form

    # --- Tekstikentät ---
    Type Text      [name="my-text"]        ${Username}
    Type Secret    [name="my-password"]    $Password
    Type Text      [name="my-textarea"]    ${Message}

    # --- Select dropdown ---
    Select Options By    [name="my-select"]    value    2

    # --- Datalist ---
    Type Text    [name="my-datalist"]    New York

    # --- File upload ---
    Set Input Files    [name="my-file"]    ${FILE}

    # --- Checkboxit ---
    Check Checkbox      [id="my-check-1"]
    Uncheck Checkbox    [id="my-check-2"]

    # --- Radio button ---
    Click    [id="my-radio-2"]

    # --- Color picker ---
    Fill Text    [name="my-colors"]    #00ff00

    # --- Date picker ---
    Fill Text    [name="my-date"]      2026-03-25

    # --- Range slider ---
    Fill Text    [name="my-range"]     5

    # --- Lähetä lomake ---
    Click    button

    # --- Varmistus että lomake lähetettiin ---
    Get Text    id=message    ==    Received!
