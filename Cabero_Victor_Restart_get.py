from machine import Pin, PWM
import network   #import des fonction lier au wifi
import urequests #import des fonction lier au requetes http
import utime #import des fonction lier au temps
import ujson #import des fonction lier aà la convertion en Json

leds = [PWM(Pin(17, mode=Pin.OUT)),PWM(Pin(18, mode=Pin.OUT)),PWM(Pin(19, mode=Pin.OUT))]
for led in leds:
    led.freq(1_000)
    led.duty_u16(0)

types_pokemon = {
        "Feu":[255,0,0],
        "Plante":[0,255,0],
        "Eau":[0,0,255],
        "Électrik":[255,255,0],
        "Poison":[50,0,50],
        "Sol":[50,20,0],
        "Roche":[110,50,0],
        "Acier":[100,100,100],
        "Ténèbres":[1,1,1],
        "Glace":[200,200,255],
        "Vol":[100,100,200],
        "Fée":[200,100,100],
        "Spectre":[1,0,1],
        "Normal":[255,255,255],
        "Combat":[100,0,0],
        "Dragon":[0,0,100],
        "Insecte":[100,150,0],
        "Psy":[100,10,10],
    }

wlan = network.WLAN(network.STA_IF) # met la raspi en mode client wifi
wlan.active(True) # active le mode client wifi

ssid = 'nom du wifi'
password = 'mot de passe du wifi'
wlan.connect(ssid, password) # connecte la raspi au réseau
url = "https://api-pokemon-fr.vercel.app/api/v1/pokemon/sabelette"


while not wlan.isconnected():
    print("pas co")
    utime.sleep(1)
    pass

def rvb(couleurs):
    for i in range(3):
        leds[i].duty_u16(couleurs[i]*255)

def CouleurParType(t):
    rvb(types_pokemon[t])

while(True):
    try:
        r = urequests.get(url) # lance une requete sur l'url
        for i in r.json()["types"]:
            print(i['name'])
            CouleurParType(i['name'])
            utime.sleep(1)
        r.close() # ferme la demande
        utime.sleep(1)  
    except Exception as e:
        print(e)


