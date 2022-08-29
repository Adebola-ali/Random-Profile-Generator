import { useState, Fragment } from "react";
import './App.css';
import Button from './Components/Button';
import axios from "axios";
const App = () => {
  const [userData,setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeUser, setActiveUser] = useState(false);
  const [activeLink, setActiveLink] = useState(0);

  const onClickHandler = () => {
        setActiveLink(0);
        setLoading(true);
        axios.get('https://randomuser.me/api')
        .then((response) => {
          console.log(response.data.results);
          setUserData(response.data.results);
        }).catch((error) => {
          console.log(error);
          setLoading(true);
        }).finally(() => {
          setLoading(false);
          setActiveUser(true);
        })
  }

  const icons = [
    'fas fa-user fa-3x',
    'fas fa-envelope fa-3x',
    'fas fa-calender-alt fa-3x',
    'fas fa-map-marker fa-3x',
    'fas fa-phone fa-3x',
    'fas fa-lock fa-3x',
  ]; 

  const TextGenerator = ({user}) => {
    const phrases = [
      `Name: ${user.name.first} ${user.name.last}`,
      `Email address: ${user.email}`,
      `DOB: ${user.dob.date.slice(0,10)}`,
      `Location: ${user.location.country}`,
      `Phone no: ${user.phone}`,
      `Password: ${user.login.password}`,
    ];
    return <h1>{phrases[activeLink]}</h1>
  }

  const activeLinkHandler = (index) => {
    setActiveLink(index);
  }

  const style = {
    color:"white",
  };
  return (
    <div className="App">
      <h1>RANDOM USER GENERATOR</h1>
      <Button isActive={activeUser} clicked={onClickHandler} />
      {loading ? (
        <h1>Loading...</h1>
      ):(
        <div className="app__user" >
          {userData.map((user, index) =>{
            return(
              <Fragment key={user.cell}>
                <img src={user.picture.large} alt="#"/>
                <TextGenerator user={user} />
                <div className="app__icons">
                  {icons.map((icon,index) => {
                    return (
                      <i
                        className={icon}
                        key={index}
                        onMouseOver={() => activeLinkHandler(index)}
                        style={activeLink === index ? style : null}
                      ></i>
                    );
                  })}
                </div>
              </Fragment>
            )
          })}
        </div>
      )}
    </div>
  );
}

export default App;
