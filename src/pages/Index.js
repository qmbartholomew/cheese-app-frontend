import { useState } from 'react'
import { Link } from 'react-router-dom'

const Index = (props) => {

    const [newForm, setNewForm] = useState({
        name: '',
        image: '',
        title: ''
    })

    const handleChange = (event) => {
        const newState = {...newForm}
        newState[event.target.name] = event.target.value
        setNewForm(newState)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.createCheese(newForm)
        setNewForm({
            name: '',
            image: '',
            title: ''
        })
    }

    const form = (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newForm.name}
            name="name"
            placeholder="name"
            onChange={handleChange}
          />
          <input
            type="text"
            value={newForm.image}
            name="image"
            placeholder="Image URL"
            onChange={handleChange}
          />
          <input
            type="text"
            value={newForm.countryOfOrigin}
            name="countryOfOrigin"
            placeholder="Origin Country"
            onChange={handleChange}
          />
          <input type="submit" value="Create Cheese" />
        </form>
      );

    if(props.cheese){
        return (
            <section>
                {form}
            {props.cheese.map((cheese) => {
               return <div key={cheese._id} className='cheese'>
                   <Link to={`/cheese/${cheese._id}`}>
                       <h1>{cheese.name}</h1>
                   </Link>
                   <img src={cheese.image} alt={cheese.name} />
                   <h3>{cheese.title}</h3>
               </div> 
            })}
            </section>
            )
    } else {
        return (
        <section>
            {form}
            <h1>Loading...</h1>
        </section>
            )
    }
}

export default Index