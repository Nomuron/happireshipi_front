# happireshipi_front

Front-end for Spring API, developed with NPM and Parcel.

### Instrukcja jak naprawić to co Łukasz zepsuł

1. Otworzyć terminal w folderze backendowym (`happireshipi`).
    1. `git branch`. Jeśli nie jesteś na `main` to `git checkout main`. Potem `git pull`.
2. Potem otworzyć terminal w folderze frontendowym (`happireshipi_front`).
    1. To samo co wyżej. `git branch`. Jeśli nie jesteś na `main` to `git checkout main`. Potem `git pull`.
3. Znowu wróć z terminalem do folderu backendowego (`happireshipi`).
    1. `sudo docker-compose build`
    2. `sudo docker-compose up -d`
4. Znowu powrót z terminalem do foleru frontendowego (`happireshipi_front`).
    1. `npm install` - instaluje pakiety npm zgodnie z `package.json`
    2. `npm start` - uruchamia serwer Parcel

W tym momencie wystartuje Parcel ze swoim serwerem developerskim. Serwer ten działa na porcie 1234. Więc jeśli otworzycie kartę przeglądarki, tam wpiszecie `http://localhost:1234/` to zobaczycie to co hula. 

Parcel służy do obserwowania zmian wprowadzanych w kodzie na bieżąco. Póki stoi to wszelkie zmiany wprowadzone w skryptach będą NATYCHMIAST widoczne zaraz po zapisaniu dowolnego pliku z foledu. Jeśli więc podczas pracy coś wam nie działa, a nie wiecie co się zadziało to:
1. Zresetujcie serwer Parcela (Ctrl + C w terminalu, potem `npm start`). Parcel czasami nie łapie wszystkich zmian.
2. Jak coś nie działa lub czegoś nie widzicie to wasz błąd i musicie go znaleźć. 
3. Jeśli dalej nie wiecie co się dzieje to ostatecznie:
    1. Usunąć folder `./dist` - tutaj znajduje się wersja, która została zbudowana przez Parcel i ostatecznie trafiłaby na serwer. 
    2. Usunąć folder `./.parcel-cache`

Dodatkowo przypominam, że ta wersja nie korzysta z `express`, więc skrypt `index.js` w folderze głównym niczemu nie służy - to jest skrypt expressa. Nasze skrypty są w folderze `./js`.
    
### Stage

1. Aplication is fetching all meals from Spring API and render divs, but without images. For now I fetched image from random url.

### Issues

1. Images must be stored on remote server to be fetched with JSON. The quickest solution is to put images in some 3rd party cloud and put links into database.
2. After development of front, it will be build using Parcel and npm. Distribution version of front part will be in ./dist/ folder. Patryk should change Dokerfile, so only this folder will be contenerized and put at 8081 port.
