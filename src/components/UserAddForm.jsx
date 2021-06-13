import React from 'react';
import './UserAddForm.css';
class UserAddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            isGoldClient: false,
            salary: '',
            image: ''
        };
    }

    updateName(event) {
        this.setState({name: event.target.value});
    }

    updateEmail(event) {
        this.setState({email: event.target.value});
    }

    updateIsGoldClient(event) {
        this.setState({isGoldClient: event.target.checked});
    }

    updateSalary(event) {
        this.setState({salary: event.target.value});
    }

    updateImage(event) {
        this.setState({image: event.target.value});
    }

    render() {
        const {name, email, isGoldClient, salary, image} = this.state;

        return (
            <form
                className="user-add-form"
                onSubmit={(event) => {
                    this.props.submitAddForm(event, name, email, isGoldClient, salary, image);
                    this.setState (() =>  ({
                        name: '',
                        email: '',
                        isGoldClient: false,
                        salary: '',
                        image: ''
                    }));
                }}
            >
                <h2 id="addUsers">Add users:</h2>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    value={this.state.name}
                    onChange={(event) => this.updateName(event)}
                    required
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    placeholder="yourname@domain.example"
                    value={this.state.email}
                    onChange={(event) => this.updateEmail(event)}
                    required
                />
                <label htmlFor="salary">Salary:</label>
                <input
                    type="number"
                    name="salary"
                    placeholder="Expressed in USD"
                    value={this.state.salary}
                    onChange={(event) => this.updateSalary(event)}
                />
                <label htmlFor="image">Profile Photo:</label>
                <input
                    type="text"
                    name="image"
                    placeholder="Insert Image Link"
                    value={this.state.image}
                    onChange={(event) => this.updateImage(event)}
                />
                <label htmlFor="is-gold-client">Gold Client</label>
                <input
                    type="checkbox"
                    name="is-gold-client"
                    value={this.state.isGoldClient}
                    onChange={(event) => this.updateIsGoldClient(event)}
                />

                <input type="submit" value="Add user"/>
            </form>
        )
    }
}

export default UserAddForm;