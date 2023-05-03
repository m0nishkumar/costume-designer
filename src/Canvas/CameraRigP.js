import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { state } from '../store/Index'

export const CameraRigP = ({children}) => {
    const group = useRef();
    const snap = useSnapshot(state);
    console.log(children)
  
    useFrame((state, delta) => {
      const isBreakpoint = window.innerWidth <= 1260;
      const isMobile = window.innerWidth <= 600;
  
      // set the initial position of the model
      let targetPosition = [-40, 0, 250];
      if(snap.intro) {
        if(isBreakpoint) targetPosition = [0, 0, 250];
        if(isMobile) targetPosition = [0, 0.2, 250];
      } else {
        if(isMobile) targetPosition = [0, 0, 250]
        else targetPosition = [0, 0, 250];
      }

      easing.damp3(state.camera.position, targetPosition, 0.25, delta)
  

      easing.dampE(
        group.current.rotation,
        [state.pointer.y / 10, -state.pointer.x / 5, 0],
        0.25,
        delta
      )
    })
  
  
    return <group ref={group}>{children}</group>
  }
