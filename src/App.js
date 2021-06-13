import React from 'react';
import UserList from './components/UserList';
import UserAddForm from './components/UserAddForm';
import PostList from './components/PostList';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      background: "#dfc19f",
      color: "#797d8b",
      users: [],
      showUsers: true,
      showPosts: false,
      themeSelected: "light",
      flicker: true
    };
    this.flashColor = this.flashColor.bind(this)
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        data = data.filter(user => user.id < 8);
        data.forEach(user => {
          user.isGoldClient = false;
        });
        this.setState({users: data});
      })
  }

  changeColor(event) {
    this.setState({background: event.target.value});
  }

  changeTextColor(event) {
    this.setState({color: event.target.value})
  }

  getMaxId(users) {
    let maxId = 0;

    users.forEach(user => {
      if (user.id > maxId) {
        maxId = user.id;
      }
    });

    return maxId;
  }

  showUsers() {
    this.setState({showUsers: true, showPosts: false})
  }

  showPosts() {
    this.setState({showPosts: true, showUsers: false})
  }

  deleteUser(userId) {
    this.setState(prevState => {
      return {
        users: prevState.users.filter(users => users.id !== userId)
      }
    });
  }

  flashColor () {
      this.myInterval = setInterval(() => {
        if (this.state.flicker) {
          this.setState(() => ({
            background: "#ff33f8",
            color: "#fff700",
          flicker: false
          }));
        } else {
          this.setState(() => ({
            background: "#47d1ff",
            color: "#8700f5",
            flicker: true
          }));
        }
      }, 100)
  }


  handleTheme = (event) => {
    clearInterval(this.myInterval);
    switch(event.target.value) {
      case "dark":
          this.setState(() => ({
            background: "#383838",
            color: "#8c857d",
            themeSelected: "dark"
          }));
        break;
      case "light":
        this.setState({
          background: "#dfc19f",
          color: "#797d8b",
          themeSelected: "light"
        });
        break;
      case "orangeBlue":
        this.setState({
          background: "#d7ad65",
          color: "#7489d8",
          themeSelected: "orangeBlue"
        });
        break;
        case "insane":
          this.setState(() => ({
            themeSelected: "insane"}),
            () => this.flashColor()
          );
          
          break;
      default:
        this.setState({
          background: "#ffffff",
          color: "#000000"
        });
    }

  }

  submitAddForm(event, name, email, isGoldClient, salary, image) {
    event.preventDefault();
    this.setState(prevState => {
      return {
        users: [
          ...prevState.users,
          {
            id: this.getMaxId(prevState.users) + 1,
            name,
            email,
            isGoldClient,
            salary,
            image
          }
        ]
      }
    });
  }

  render() {
    return(
      <div className="app" style={{background: this.state.background, color: this.state.color}}>
        <h1>Admin panel - Proiectul 1</h1>
        
        <UserAddForm submitAddForm={(event, name, email, isGoldClient, salary, image) => this.submitAddForm(event, name, email, isGoldClient, salary, image)}/>

        <div className="switchView">
          {this.state.showPosts && <button onClick={() => this.showUsers()}>Show Users</button>}
          {this.state.showUsers && <button onClick={() => this.showPosts()}>Show Posts</button>}
        </div>

        <div className="options">
          <label htmlFor="backgroundColor">Choose Background Color:</label>
          <input 
            type="color"
            name="backgroundColor"
            value={this.state.background}
            onChange={(event) => this.changeColor(event)}
          />
          <label htmlFor="textColor">Choose Text Color:</label>
          <input 
            type="color"
            name="textColor"
            value={this.state.color}
            onChange={(event) => this.changeTextColor(event)}
          />
        </div>  
          <form className="themes" onChange={this.handleTheme}>
            <p>Choose Theme:</p>
            <label htmlFor="dark">Dark</label>
            <input id="dark" type="radio" name="themes" value="dark" checked={this.state.themeSelected === "dark"} />
            <label htmlFor="light">Light</label>
            <input id="light" type="radio" name="themes" value="light" checked={this.state.themeSelected === "light"} />
            <label htmlFor="orangeBlue">Orange/Blue</label>
            <input id="orangeBlue" type="radio" name="themes" value="orangeBlue" checked={this.state.themeSelected === "orangeBlue"}/>
            <label htmlFor="insane">Make My Eyes Bleed</label>
            <input id="insane" type="radio" name="themes" value="insane" checked={this.state.themeSelected === "insane"}/>
          </form>

        

        {this.state.showUsers && <UserList users={this.state.users} deleteUser={(userId) => this.deleteUser(userId)}/>}
        {this.state.showPosts && <PostList />}

      </div>
    );
  }
}

export default App;
