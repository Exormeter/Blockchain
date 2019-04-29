# Anforderungs- und Entwurfsspezifikation ("Pflichtenheft")

* Titel, Autoren, Inhaltsverzeichnis
* Link zum Source Code Repository
 

# 1 Einführung

## 1.1 Beschreibung
    
    Projektidee 1: Etherchain
    
    Etherchain ist eine Platform, auf der die gesammte Supply Chain eines Unternehmens abgebildet werden kann. Die Idee ist, 
    das Unternehmen Angebote für beispielsweise Transportaufträge, Materialaufträge oder Verarbeitungsaufträge als 
    Smart-Contract auf der Blockchain einstellen können. Die Bezahlung wird im beim Anlegen des Contracts auf diesem 
    hinterlegt. Ein anderer Unternehmen soll dann die Möglichkeit haben, die Angebote auf der Blockchain anzusehen und 
    gegebenenfalls einen der Aufträge anzunehmen. Bei Annahme muss er den Auftragswert als Sicherheit hinterlegen. Wird der 
    Auftrag erflgreich ausgeführt, erhält er die gestellte Sicherheitssumme zurück, als auf die gestellte Bezahlung.
    Sind sich die Vertragspartner uneinig, so bleibt Bezahlung und Sicherheit auf dem Contract, bis sich beide Parteien
    einigen. 
    
    
## 1.2 Ziele
    - Anwendungsbereiche, Motivation, Umfang, Alleinstellungsmerkmale, Marktanforderungen
    - Informationen zu Zielbenutzergruppen und deren Merkmale (Bildung, Erfahrung, Sachkenntnis)
    - Abgrenzung (Was ist das Softwaresystem _nicht_)

# 2 Anforderungen

## 2.1 Stakeholder

| Funktion | Name | Kontakt | Verf¸gbarkeit | Wissen  | Interesse & Ziele  | Relevanz  |
|---|---|---|---|---|---|---|
|  |   |   |   |   |   |   |


### Beispiel

| Funktion | Name | Kontakt | Verf¸gbarkeit | Wissen  | Interesse & Ziele  | Relevanz  |
|---|---|---|---|---|---|---|
| Leiter der Bibliothek  |  Herr Bauer | Tel. 409000  | Von 9-19 Uhr telefonisch erreichbar, Mitarbeit zu 30% mˆglich, N¸rnberg  | Kennt das Altsystem aus der Anwendersicht, soll mit dem System arbeiten  | Vereinfachung der Ausleihprozesse  | Fachlicher Entscheider  |
| Administrator  | Herr Heiner  | Heiner@gmx.net  | Per E-Mail, immer erreichbar, Verf¸gbarkeit 50%, N¸rnberg  | Vertraut mit vergleichbarer Verwaltungssoftware   |  Stabiles System, geringer Wartungsaufwand | Informationslieferant bzgl. Wartungsanforderungen  |
| Product-Owner  | Paul Ottmer  |  po@ottmer.de | Per E-Mail und tel. tags¸ber, Verf¸gbarkeit 100%, N¸rnberg  | Koordinator f¸r die Inputs der Stakeholder  | ROI des Systems sicherstellen  | Entscheider - als Koordinator der Stakeholderanforderungen  |

## 2.2 Funktionale Anforderungen
    - Use-Case Diagramme
    - Strukturierung der Diagramme in funktionale Gruppen

## 2.3 Nicht-funktionale Anforderungen 

### 2.3.1 Rahmenbedingungen
    - Normen, Standards, Protokolle, Hardware, externe Vorgaben

### 2.3.2 Betriebsbedingungen
    - Vorgaben des Kunden (z.B. Web Browser / Betriebssystem Versionen, Programmiersprache)

### 2.3.3 Qualit‰tsmerkmale
    - Externe Qualit‰tsanforderungen (z.B. Performance, Sicherheit, Zuverl‰ssigkeit, Benutzerfreundlichkeit)

Qualit‰tsmerkmal | sehr gut | gut | normal | nicht relevant
---|---|---|---|---
**Zuverl‰ssigkeit** | | | | |
Fehlertoleranz |X|-|-|-|
Wiederherstellbarkeit |X|-|-|-|
Ordnungsm‰ﬂigkeit |X|-|-|-|
Richtigkeit |X|-|-|-|
Konformit‰t |-|X|-|-|
**Benutzerfreundlichkeit** | | | | |
Installierbarkeit |-|-|X|-|
Verst‰ndlichkeit |X|-|-|-|
Erlernbarkeit |-|X|-|-|
Bedienbarkeit |-|X|-|-|
**Performance** | | | | |
Zeitverhalten |-|-|X|-|
Effizienz|-|-|-|X|
**Sicherheit** | | | | |
Analysierbarkeit |X|-|-|-|
Modifizierbarkeit |-|-|-|X|
Stabilit‰t |X|-|-|-|
Pr¸fbarkeit |X|-|-|-|

## 2.4 Graphische Benutzerschnittstelle
    - GUI-Mockups passend zu User Stories
    - Screens mit ‹berschrift kennzeichnen, die im Inhaltsverzeichnis zu sehen ist
    - Unter den Screens darstellen (bzw. verlinken), welche User Stories mit dem Screen abgehandelt werden
    - Modellierung der Navigation zwischen den Screens der GUI-Mockups als Zustandsdiagramm

## 2.5 Anforderungen im Detail
    - User Stories mit Akzeptanzkritierien 
    - Optional: Name (oder ID) und Priorit‰t ("Must", "Should", "Could", "Won't")
    - Strukturierung der User Stories in funktionale Gruppen

### Schablone f¸r User Stories

| **Als** | **mˆchte ich** | **so dass** | **Akzeptanz** |
| :------ | :----- | :------ | :-------- |
| Wer | Was | Warum | Wann akzeptiert |

### Beispiel 1

| **Als** | **mˆchte ich** | **so dass** | **Akzeptanz** |
| :------ | :----- | :------ | :-------- |
| Benutzer | bei Fehleingabe die Lˆsung angezeigt bekommen | ich lernen kann | Lˆsung wird angezeigt |

### Beispiel 2

| **Name**| **In meiner Rolle als**...|   ...**mˆchte ich**...   | ..., **so dass**... | **Erf¸llt, wenn**... | **Priorit‰t**   |
|:-----|:----------:|:-------------------|:-------------|:---------|:----------------|
| Lernen  |Benutzer| bei Fehleingabe die Lˆsung angezeigt bekommen|ich lernen kann| Lˆsung wird angezeigt | Muss |


# 3 Technische Beschreibung

## 3.1 System¸bersicht
    - Systemarchitekturdiagramm ("Box-And-Arrow" Diagramm)
    - Kommunikationsprotokolle, Datenformate

## 3.2 Softwarearchitektur
    - Darstellung von Softwarebausteinen (Module, Schichten, Komponenten)

## 3.3 Schnittstellen
    - Schnittstellenbeschreibung
    - Auflistung der nach auﬂen sichtbaren Schnittstelle der Softwarebausteine

## 3.4 Datenmodell 
    - Konzeptionelles Analyseklassendiagramm (logische Darstellung der Konzepte der Anwendungsdom‰ne)
    - Modellierung des physikalischen Datenmodells 
      - RDBMS: ER-Diagramm bzw. Dokumentenorientiert: JSON-Schema

## 3.5 Abl‰ufe
    - Aktivit‰tsdiagramme f¸r relevante Use Cases
    - Aktivit‰tsdiagramm f¸r den Ablauf s‰mtlicher Use Cases

## 3.6 Entwurf
    - Detaillierte UML-Diagramme f¸r relevante Softwarebausteine

# 4 Projektorganisation

## 4.1 Annahmen
    - Nicht durch den Kunden definierte spezifische Annahmen, Anforderungen und Abh‰ngigkeiten
    - Verwendete Technologien (Programmiersprache, Frameworks, etc.)
    - Aufteilung in Git-Repositories gem‰ﬂ Software- und Systemarchitektur und Softwarebbausteinen 
    - Einschr‰nkungen, Betriebsbedingungen und Faktoren, die die Entwicklung beeinflussen (Betriebssysteme, Entwicklungsumgebung)
    - Interne Qualit‰tsanforderungen (z.B. Softwarequalit‰tsmerkmale wie z.B. Erweiterbarkeit)

## 4.2 Verantwortlichkeiten
    - Zuordnung von Personen zu Softwarebausteinen aus Kapitel 3.1 und 3.2
    - Rollendefinition und Zuordnung

| Softwarebaustein | Person(en) |
|----------|-----------|
| Komponente A | Thomas Mustermann |

### Rollen

#### Softwarearchitekt
Entwirft den Aufbau von Softwaresystemen und trifft Entscheidungen ¸ber das Zusammenspiel der Softwarebausteine.

#### Frontend-Entwickler
Entwickelt graphische oder andere Benutzerschnittstellen, insbesondere das Layout einer Anwendung.

#### Backend-Entwickler
Implementiert die funktionale Logik der Anwendung. Hierbei werden zudem diverse Datenquellen und externe Dienste integriert und f¸r die Anwendung bereitgestellt.

### Rollenzuordnung

| Name     | Rolle     |
|----------|-----------|
| Thomas Mustermann | Softwarearchitekt |


## 4.3 Grober Projektplan
    - Meilensteine

### Meilensteine
* KW 43 (21.10)
  * Abgabe Pflichtenheft
* KW 44 (28.10) / Projekt aufsetzen
  * Repository Struktur
* KW 45 (4.11) / Implementierung
  * Implementierung #3 (Final)
* KW 48 (18.12) / Abnahmetests
  * manuelle Abnahmetestss
  * Pr‰sentation / Software-Demo

# 5 Anh‰nge

## 5.1 Glossar 
    - Definitionen, Abk¸rzungen, Begriffe

## 5.2 Referenzen
    - Handb¸cher, Gesetze

## 5.3 Index



