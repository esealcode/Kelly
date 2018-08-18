"use strict"

import React from 'react'
import { renderSkeleton } from './rendering'

const SkeletonConditionCtx = React.createContext(false)

// Fragment is used to render custom content only when skeleton is active
export const SkeletonFragment = props => {
    return (
        <SkeletonConditionCtx.Consumer>
            {
                mounted => {
                    if ( !mounted ) return null

                    if ( props.rep )
                        return Array(props.rep).fill(0).reduce((children, _, id) => children.concat(React.Children.map(props.children, child => React.cloneElement(child, { key: id }))), [])

                    return props.children
                }
            }
        </SkeletonConditionCtx.Consumer>
    )
}

SkeletonFragment.kPassthrough = true // Tell the renderer to not take fragment as a direct child when rendering bones

// Display plain content only when skeleton is active
export const SkeletonIgnore = props => <SkeletonConditionCtx.Consumer>{ mounted => mounted ? props.children : null }</SkeletonConditionCtx.Consumer>

SkeletonIgnore.kIgnore = true // Tell the renderer to ignore this component

// Display content only when skeleton is not active
export const SkeletonResolve = props => <SkeletonConditionCtx.Consumer>{ mounted => mounted ? null : props.children }</SkeletonConditionCtx.Consumer>

// A simple component which renders a randomized length blank text
export const RandText = props => ' '.repeat(Math.floor(Math.random() * ( ( props.max ? props.max : 10 ) - ( props.min ? props.min : 4 ) + 1)) + ( props.min ? props.min : 4 ))

// A simple component which renders a fixed length blank text
export const BlankSpace = props => ' '.repeat(props.len || 0)

// Primary component, render every direct sub nodes as bones if `condition` returns `true`
class Skeleton extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { children, opts, scaling } = this.props
        const { condition, state } = opts

        Object.assign(opts, { scaling })

        console.log("Skeleton rendering")
        const skState = condition(state())
        return <SkeletonConditionCtx.Provider value={ skState }>{ skState ? renderSkeleton(children, opts) : children }</SkeletonConditionCtx.Provider>
    }
}

// Provide a state provider: {Function} -> Should be a locally scoped function which return `this.state`
// Provide a theme : {Function|Object|String} -> Component, CSS Object, Class name
//
// Return a themed Skeleton provider

function CreateSkeletonProvider(options) {
    const defaultOptions = {
        pure: true,
    }

    return ( opts => {
        return props => <Skeleton { ...props } opts={ opts }></Skeleton>
    } )(Object.assign(defaultOptions, options))
}

export default CreateSkeletonProvider
