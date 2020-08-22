import React, { useState, useEffect }　from 'react';
import { logout, getTerms, createTerm } from '../store/axios';
import viewIcon from '../Assets/images/view-icon.png';
import TermCard from './adminTermCard';
import AdminNewTermCard from './adminNewTermCard';
import '../Assets/css/spinner.css';
import '../Assets/css/radiobtn.css';

const AdminTerms = (props) => {
  const userId = sessionStorage.getItem('userID');
  const [terms, setTerms] = useState([]);
  const [lastRow] = useState(true);
  const [term, setTerm] = useState({name: '', id: ''});
  const [openForm, setOpenForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cookiesExpired = () => {
    sessionStorage.clear();
    logout();
    this.props.history.push({
        pathname: '/admin-login',
        state: { message: 'Sorry, your login has expired, please log in again.', showHide: {display: 'block'} }
    });
  }

  const handleChange = (e) => {
    setTerm({
      ...term, 
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createTerm(term.id, term.name);
      setOpenForm(false);
      loadTerms();
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleOpenForm = () => {
    setOpenForm(!openForm);
  }

  const loadTerms = async () => {
    try { 
      setIsLoading(true);
      const response = await getTerms(userId);

      if (response.status === 200) {
        setTerms(response.data);
        setIsLoading(false);
      }
      else if (response.status === 401) {
        cookiesExpired();
      }
      else {
        console.log('something wrong, try again');
      }
    }
    catch (error) {
        console.log(error);
    }
  }

  // useEffect(async () => {
  //   await loadTerms();
  // }, []);

  useEffect(() => {
    (async () => {
      await loadTerms();
    })();
  });
  
  return ( 
    <div className="container">
      <img src={viewIcon} className="page-icon" alt="view icon"/>
      <div className="spacer-vertical"></div>
      <h1>Download data</h1>
      <div className="spacer-vertical"></div>
      {isLoading ? 
        <div >
                  <div className="spacer-vertical"></div>
                  <h2>Loading
                      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                  </h2>
              </div>
              :
        
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
            {
                (() => {
                if (lastRow) {
                    return (
                        <AdminNewTermCard
                            inputStype={props.inputStype}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            handleOpenForm={handleOpenForm}
                            openForm={openForm}
                        />
                    )
                }
            })()
            }
        </div>
      }
        
    </div>
  );
}
   
  export default AdminTerms;
