import React from 'react'
import ReactDOM from 'react-dom'
import styled, { keyframes } from 'styled-components'
import CreateSkeletonProvider, { SkeletonFragment, SkeletonResolve, SkeletonIgnore, RandText, BlankSpace } from '../src/Kelly'

'use strict'

const RootCard = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 15px;
    width: 370px;
    border: 1px solid #eee;
    background: #fff;
    border-radius: 7px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.08);
`

const CardHeader = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: no-wrap;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
`

const CardHeaderText = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    flex-shrink: 0;
    padding: 30px 0 10px 0;
`

const CardName = styled.div`
    position: relative;
    display: block;
    font-size: 2.1rem;
    flex-grow: 1;
    font-weight: bold;
    color: #222;
    margin-bottom: 4px;
`

const CardAge = styled.div`
    position: relative;
    display: block;
    font-size: 1.7rem;
    flex-grow: 1;
    color: #777;
    text-align: center;
`

const CardHeaderAvatar = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 92px;
    height: 92px;
    padding: 10px;
    border-radius: 100%;
    box-shadow: 0 0 15px 0px rgba(0, 0, 0, 0.2);
    overflow: hidden;
`

const CardAvatar = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    overflow: hidden;

    & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`

/*const EnhancedSkeleton = SkeletonProvider({
    theme : {
        ...
    },
    dynamicMount: state => ...,
    applyImmuable: true
})*/

const SkeletonAnimation = keyframes`
    0% {
        background: #eee;
    }

    50% {
        background: #f7f7f7;
    }

    100% {
        background: #eee;
    }
`

const CustomSkeletonSkin = styled.div`
    display: block;
    z-index: 100;
    background: #eee;
    border-radius: 4px;
    animation: ${SkeletonAnimation} 1s linear infinite;
`

const CardDescription = styled.div`
    display: block;
    font-size: 1.7rem;
    padding: 30px;
`

class NestedWait extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            skeletonFlag: true
        }

        this.NestSkeleton = CreateSkeletonProvider({
            theme: CustomSkeletonSkin,
            state: () => this.state,
            condition: state => renderFlag
        })
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                renderFlag: false
            })
        }, 4000)
    }

    render() {
        const { NestSkeleton } = this

        return (
                <div style={ { position: 'relative' } }>
                    <NestSkeleton>
                        <span>Hello world from the nest !</span>
                    </NestSkeleton>
                </div>
        )
    }
}

const FuckComponent = props => {
    console.log("Fuck component render")
    return <div style={ { position: 'relative' } }>{ props.children } Hello !</div>
}

class ProgressiveCard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            renderCard: false,
            name: "Kelly",
            sub: "Powerful lightweight Skeleton screen library for ReactJS 🌊💀",
            avatar: "https://images-ext-1.discordapp.net/external/FhNDzfYJR8nlED0F3AhQWjug3gOQsTreCdJ-aUMQsNk/https/pbs.twimg.com/media/Djvh43RX0AAv6HG.jpg%3Alarge?width=635&height=635",
            description: `Please welcome Kelly, lightweight Skeleton screen helper designed for ReactJS 🌊 👻 ☄️

                Kelly is a powerful Skeleton Screen helper designed for ReactJS.
                It allow you to include skeleton screen logic seamlessly within your components architecture.

                Kelly follow one rule, design once reuse everywhere, with the logical concept of conditionnal skeleton component.

                Please, give it a try and enter in the new galaxy of web loading 🌌 !
            `
        }

        this.ComponentSkinSkeleton = CreateSkeletonProvider({
            theme: CustomSkeletonSkin,
            state: () => this.state,
            condition: state => !state.renderCard
        })

        this.ObjectSkinSkeleton = CreateSkeletonProvider({
            theme: { background: "#777" },
            state: () => this.state,
            condition: state => !state.renderCard
        })

        this.ClassSkinSkeleton = CreateSkeletonProvider({
            theme: "skeletonSkin",
            state: () => this.state,
            condition: state => !state.renderCard
        })
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                renderCard: true
            })
        }, 7000)
    }

    render() {
        const { ComponentSkinSkeleton, ObjectSkinSkeleton, ClassSkinSkeleton } = this
        const { name, sub, avatar, description, cardCollected, notificationsLoaded } = this.state

        return (
                <RootCard>
                    <CardHeader>
                        <ComponentSkinSkeleton>
                            <CardHeaderAvatar>
                                    <CardAvatar>
                                        <SkeletonResolve>
                                            <img src={ avatar } />
                                        </SkeletonResolve>
                                    </CardAvatar>
                            </CardHeaderAvatar>
                        </ComponentSkinSkeleton>

                        <CardHeaderText>
                            <ObjectSkinSkeleton>
                                <CardName>
                                    <SkeletonResolve>{ name }</SkeletonResolve>
                                    <SkeletonFragment>
                                        <BlankSpace len={ 10 }></BlankSpace>
                                    </SkeletonFragment>
                                </CardName>
                            </ObjectSkinSkeleton>

                                <CardAge>
                                    <ClassSkinSkeleton>
                                        <SkeletonResolve>{ sub }</SkeletonResolve>

                                        <SkeletonFragment rep={ 4 }>
                                            <div style={ { display: 'inline-block', position: 'relative', margin: '3px' } }>
                                                <RandText min={ 2 } max={ 3 }></RandText>
                                            </div>
                                        </SkeletonFragment>
                                    </ClassSkinSkeleton>
                                </CardAge>
                        </CardHeaderText>

                    </CardHeader>

                    <CardDescription>
                        <pre style={ { whiteSpace: "pre-line" } }>
                            <ComponentSkinSkeleton scaling={ { y: 0.8 } }>
                                <FuckComponent />
                                <SkeletonIgnore>
                                    <div>Wait please ! We are loading your stuff 🔨</div>
                                </SkeletonIgnore>
                                fucked text
                                <SkeletonResolve>
                                    { description }
                                </SkeletonResolve>
                                <SkeletonFragment rep={ 10 }>
                                    <div style={ { display: 'inline-block', position: 'relative', margin: '3px' } }>
                                        <RandText></RandText>
                                    </div>
                                </SkeletonFragment>
                            </ComponentSkinSkeleton>
                        </pre>
                    </CardDescription>
                </RootCard>
        )
    }
}

ReactDOM.render(
    <React.Fragment>
        <ProgressiveCard />
    </React.Fragment>,
    document.getElementById("app"));
