### Welcome to Github!
Github is a platform that let's software developers collaborate with code. Think of it like Google Docs but for software engineers. We'll learn more about using Git and Github another time but for now this serves as a warm welcome to the world of software construction.

### Advice
It's important to remember this as a beginner:

1. Building things with software is mostly about organizing information rather than being good at math. Programming languages use logic and computation to express ideas instead of equations and algebra.

2. Like the English language, you can express things in many different ways.

3. When something challenges you, fail faster and break the problem into more understandable steps.


### Exposure
The idea here is to expose you to concepts before you start to answer questions about it in the app so you aren't intimidated by it later. Don't worry about not understanding everything. In fact, try your best to make sense out of it at a glance or use AI to your advantage to create an understanding.

### Code

Let's observe these lists. We can see that:
- `my_custom_data && my_custom_list` are equivalent.
- `data_set && data_object` are also fundamentally equivalent.


```js
let my_custom_data = [1, 2, 3, 'a', 'b', 'c', null, false]
const my_custom_list = new Array(1,2,3,'a','b','c', null, false)
my_custom_data.push('new data')
my_custom_list.push('new data')

let data_set = {
  introduction: "Welcome",
  title: "Chapter 1"
  is_live: true
}
data_set.page = 4
data_set['book'] = 'Coding Basics'

let data_object = new Object()
data_object.introduction = 'Welcome'
data_object.title = 'Chapter 1'
data_object.is_live = true
data_object.page = 4
data_object['book'] = 'Coding Basics'

```

Additionally, in the example above, we're exposed to variable definitions, data types, arrays, functions and objects. A lot of the software that you likely operates on those concepts under the hood. This is way `[]` and `new Array` can create the same data - it translates the same way when it comes to turning your code into signals that can be sent across the internet.

Now in the example below, we take a look at creating our own custom objects. We create our own custom object, along with an interface of functions. Generally when it comes to data, you're able to create, retrieve, update or delete it in some form or another.

```js
class House {
  house_paint = null

  constructor(paint){
    this.house_paint = paint
  }

  getPaint(){
    return this.house_paint
  }

  setPaint(paint) = (paint) => {
    this.house_paint = paint
  }

  deletePaint = () => {
    this.house_paint = null
  }
}

let first_home = new House("pink")
let next_home = new House("blue")

let first_paint = first_house.getPaint() // returns the value "pink"
let next_paint = new_home.house_paint // returns the value "blue"
next_paint = new_home['house_paint'] // still returns the value 'blue'

```

So that's creating data and working with data. You'll find that you can usually combine ideas depending on what you need to create. For example, the above component can also be written the following way:

```js
function createHouse(paint = null) {
  return {
    house_paint: paint,

    getPaint() {
      return this.house_paint;
    },

    setPaint(paint) {
      this.house_paint = paint;
    },

    deletePaint() {
      this.house_paint = null;
    },
  };
}
//what is the value of the result by the end of the program?
const myHouse = createHouse('blue');
let paint = myHouse.house_paint;

myHouse.house_paint = 'red'; 
paint = myHouse.getPaint()

myHouse.setPaint('green'); 
paint = myHouse.house_paint

myHouse.deletePaint(); 

let result = myHouse['house_paint']
```


Finally, we combinet his to work with some code that renders the following screen
```jsx
const CelebrationMessage = ({ name }) => {
  const styling_data = {
    textAlign: 'center'
  }
  
  return <div style={styling_data}>{name}</div>
}

const App = () => {
  return (
    <section style={{ border: '3px solid black' }}>
      <header>
        <h2>Good job!</h2>
      </header>
      
      <CelebrationMessage name="You created a small app!" />
     </section>
  )
}
```
<img width="890" alt="image" src="https://github.com/user-attachments/assets/20705076-4b92-4539-8172-a6908a1c2088">

And that's all! In the last example, we've used a library called React, which gives us access to special functions that are specialized for rendering elements on a screen. But it follows the same thought process as the stuff before it.

### Conclusion
Remember that failing faster is in your best interest when learning new skills with software. This one pager document will be available inside of the app. There are also many other features to help your journey along the way, but I'll leave that to your exploration of the platform and everything it has to offer.

Stay focused and best of luck with the rest!
