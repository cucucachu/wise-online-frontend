import React, { useState, useEffect }　from 'react'
import { Link } from 'react-router-dom'
import { logout, getTerms } from '../store/axios'
import viewIcon from '../Assets/images/view-icon.png'
import TermCard from './adminTermCard'


const AdminTerms = (props) => {
//   const [professorId, setProfessorId] = useState('')
  const schoolId = sessionStorage.getItem('schoolID')
  const userId = sessionStorage.getItem('userID')
  const [message, setMessage] = useState('')
  const [showHide, setShowHide] = useState({display: 'none'})
  const [editing, setEditing] = useState(false)
  const [terms, setTerms] = useState([])
//   const handleChange = e => {
//       console.log(e.target.value)
//       setProfessorId(e.target.value)
//   }
  const cookiesExpired = () =>{
    sessionStorage.clear()
    logout()
    this.props.history.push({
        pathname: '/admin-login',
        state: { message: 'Sorry, your login has expired, please log in again.', showHide: {display: 'block'} }
        })
    }
  
  const loadTerms = async () =>{
    try{
          const response = await getTerms(userId)
          console.log('res', response)
          setTerms(response.data)
          // if(response.status === 200){
          //     props.history.push({
          //         pathname: 'view-courses',
          //         state: { terms: response.data }
          //       })
          // }else if(response.status === 401){
          //     cookiesExpired()
          // }else{
          //     setMessage('Invalid professor ID. Please try again.')
          //     setShowHide({display: 'block'})
          // }
    }catch(error){
        console.log(error)
    }
  }

  useEffect(async () => {
    await loadTerms()
  }, [])
  
    return ( 
        <div className="container">
            <img src={viewIcon} className="page-icon" alt="view icon"/>
            <div className="spacer-vertical"></div>
            <h1>Download data</h1>
            <div className="spacer-vertical"></div>
            <div className="row">
                {
                    (() => {
                        const termCards = [];
                        for (const term of terms) {
                            //props.courses be in course
                            const component = <TermCard 
                                term={term} 
                                loadTerms={loadTerms}
                                // handleSubmit={props.handleSubmitEditTerm}
                                key={term._id}
                            />
                            termCards.push(component);
                        }
                        return termCards;
                    })()
                }
            </div>
            
            
        </div>
  );
  }
   
  export default AdminTerms;
