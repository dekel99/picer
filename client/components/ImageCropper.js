import React, { useCallback, useState } from 'react'
import Portal from "../components/Portal"
import Cropper from 'react-easy-crop'
import getCroppedImg from '../components/cropImage'
import {Button} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from "../styles/ImageCropper.module.css"

function ImageCropper(props) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [loading, setLoading] = useState(false)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
      }, [])

    const passCroppedImg = useCallback(async () => {
      setLoading(true)
        try {
          const croppedImage = await getCroppedImg(props.image,croppedAreaPixels)
          props.croppedImageResults(croppedImage)
        } catch (e) {
          console.error(e)
        }
        
    }, [croppedAreaPixels])

    return (
      <div style={{position: "relative"}}>
          <Portal portalId="cropper">
              <div className={styles.cropApp}>
                  <div className={styles.cropContainer}>
                      <Cropper
                          image={props.image}
                          crop={crop}
                          aspect={1 / 1}
                          onCropChange={setCrop}
                          onCropComplete={onCropComplete}
                      />
                  </div>
                  <div className={styles.btnContainer}>
                    <Button disabled={loading} onClick={passCroppedImg} variant="contained" color="primary" size="large">ok</Button>
                    {loading && <CircularProgress style={{position: "absolute", left: "0", right: "0", margin: "auto", top: "6px"}} size={30} />}
                  </div>
              </div>
          </Portal>
      </div>
    )
}

export default ImageCropper
