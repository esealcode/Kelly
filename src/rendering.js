"use strict"

import React from 'react'
import { BoneComponentStyle, BoneContainerPureStyle } from './styles'

function getThemedBone(child, opts) {
    const { theme, scaling, pure } = opts
    const finalBoneStyle = Object.assign({}, BoneComponentStyle)

    if ( scaling ) {
        // User provided custom scaling, we need to update Bone style
        if ( scaling.hasOwnProperty('x') && scaling.x !== 1 ) finalBoneStyle.width = (100 * scaling.x) + '%'
        if ( scaling.hasOwnProperty('y') && scaling.y !== 1 ) finalBoneStyle.height = (100 * scaling.y) + '%'
    }

    console.log("Theme for ", child, " is ", theme)
    const dummyShell = React.createElement
                        (
                                            typeof theme === "function" ? theme : "div",
                                            {
                                                className: typeof theme === "string" ? theme : '',
                                                style: typeof theme === "object" ? Object.assign(finalBoneStyle, theme) : finalBoneStyle,
                                                key: "kelly"
                                            }
                        )

    return React.cloneElement(child, {
        children: [dummyShell, ...React.Children.toArray(child.props.children)],
        style: Object.assign(child.props.style ? child.props.style : {}, pure ? BoneContainerPureStyle : {})
    })
}

/**
 *  renderSkeleton: render a skeleton from `children` root elements.
 */
export function renderSkeleton(children, opts) {

    return React.Children.map(children, child => {
        if ( !(React.isValidElement(child)) ) {
            console.warn("Invalid element was provided in skeleton root. ", child)
            return child
        }

        if ( child.type instanceof Function ) {
            if ( child.type.kPassthrough === true ) {
                return React.cloneElement(child, { children: renderSkeleton(child.props.children, opts) })
            }
            else if ( child.type.kIgnore === true ) {
                return child
            }
            else if ( React.Children.count(child) === 0 ) {
                // We can't ensure that `props.children` will be used by an uncontrolled component.
                // Since we inject bone by injecting our custom React element into component `props.children`, the uncontrolled component will have to be designed on purpose.
                // Although that, if Kelly is correctly used, this should not happen anywhere in your code.
                // :)
                console.warn("Found a custom component in skeleton root. Kelly can't ensure that the bone will appear in your component. Howhever if your component is designed to include `props.children` in his `render` method, it'll works as expected.")
                return getThemedBone(child, opts)
            }
        }

        return getThemedBone(child, opts)
    })
}
