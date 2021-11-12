import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Show = (props) => {
    const params = useParams()
    const id = params.id
    const cheeses = props.cheese
    const navigate = useNavigate()

    const [editForm, setEditForm] = useState({})
    useEffect(() => {
        if(props.cheese) {
        const cheese = cheeses.find((c) => c._id === id)
        setEditForm(cheese)
        }
    }, [props.cheese])

    if(props.cheese) {
        const cheese = cheeses.find((c) => c._id === id)

        const handleChange = (event) => {
            const newState = {...editForm}
            newState[event.target.name] = event.target.value
            setEditForm(newState)
        }
        
        const handleSubmit = (event) => {
            event.preventDefault()
            props.updateCheese(editForm, cheese._id)
            navigate('/')
        }

        const removeCheese= () => {
            props.deleteCheese(cheese._id)
            navigate('/')
        }

        const form = (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={editForm.name}
                name="name"
                placeholder="name"
                onChange={handleChange}
              />
              <input
                type="text"
                value={editForm.image}
                name="image"
                placeholder="Image URL"
                onChange={handleChange}
              />
              <input
                type="text"
                value={editForm.countryOfOrigin}
                name="countryOfOrigin"
                placeholder="Origin Country"
                onChange={handleChange}
              />
              <input type="submit" value="Update Cheese" />
            </form>
          );
    

        return (
            <div className='cheese'>
                <h1>{cheese.name}</h1>
                <h2>Originated from: {cheese.countryOfOrigin}</h2>
                <img src={cheese.image} alt={cheese.name} />
                {form}
                <button onClick={removeCheese}>DELETE CHEESE</button>
            </div>
        )
    } else {
        return <h1>No Cheese :(</h1>
    }


}

export default Show