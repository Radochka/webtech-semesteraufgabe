Diese Application ist für Eltern gedacht, die Wunschlisten ihrer Kinder an einem Platz speichern und immer wieder abrufen möchten.
Ich als Elternteil kann mich registrieren und einlogen, Kinder hinzufügen und Wunschlisten meiner Kinder abrufen und updaten. Kinder, die ich angelegt habe, können sich einloggen, Wunschlisten erstellen, abrufen, ändern und löschen.

Da es für die Semesteraufgabe zu viel ist und rechtszetig die ganzen Anforderungen zu erfüllen nicht schaffe, habe ich nur minimale Kriterien erfüllt. D.h

    --> ein Benutzer kann sich anmelden
    --> ein Benutzer kann sich registrieren    
    --> ein angemeldeter Benutzer kann sich abmelden
    --> ein angemeldeter Benutzer kann eine Wunschliste erstellen, abrufen, ändern und löschen
    --> ein angemeldeter Benutzer kann zu jeder erstellten Wunschliste seine Wünsche hinzufügen, abrufen, ändern, löschen

Die Webanwendung basiert sich auf:
 -nodejs
 -Angular
 -Materialize css
 -MongoDB
Alle zusätzliche Installationen können aus der Package.json entnommen werden.
Es wurde concurrently installiert, um Back- und Frontend gleichzeitig zu starten.

Componente:
   - Auth-Layout:
        - login-page - Anmeldung
        - register-page - Registrierung
   - Page-Layout:
       - wunschliste-page - Abruf alle von angemeldetem Benutzer Wunschlisten
       - wunschliste-form - Update, Delete einer Wunschliste
       - position-form - Hinzufügen, Abruf, Änderung und Löschung einer Position in der Wunschliste - die Page wird als extra Modalfenster aufgerufen, wo man      einzelne Wünsche eintragen könnte. Dies ermöglicht Materialize scc. (https://materializecss.com/modals.html)
       - loader - um bei Daten laden, wird diese Loader abgerufen

Services:
    - WunschlisteService, um Wunschlisten abrufen, erstellen, ändern und löschen,
    - PositionService, um Wünsche in einer Wunschliste abrufen, erstellen, ändern und löschen,
    - AuthService, um sich registrieren, einloggen, ausloggen, token zu erstellen und weiter zu geben,
    - MaterialService, um Warnungen mit einer Message dem Benutzer anzuzeigen
    
alle Routes (außer login und register) sind durch auth.guard.ts in Frontend und im Backend durch passport-jwt geschützt. D.h., dass man auf Routes nur angemeldeter Benutzer zugreifen darf.

Modalfenster:
![grafik](https://user-images.githubusercontent.com/58446191/160855527-d00f0de9-745b-46d8-a9f1-b468f578b580.png)

Warnung (MaterailService.toast()):
![grafik](https://user-images.githubusercontent.com/58446191/160856268-2cd751a5-fabf-459d-a0d0-5b2931c73a30.png)

Beim Löschen wird nachgefragt:
![grafik](https://user-images.githubusercontent.com/58446191/160855967-8f1b0875-c313-4977-9994-ed9d9a21f281.png)




