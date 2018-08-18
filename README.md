# Kelly 🌊

> Kelly is a minimalistic React component set that allow you to create simple as well as complex skeleton screen loading for your app.

There are some key concepts that make Kelly unique 🙏🏻:

* **Non invasive:** Kelly focus on being the least invasive as possible in your components architecture. This means that there is only wrapping components and nothing else. The least your write, the better it is.
* **Minimalistic:** Kelly comes with a small set of useful React components which are all ruled by the status of your application. Either your application has loaded content, either not.
Those two states are the keystone of a skeleton screen and every components are designed to respond to it accordingly.
* **Flexible**: Kelly's goal is not to cover every single scenario on his own, instead it provide some necessary components to build different skeleton architecture.

## Why 🤔 ?
In few recent years, there has been many improvements in web **UI/UX** design pattern, one of those is **Skeleton screens**.
The basic idea behind skeleton screen is, instead of having a **loading spin**, or a **text** as indicator for the user that content is being downloaded, we could use a more intuitive approach based on the actual page architecture. In fact, we don't really need to have the actual content to know what the page should approximatly looks like when being completly loaded. So the basic idea is that, we could put a preview of what an area of the page should looks like, this preview is called the **Skeleton**. Basically it is a composition of block ( often soft grey ) which take the shape of the content being loaded.

## Installation
```
```

## Usage example
Consider that we have the following component:
```
<Author>
    <Avatar>
        <img src={ authorAvatar } />
    </Avatar>

    <Informations>
        <Name></Name>
        <SubQuote></SubQuote>
    </Informations>
</Author>
```
