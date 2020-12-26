<p align="center">
  <a href="https://www.razroo.com">
    <img alt="Razroo Logo" src="https://assets.razroo.com/razroo_logo_8f8785be23.svg" width="200" />
  </a>
</p>

# Razroo Markdown Engine #
The Razroo Markdown Engine is Razroo's attempt towards making markdown something that is more automated 
and has more sophisticated features available by type setting languages such as LaTeX. We wanted it to be written in 
Markdown, and-also compile to Markdown. This makes it, so it can be used on multiple platforms. In addition, the 
Markdown Engine is sophisticated enough to where we can pull in data, similar to how data is pulled in using an API. 
This allows us to have a very sophisticated, pseudo-autonomous content engine.

## How It Came To Be ##
First and foremost, we worked with LaTeX for the, at the time, standalone Angular: The Full Gamut book. 

1. What we found is that LaTeX had an issue compiling at times. 
2. For certain technical folk who never used LaTeX before, we found that there was a tremendous learning curve. 
3. Adding LaTeX didn't allow us to modify anything. For Razroo which as an organization is very content heavy, 
it is important that we can modify the content ourselves. LaTeX uses C++, and we wanted to be able to use 
Typescript/Node.
4. LaTeX to web formats seemed like a real challenge, there had to be an easier way to do this. 

## Features of the Razroo Markdown Engine ##

### Inject Github Links ###
Allows Markdown to pull in github links from both internal and external repos. The Github links are then built into the 
`build` folder. 

For instance:
```
Sample content before. 

{{ https://github.com/facebook/react/blob/ad6f3d5c55a79e8a44798aad36118e73de3a64f8/packages/create-subscription/index.ts#L10-L12 }}

Sample content after.
```
turns into:

```
Sample content before. 

'use strict';

export * from './src/createSubscription';

Sample content after.
``` 


