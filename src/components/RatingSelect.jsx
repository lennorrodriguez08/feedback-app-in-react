import { useState, useContext, useEffect } from "react"
import FeedbackContext from "../context/FeedbackContext"

function RatingSelect({ select }) {
    
    const [selected, setSelected] = useState(10)

    const { feedbackEdit } = useContext(FeedbackContext)

    useEffect(() => {

        setSelected(feedbackEdit.item.rating)

    }, [feedbackEdit])

    const handleChange = (e) => {
        setSelected(Number(e.target.value))
        select(Number(e.target.value))
    }

    return <ul className="rating">
            {[1,2,3,4,5,6,7,8,9,10].map((value) => (
                <li key={value}>
                    <input type="radio" name="rating" value={value} id={`num${value}`} onChange={handleChange} checked={selected === value} />
                    <label htmlFor={`num${value}`}>{value}</label>
                </li>
            ))}
        </ul>
    

}

export default RatingSelect