#TO DO:

- Create 3 themes that will change:
    - Title font
    - Body background color
    - Snake color
    - Grid background color
    - Grid border color
    - Start button color
    - Apple color 

- Add game over when snake hits wall or runs into itself 

## My updates from Ania's solution
- Change grid width & height (400px)
- Prevented browser scrolling due to use of up and down keys via `e.preventDefault()`
- Add option to change theme - to do
- Add option to change speed - to do
- Display mobile controls if user checks that they are on mobile device
- Create media queries for mobile view (change .container to display: block)



**Thoughts**
- Had to use `e.preventDefault()` in the `control` function to prevent scroll up and down of the browser window triggered by using the up and down keys