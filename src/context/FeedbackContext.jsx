import { createContext, useState } from "react"
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()    

export const FeedbackProvider = ( { children } ) => {
     const [feedback,setFeedback] = useState([
        {
            id: 1,
            text: 'This is a sample review 1',
            rating: 10
        },
        {
            id: 2,
            text: 'This is a sample review 2',
            rating: 9
        },
        {
            id: 3,
            text: 'This is a sample review 3',
            rating: 8
        }
     ])

     const [feedbackEdit, setEditFeedback] = useState({
        item: {},
        edit: false
      })

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