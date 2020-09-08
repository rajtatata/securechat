import React, { createRef } from 'react'

export const dropDownAlertRef = createRef()

export function showAlert(title, message) {
    dropDownAlertRef.current?.alertWithType(
        'success',
        title,
        message,
    )
}
