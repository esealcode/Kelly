# Kelly 🌊

> Kelly is a minimalistic React component set that allow you to create simple as well as complex skeleton screen loading for your app.

There are some key concepts that make Kelly unique 🙏🏻:

* **Non invasive:** Kelly focus on being the least invasive as possible in your components architecture. This means that there is only wrapping components and nothing else. The least your write, the better it is.
* **Minimalistic:** Kelly comes with a small set of useful React components which are all ruled by the status of your application. Either your application has loaded content, either not.
Those two states are the keystone of a skeleton screen and every components are designed to respond to it accordingly.
* **Flexible**: Kelly's goal is not to cover every single scenario on his own, instead it provide some necessary components to build different skeleton architecture.

## Table of contents
* [Why 🤔 ?](#why)
* [How Kelly works ⚙️](#howitworks)
* [Installation](#installation)
* [Usage example](#usage-example)
* [API Reference](#api-reference)

<a id="why" hidden></a>
## Why 🤔 ?
In few recent years, there has been many improvements in web **UI/UX** design pattern, one of those is **Skeleton screens**.
The basic idea behind skeleton screen is, instead of having a **loading spin**, or a **text** as indicator for the user that content is being downloaded, we could use a more intuitive approach based on the actual page architecture. In fact, we don't really need to have the actual content to know what the page should approximatly looks like when being completly loaded. So the basic idea is that, we could put a preview of what an area of the page should looks like, this preview is called the **Skeleton**. Basically it is a composition of block ( often soft grey ) which take the shape of the content being loaded.

<a id="howitworks" hidden></a>
## How Kelly works ⚙️ ?
In his most fundamental form, Kelly expose one major component named `Skeleton` abstracted as an HOC binded with a custom context.
What `Skeleton` component do is simply iterating over his direct children and inject a `bone` ( which is basically a `div` React element with a custom style ) in them. However, a `bone` is designed to cover all available space in his parent which means that a `bone` has some static css properties which are: 
```css
.bone {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10000;
}
```

This design comes with one restriction, **the parent element must be positionned**. Which means that the parent element should have a css property `position` to overwrite the default position defined as `static`. If the parent element was not properly positionned, `bone` positionning design won't works as expected because `width`, `height`, `top`, `left` properties rely on the closest positionned ancestor.

## Installation
```
```

## Usage example
Consider that we have the following component:
```javascript

this.state = {
    authorAvatar: '',
    authorName: '',
    authorSubQuote: ''
}
    

<Author>
    <Avatar>
        <img src={ authorAvatar } />
    </Avatar>

    <Informations>
        <Name>{ authorName }</Name>
        <SubQuote>{ authorSubQuote }</SubQuote>
    </Informations>
</Author>
```

Now, we would want our component to render a skeleton when we do not have user data yet.
Here is how we can do it with Kelly
```javascript

class AuthorComponent extends React.Component {

    constructor(props) {
        this.state = {
            authorDataLoaded: false,
            authorAvatar: '',
            authorName: '',
            authorSubQuote: ''
        }

        // We create a Skeleton provider, which basically is 
        // just a Skeleton component scoped with options binded to it
        this.AuthorSkeleton = CreateSkeletonProvider({
            theme: { background: "#777" }, // The theme that need to be applied to bones
            state: () => this.state, // State provider
            condition: state => !state.authorDataLoaded // Condition function to define whether 
                                                      // the skeleton should be active or not
        })
    }

    render() {
       const { AuthorSkeleton } = this
       const { authorName, authorSubQuote, authorAvatar } = this.state

       return (
        <Author>
            <AuthorSkeleton>
                <Avatar>
                    <img src={ authorAvatar } />
                </Avatar>
            </AuthorSkeleton>

            <Informations>
                <AuthorSkeleton>
                    <Name>
                        <SkeletonResolve>{ authorName }</SkeletonResolve>
                        <SkeletonFragment><BlankSpace len={ 8 } /></SkeletonFragment>
                    </Name>
                    <SubQuote>
                        <SkeletonResolve>{ authorAvatar }</SkeletonResolve>
                        <SkeletonFragment>
                            <div style={ { position: "relative", margin: "3px" } }>
                                <RandText min={ 3 } max={ 11 } />
                            </div>
                        </SkeletonFragment>
                    </SubQuote>
                </AuthorSkeleton>
            </Informations>
         </Author>
        )
    }
}
```

That's it, we defined our condition, and wrapped our content with our Skeleton. Now, if `state.userDataLoaded` is `false` you'll see your skeleton, you'll see your actual loaded content otherwise.

## API Reference
* [Components](#components)
    * [SkeletonResolve](#skeletonresolve)
    * [SkeletonFragment](#skeletonfragment)
    * [SkeletonIgnore](#skeletonignore)
    * [RandSpace](#randspace)
    * [FixedSpace](#fixedspace)
* [Functions](#functions)
    * [CreateSkeletonProvider](#createskeletonprovider)
    
## Components

### SkeletonResolve
`<SkeletonResolve>` is a component which render his children only when Skeleton is **not active**. Thus, its content never get transformed to bone.
* **Props**: `None`

### SkeletonFragment
`<SkeletonFragment>` is a component which render his children only when Skeleton is **active**. Its content is considered as part of direct children of `Skeleton` component, thus they will be transformed to bone.
* **Props**:
    * rep: `Number` - Tell how many time children passed to `<SkeletonFragment>` should be repeated. Note that they will be repeated in the same order as the original structure, this means that if you pass `<div></div><span></span>` and you define a `rep` of `2` then the final structure will be `<div></div><span></span> <div></div><span></span>`
    
### SkeletonIgnore
`<SkeletonIgnore>` is a component which render his children only when Skeleton is **active**. However, its content will not be considered as part of direct children of `Skeleton` component, thus they will never be transformed to bone.
* **Props**: `None`

### RandSpace
`<RandSpace>` is a component which render a randomized length whitespace string.
* **Props**:
    * min: `Number` - Minimum string length, default: `4`
    * max: `Number` - Maximum string length, default: `10`
    
### FixedSpace
`<FixedSpace>` is a component which render a fixed length whitespace string.
* **Props**:
    * len: `Number` - String length, default: `0`
    
## Functions

### CreateSkeletonProvider
`CreateSkeletonProvider` is the primary function of Kelly, it allow you to create kind of an HOC which have a binded context which provide it the theme to apply, the state provider and the condition for rendering the skeleton or not.

* **Args**:
    * options: `Object` - Describe the context of the skeleton which will be applied to his children.
        * `options` format:
            * *theme*: `Function | Object | String` - Should provide the theme for skeleton bones. If `Function` type is provided, we consider it as a custom React element already styled which will take place as the bone. If `Object` type is provided, we consider it as a CSS object definition, which will be injected in `style` props of the native Kelly bone React element. If `String` type is provided, we consider it as a class name which will be injected in the native Kelly bone React element.
            
            * *condition(state)*: `Function` - Should provide a function which takes the current state as parameter and return `true` to tell the skeleton to render, and `false` to tell the skeleton to render original content.
            
            * *state*: `Function` - Should provide the state provider, which is used by the skeleton to pass current state to the condition function. Most of the time it should just looks like this: `() => this.state`.
            
            * *pure*: `Boolean` - If `pure` option is set, the parent which contains injected bone will be stripped of some CSS properties which can affect the bone design only when skeletin is **active**. Stripped css properties are: `box-shadow`, `border`, `animation`, `opacity`, `transition` and `outline`. 
