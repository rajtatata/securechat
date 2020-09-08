import React, { createRef } from 'react'

export const scrollViewRef = createRef()

export function scrollTo(data) {
    scrollViewRef.current?.scrollTo(data)
}

export function scrollToEnd(data) {
    scrollViewRef.current?.scrollToEnd(data)
}