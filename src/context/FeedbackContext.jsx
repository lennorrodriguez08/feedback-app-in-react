import { createContext, useState, useEffect } from "react"

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

     const deleteFeedback = async (id) => {
        await fetch(`http://localhost:5000/feedback/${id}`, { method: 'DELETE' })
        setFeedback(() => feedback.filter((item) => item.id !== id )
        )
      }

      const addFeedback = async (newFeedback) => {

        const response = await fetch('http://localhost:5000/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newFeedback)
        })

        const data = await response.json()
        setFeedback([data, ...feedback])
      }

      const editFeedback = (item) => {
        setEditFeedback({
            item: item,
            edit: true
        })
      }

      const updateFeedback = async (id, updatedItem) => {

        const response = await fetch(`http://localhost:5000/feedback/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedItem)
        })

        const data = await response.json()
        
        setFeedback(feedback.map(function(item) {
            if (item.id === id) {
                return { ...item, ...data }
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