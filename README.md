Diese Application ist für meine Kinder gedacht, die ihre digitale Wunschlisten, die sie mit seinen Eltern teilen können:
Ich als Elternteil kann mich registrieren und einlogen, Kinder hinzufügen und Wunschlisten meiner Kinder abrufen und updaten.
Kinder, die ich angelegt habe, können sich einloggen, Wunschlisten erstellen, abrufen, ändern und löschen.

Da es für die Semesteraufgabe zu viel ist, habe ich nur minimale Kreterien erfüllt.

Momentan kann die Webanwendung:
    --> ein Benutzer kann sich anmelden
    --> ein Benutzer kann sich registrieren
    --> ein angemeldeter Benutzer kann eine Wunschliste erstellen, abrufen, ändern und löschen
    --> ein angemeldeter Benutzer kann zu jeder erstellten Wunschliste seine Wünsche hinzufügen, abrufen, ändern, löschen
    --> ein angemeldeter Benutzer kann sich abmelden

Componente:
login-page - Anmeldung
register-page - Registrierung
wunschliste-page - Abruf alle von angemeldetem Benutzer Wunschlisten
wunschliste-form - Update, Delete einer Wunschliste
position-form - Hinzufügen, Abruf, Änderung und Löschung einer Position in der Wunschliste

als service: WunschlisteService, PositionService, MaterialService, AuthService

Ich habe mit Materialize css gearbeitet, da ich es schöner fand (weniger ist mehr!)

