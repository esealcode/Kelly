"use strict"

export const BoneComponentStyle = {
    // We only define primitive css directive which basically are only about positionning
    // the bone in his parent container
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 10000,
}

export const BoneContainerPureStyle = {
    // short-circuit every possibly defined CSS directives which can overflow Bone component.
    // This style will be applied to the bone parent component
    boxShadow: 'none',
    border: 'none',
    animation: 'none',
    opacity: '1', // In case of init transition
    transition: 'none'
}
