#TO DO:

- Make mobile option stand out more in settings area 


## My updates from Ania's solution
- Change grid width & height (300px). Switch to smaller grid size for mobile.
- Prevented browser scrolling due to use of up and down keys via `e.preventDefault()`
- Add game over message when snake hits wall or runs into itself 
- Display mobile controls if user checks that they are on mobile device
- Create responsive layout with media queries
- Add option to change speed
- Add option to change theme
- Used CSS variables to help with easy theme switching. Theme class is applied to `<body>` tag using JavaScript. 

**Thoughts**
- Had to use `e.preventDefault()` in the `control` function to prevent scroll up and down of the browser window triggered by using the up and down keys