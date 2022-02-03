## Mike10101---Audio-Video-Programmierung
little project for HAW university for generating a live audio stream from a live video stream.

# Dependencies
* Python 3
* Javascript Vanilla
* Visual Studio Code Live Server Extention
* [Face Detection Framework and Models by spmallick](https://github.com/spmallick/learnopencv/tree/master/FaceDetectionComparison/models)

# Setup
Both the Face Detection Framework/Models and the video used for the video analysation need to be added seperately.

Load the "models" folder from the Face Detection Github Link into the project, we only need the "deploy.prototxt" and "res10_300x300_ssd_iter_140000_fp16.caffemodel"

Download the video folder from our HAW Cloud Link and paste it into the project
__OR__ you can create the video folder and insert a video of your choice. For optimal performance please use a video with a 960px x 720px format. 
Edit the path for the video in movie.py if needed.

