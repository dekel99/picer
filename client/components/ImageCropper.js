import React, { useCallback, useState } from 'react'
import Portal from "../components/Portal"
import Cropper from 'react-easy-crop'
import getCroppedImg from '../components/cropImage'
import styles from "../styles/ImageCropper.module.css"

function ImageCropper(props) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
      }, [])

    const passCroppedImg = useCallback(async () => {
      try {
        const croppedImage = await getCroppedImg(
          props.image,
          croppedAreaPixels,
        )
        console.log('done', { croppedImage })
        props.croppedImageResults(croppedImage)
        setCroppedImage(croppedImage)
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
                      <button style={{position: "absolute"}} onClick={passCroppedImg}>OK</button>
                  </div>
              </div>
          </Portal>
      </div>
    )
}

export default ImageCropper
