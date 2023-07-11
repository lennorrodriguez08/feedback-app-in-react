import { createContext, useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()    

export const FeedbackProvider = ( { children } ) => {
     const [isLoading, setIsLoading] = useState(true)
     const [feedback,setFeedback] = useState([])
     const [feedbackEdit, setEditFeedback] = useState({
        item: {},
        edit: false
      })

     useEffect(() => {
        fetchFeedback()
     }, [])

     const fetchFeedback = async () => {

        const response = await fetch('http://localhost:5000/feedback')
        const data = await response.json()

        setFeedback(data)
        setIsLoading(false)
     }

     const deleteFeedback = (id) => {
        setFeedback(() => feedback.filter((item) => item.id !== id )
        )
      }

      const addFeedback = (newFeedback) => {
        newFeedback['id'] = uuidv4()
        setFeedback([newFeedback, ...feedback])
      }

      const editFeedback = (item) => {
        setEditFeedback({
            item: item,
            edit: true
        })
      }

      const updateFeedback = (id, updatedItem) => {
        
        setFeedback(feedback.map(function(item) {
            if (item.id === id) {
                return { ...item, ...updatedItem }
            }   else {
                return item
            }
        })) 

      }

    return (
        <FeedbackContext.Provider value={{
            feedback: feedback,
            feedbackEdit: feedbackEdit,
            isLoading: isLoading,
            deleteFeedback: deleteFeedback,
            addFeedback: addFeedback,
            editFeedback: editFeedback,
            updateFeedback: updateFeedback
        }}>
            { children }
        </FeedbackContext.Provider>
    )

}

export default FeedbackContext