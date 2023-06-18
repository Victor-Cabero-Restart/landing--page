from machine import Pin
import network   #import des fonction lier au wifi
import urequests #import des fonction lier au requetes http
import utime #import des fonction lier au temps
import ujson #import des fonction lier aà la convertion en Json

pin_button = Pin(14, mode=Pin.IN, pull=Pin.PULL_UP)
oldState = 1

wlan = network.WLAN(network.STA_IF) # met la raspi en mode client wifi
wlan.active(True) # active le mode client wifi

ssid = 'nom du wifi'
password = 'mot de passe du wifi'
wlan.connect(ssid, password) # connecte la raspi au réseau
url = "http:// 'Adresse IP' /www/twitter/post-button.php" 

while not wlan.isconnected():
    print("pas co")
    utime.sleep(1)
    pass


while True:
    try:

        print(pin_button.value()) # on envoie la valeur du bouton
    
        if pin_button() == 0 and oldState == 1:
            print("GET")
            r = urequests.get(url) # lance une requete sur l'url
            r.close() # ferme la demande
            utime.sleep(1)
        oldState = pin_button.value()
        utime.sleep(.1)            # on attend 0.1 seconde
    
        
    except Exception as e:
        print(e)
