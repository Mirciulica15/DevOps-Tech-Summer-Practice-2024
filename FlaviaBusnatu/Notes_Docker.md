Docker este o platformă software care permite dezvoltatorilor să creeze, să desfășoare și să ruleze aplicații în containere.   
Containerele sunt unități standardizate de software care împachetează codul aplicației împreună cu toate dependințele sale, asigurându-se că aplicația poate rula consistent pe orice mediu  
containers are isolated processes for each of your app's components. Each component - the frontend React app, the Python API engine, and the database - runs in its own isolated environment, completely isolated from everything else on your machine  

Imaginile Docker sunt șabloane read-only folosite pentru a crea containere. Ele conțin tot ceea ce este necesar pentru a rula o aplicație, inclusiv codul aplicației, runtime, librării și setări de configurare  
Images are immutable. Once an image is created, it can't be modified. You can only make a new image or add changes on top of it  

Instrucțiunea COPY este folosită pentru a copia fișiere și directoare din sistemul gazdă în imaginea Docker. Este o operațiune simplă de copiere și este recomandată pentru majoritatea cazurilor de utilizare atunci când doar trebuie să transferi fișiere locale în imagine.  
Instrucțiunea ADD este mai puternică și mai flexibilă decât COPY. În plus față de copierea fișierelor și directoarelor, ADD are funcționalități suplimentare:  

1.Decomprimare arhive:  
Dacă sursa este un fișier de arhivă (.tar, .gz, .bz2, etc.), ADD îl va decomprima automat în destinație.  
2.Copierea de la URL-uri:  
ADD poate copia fișiere direct de la URL-uri, descărcându-le în timpul construirii imaginii.  

instrucțiunea CMD dintr-un Dockerfile este utilizată pentru a specifica comanda implicită care va fi rulată atunci când un container este pornit.  
Dockerfile poate conține mai multe instrucțiuni CMD, dar doar ultima instrucțiune CMD va fi luată în considerare. Instrucțiunile CMD anterioare sunt suprascrise de cea finală.  
ENTRYPOINT este folosit pentru a seta o comandă fixă ce este executată atunci când containerul rulează, făcând containerul să se comporte ca un executabil specific  

Diferența între CMD și ENTRYPOINT:  
CMD: Este utilizat pentru a specifica comanda implicită pentru un container. Poate fi ușor suprascrisă.  
ENTRYPOINT: Definește o comandă fixă care nu poate fi suprascrisă la fel de simplu, doar argumentele sale pot fi modificate.  
