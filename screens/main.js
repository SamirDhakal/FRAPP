import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Platform } from 'react-native-web';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as FaceDetector from 'expo-face-detector';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            faces: []
        }
    }
    componentDidMount() {
        Permissions
        .askAsync(Permissions.CAMERA)
        .then(this.onCameraPermission)
    }
    onCameraPermission = (status) => {
        this.setState({
            hasCameraPermission: status.status === "granted"
        })
    }
    onFacesDetected = (faces) => {
        this.setState({
            faces: faces
        })
    }
    onFacesDetectedError = (error) => {
        console.log(error);
    }
    render() {
        const{hasCameraPermission} = this.state;
        if(hasCameraPermission === null) {
            return <View/>
        }
        if(hasCameraPermission === false) {
            return(
                <View style = {styles.container}>
                    <Text>No Access To Camera</Text>
                </View>
            )
        }
            console.log(this.state.faces);
            return(
                <View style = {styles.container}>
                    <SafeAreaView style = {styles.androidSafeArea}/>
                    <View style = {styles.headingContainer}>
                        <Text style = {styles.titleText}>FRAPP</Text>
                    </View>
                    <View style = {styles.cameraStyle}>
                        <Camera
                        style = {{flex: 1}}
                        type = {Camera.Constants.Type.front}
                        faceDetectorSettings = {{
                            mode: FaceDetector.Constants.Mode.fast,
                            detectLandmarks: FaceDetector.Constants.Landmarks.all,
                            runClasifications: FaceDetector.Constants.Clasifications.all
                        }}
                        onFacesDetected = {this.onFacesDetected}
                        onFacesDetectedError = {this.onFacesDetectedError}
                        />
                    </View>
                    <View style = {styles.filterContainer}>

                    </View>
                    <View style = {styles.actionContainer}>

                    </View>
                </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    androidSafeArea: {
        marginTop: Platform.OS === "android"?statusbar.currentHeight: 0
    },
    headingContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 30
    },
    cameraStyle: {
        flex: 0.65
    },
    filterContainer: {

    },
    actionContainer: {

    }
})