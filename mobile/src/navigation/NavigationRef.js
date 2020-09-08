import React, { createRef } from 'react'

export const navigationRef = createRef()

export function navigate(name, params) {
    navigationRef.current?._navigation.navigate(name, params)
}
