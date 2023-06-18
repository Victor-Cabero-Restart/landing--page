from machine import Pin, PWM
import network   #import des fonction lier au wifi
import urequests #import des fonction lier au requetes http
import utime #import des fonction lier au temps
import ujson #import des fonction lier aà la convertion en Json


oldState = 0
leds=[PWM(Pin(17, mode=Pin.OUT)),PWM(Pin(18, mode=Pin.OUT)),PWM(Pin(19, mode=Pin.OUT))]

for led in leds:
    led.freq(1_000)
    led.duty_u16(0)

wlan = network.WLAN(network.STA_IF) # met la raspi en mode client wifi
wlan.active(True) # active le mode client wifi

ssid = 'nom du wifi'
password = 'mot de passe du wifi'
wlan.connect(ssid, password) # connecte la raspi au réseau
url = "http:// 'Adresse IP' /www/twitter/truc.php" 


while not wlan.isconnected():
    print("pas co")
    utime.sleep(1)
    pass

def rvb(r,v,b):
    leds[0].duty_u16(int(r*(65535/255)))
    leds[1].duty_u16(int(v*(65535/255)))
    leds[2].duty_u16(int(b*(65535/255)))


while True:
    try:
        print("GET")
        a = 0
        r = urequests.get(url) # lance une requete sur l'url
        print(r.json()[0]["texte"])
        if (oldState != r.json()[0]["texte"]):
            while a < 5:
                rvb(255, 255, 0)
                utime.sleep(0.5)
                rvb(0, 0, 0)
                utime.sleep(0.5)
                a+=1
            oldState = r.json()[0]["texte"]
        
        else :
            rvb(0, 0, 0)
            utime.sleep(1)
            
        r.close() # ferme la demande
        utime.sleep(1)
        
    except Exception as e:
        print(e)

