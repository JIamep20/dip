import React from 'react';

export default class UserProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: {}, errors: {}};
        if (this.props.user.id)
            this.state.user = this.props.user;

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillReceiveProps(nextProps) { console.log(nextProps);
        this.setState({
            user: nextProps.user,
            errors: nextProps.errors
        });
    }

    handleInputChange({target}) {
        if(!!this.state.errors[target.name]) {
            let errors = {...this.state.errors};
            delete errors[target.name];
            this.setState({user: { ...this.state.user,
                [target.name]: target.value
            }, errors: errors });
        } else {
            this.setState({user: { ...this.state.user, [target.name]: target.value}});
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const { user } = this.state;
        var errors = {};
        if(user.name == '') errors.name = 'Can\'t be empty';
        if(user.email.search(/^\w+@\w+\.\w+$/gi) == -1) errors.email = 'Invalid email';
        if(user.password || user.password_confirmation) {
            user.password = user.password || '';
            user.password_confirmation = user.password_confirmation || '';
            if(user.password.length < 1 || user.password_confirmation.length < 1) {
                errors.password = 'Password and password repeat should be equal or empty';
            } else if (user.password.length < 5 || user.password_confirmation.length < 5){
                errors.password = 'Password must be 6 and more characters length';
            }
        }

        if(Object.keys(errors).length == 0)
            this.props.saveUser(this.state.user);
        else
            this.setState({errors});
    }

    render() {
        const {name, email, password_confirmation = '', password = ''} = this.state.user;

        return (
            <div id="profile-block">
                <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="user-name">Name</label>
                        <input type="text" id="user-name" name="name" placeholder="Name..." value={name}
                               onChange={this.handleInputChange}/>
                        <span className="validation-error">{this.state.errors.name}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="user-email">Email</label>
                        <input type="text" id="user-email" name="email" placeholder="Email..." value={email}
                               onChange={this.handleInputChange}/>
                        <span className="validation-error">{this.state.errors.email}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="user-password">Passowrd</label>
                        <input type="password" id="user-password" name="password"  placeholder="Password..." value={password} onChange={this.handleInputChange}/>
                        <span className="validation-error">{this.state.errors.password}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="user-password-repeat">Repeat password</label>
                        <input type="password" id="user-password-repeat" name="password_confirmation" value={password_confirmation} placeholder="Repeat password" onChange={this.handleInputChange}/>
                        <span className="validation-error">{this.state.errors.password}</span>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-submit">Save</button>
                    </div>

                </form>
            </div>
        );
    }
}

UserProfileForm.errorsStyles = {
    color: 'red'
};