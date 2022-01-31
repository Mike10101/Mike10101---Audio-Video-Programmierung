#from re import M
import mido
import cv2
import numpy as np

#Konfiguration Video und Midi
vid = cv2.VideoCapture("video/merged_lg_wh_40sec.mp4")
midiOutput = mido.open_output("LoopBe Internal MIDI 1")
width = vid.get(cv2.CAP_PROP_FRAME_WIDTH )
height = vid.get(cv2.CAP_PROP_FRAME_HEIGHT )
#print("Width: ", width)
#print("Height: ", height)
#print("FPS: ", fps)

#Einstellungen für Face Detection
modelFile = "models/res10_300x300_ssd_iter_140000_fp16.caffemodel"
configFile = "models/deploy.prototxt"
net = cv2.dnn.readNetFromCaffe(configFile, modelFile)
net.setPreferableBackend(cv2.dnn.DNN_TARGET_CPU)

#einstellung Abspielgeschwindigkeit
delay_time = 22

#deklaration Mausvariable
mousePosition = 0

# X und Y Werte für Array Slicing später
x1 = int(width/3)
x2 = int(width*(2/3))
x3 = int(width)
y1 = int(height/3)
y2 = int(height*(2/3))
y3 = int(width)

#Speicherarrays für die Bildabschnitte und Masken
array_v = np.array([])
array_v2 = np.array([])
array_v3 = np.array([])
array_v4 = np.array([])
array_v5 = np.array([])
array_v6 = np.array([])
array_v7 = np.array([])
array_v8 = np.array([])
array_v9 = np.array([])

average_v = 0
average_v2 = 0
average_v3 = 0
array_average_v = []
#Positions Variable
position_max = 0
position_min = 0
addition = 0

#Tonhöhe Variable
currentNote =40

#Zählvariablen
count1 = 0
count2 = 0

#Auswertungsfunktion Face Detection Netz
#Code und Model geliehen von folgenden Git Repository
# https://github.com/spmallick/learnopencv/tree/master/FaceDetectionComparison
def detectFaceOpenCVDnn(net, frame, framework="caffe", conf_threshold=0.6):
    frameOpencvDnn = frame.copy()
    frameHeight = frameOpencvDnn.shape[0]
    frameWidth = frameOpencvDnn.shape[1]
    if framework == "caffe":
        blob = cv2.dnn.blobFromImage(
            frameOpencvDnn, 1.0, (300, 300), [104, 117, 123], False, False,
        )
    else:
        blob = cv2.dnn.blobFromImage(
            frameOpencvDnn, 1.0, (300, 300), [104, 117, 123], True, False,
        )

    net.setInput(blob)
    detections = net.forward()
    bboxes = []
    for i in range(detections.shape[2]):
        confidence = detections[0, 0, i, 2]
    
        if confidence > conf_threshold:
            x1 = int(detections[0, 0, i, 3] * frameWidth)
            y1 = int(detections[0, 0, i, 4] * frameHeight)
            x2 = int(detections[0, 0, i, 5] * frameWidth)
            y2 = int(detections[0, 0, i, 6] * frameHeight)
            bboxes.append([x1, y1, x2, y2])
    if len(bboxes)>0:
        sendFaceDetection(len(bboxes),1)

#Funktionen midi übermittlung
def sendNoteOn(note,velocity):
    message = mido.Message('note_on', note=note, velocity=velocity)
    midiOutput.send(message)

def sendNoteOff(note,velocity):
    message = mido.Message('note_off', note=note, velocity=velocity) 
    midiOutput.send(message)

def sendValue_Max(hue, value):
    message = mido.Message("control_change", control= int(hue/3), value = value)
    midiOutput.send(message)

def sendValue_Min(val, value):
    message = mido.Message("control_change", channel =2, control= int(val), value = value)
    midiOutput.send(message)

def sendMousePosition(position,value):
    message = mido.Message("control_change", channel =1, control= position, value = value)
    midiOutput.send(message)

def sendFaceDetection(number, value):
    message =mido.Message("control_change", channel =3, control= number, value = value)
    midiOutput.send(message)

#Funktion bei Mausklick
def mouse_click(event, x, y, 
                flags, param):
    # to check if left mouse 
    # button was clicked
    if event == cv2.EVENT_LBUTTONDOWN:
        print("X ", x,  " Y ", y)
        if x<= x1 and  y <= y1:
            mousePosition = 0
            sendMousePosition(mousePosition, 1)
        elif x>x1 and x<= x2 and y <= y1:
            mousePosition = 1
            print(1)
            sendMousePosition(mousePosition, 1)
        elif x>x2 and x<= x3 and y <= y1:
            mousePosition = 2
            sendMousePosition(mousePosition, 1)
            print(2)
        elif x<= x1 and y <= y2 and y>y1:
            mousePosition = 3
            sendMousePosition(mousePosition, 1)
            print(3)
        elif x>x1 and x<= x2 and y<= y2 and y>y1:
            mousePosition = 4
            sendMousePosition(mousePosition, 1)
            print(4)
        elif x>x2 and x <=x3 and y <= y2 and y>y1:
            mousePosition = 5
            sendMousePosition(mousePosition, 1)
            print(5)
        elif x<=x1 and y>y2 and y<=y3:
            mousePosition = 6
            sendMousePosition(mousePosition, 1)
            print(6)
        elif x>x1 and x<= x2 and y> y2 and y <= y3:
            mousePosition = 7
            sendMousePosition(mousePosition, 1)
            print(7)
        elif x>x2 and x<= x3 and y>y2 and y <= y3:
            mousePosition = 8  
            sendMousePosition(mousePosition, 1)
            print(8)
       
      

#funktion Auswertung Bild ohne Face Detection
def auswertung_bildabschnitt1():
    #Durchschnittswerte Helligkeit Bildausschnitte
    #die bildabschnitte werd durch die copy funktion ausgeschnitten
    array_v = v[0:x1, 0:y1].copy()
    average_v = np.average(array_v)
    array_average_v.append(average_v)
    array_v2 = v[x1+1:x2,0:y1].copy()
    array_average_v.append(np.average(array_v2))
    array_v3 = v[x2+1:x3,0:y1].copy()
    array_average_v.append(np.average(array_v3))
    array_v4 = v[0:x1,y1+1:y2].copy()
    array_average_v.append(np.average(array_v4))
    array_v5 = v[x1+1:x2,y1+1:y2].copy()
    array_average_v.append(np.average(array_v5))
    array_v6 = v[x2+1:x3,y1+1:y2].copy()
    array_average_v.append(np.average(array_v6))
    array_v7 = v[0:x1,y2+1:y3].copy()
    array_average_v.append(np.average(array_v7))
    array_v8 = v[x1+1:x2,y2+1:y3].copy()
    array_average_v.append(np.average(array_v8))  
    array_v9 = v[x2+1:x3,y2+1:y3].copy()
    array_average_v.append(np.average(array_v9))

    #Durschnitts Farbwert
    array_average_hue = np.average(h)
    #Min Max Werte
    max = np.max(array_average_v)
    min = np.min(array_average_v)
    position_max = array_average_v.index(max)
    position_min = array_average_v.index(min)

    # Hier wird die hellste Stelle übertragen das hat einfluss auf die Wellenform 
    sendValue_Max(position_max, 20)   
    #Hier wird ausgerechnet wie der Tonsprung sein wird
    #dafür ist die Farbe im Bild zuständig
    if array_average_hue <40:
        addition = -8
    elif array_average_hue>40 and array_average_hue <80:
        addition = -6
    elif array_average_hue >80 and array_average_hue <120:
        addition = -4
    elif array_average_hue >120 and array_average_hue< 160:
        addition = -2
    elif array_average_hue >160 and array_average_hue<200:
        addition = 0
    elif array_average_hue >200 and array_average_hue < 240:
        addition = 2
    elif array_average_hue >240 and array_average_hue <280:
        addition = 4
    elif array_average_hue >280 and array_average_hue <320:
        addition = 6
    elif array_average_hue >320 and array_average_hue <360:
        addition = 8

    sendNoteOn(currentNote+addition,20)
    sendNoteOff(currentNote+addition,0)
    sendValue_Min(position_min, 20)
    #print befehl zum überprüfen
    #print("Average_v: ", array_average_v, "Max: ", max, " Min: ", min, "Position Max: ", position_max, "Position Min", position_min, "Hue ", array_average_hue )  
    array_average_v.clear()
    


while(True):
    # Capture the video frame
    ret, frame = vid.read()


    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    h, s, v = cv2.split(hsv)
    #count Variablen
    count1 +=1
    count2 +=1

    if count1 == 10:
        auswertung_bildabschnitt1()
        count1 = 0
    if count2 ==25:
        detectFaceOpenCVDnn(net, frame)
        count2 = 0
    
    #Anzeige Video und Callback Mausklick
    cv2.imshow('frame', frame)
    cv2.setMouseCallback('frame', mouse_click)

    # the 'q' button is set as the  quitting button
    if cv2.waitKey(delay_time) & 0xFF == ord('q'):
        break

# After the loop release the cap object
vid.release()

# Destroy all the windows
cv2.destroyAllWindows()