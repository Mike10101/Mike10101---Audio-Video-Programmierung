## Mike10101 Audio-Video-Programmierung
A little project for HAW University of Applied Sciences - Department of Media Technology for generating a live audio stream from a live video stream by pop music videos.

# Dependencies
* Python 3
* Javascript Vanilla
* Visual Studio Code Live Server Extention
* [Face Detection Caffe Framework and Model by spmallick](https://github.com/spmallick/learnopencv/tree/master/FaceDetectionComparison/models)

# Setup
Both the Face Detection Framework/Model and the video used for the video analysation need to be added seperately.

Load the "models" folder from the Face Detection Github Link into the project, we only need the "deploy.prototxt" and "res10_300x300_ssd_iter_140000_fp16.caffemodel".

Since we used a music video with copyrighted video material, we cannot share the video link. It will not be avaiable for people apart from the HAW University of Applied Sciences. 
__However__ you can just create a video folder in the project and insert a video of your choice. For optimal performance please use a video with a 960px x 720px format. 
Edit the path for the video in movie.py if needed.

