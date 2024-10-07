import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './LoginPage.scss';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            passWord: '',
            errMessage: '',
            isShowPassword: false
        };
    }

    handleOnChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleOnClickLogin = async (event) => {
        event.preventDefault();
        const { userName, passWord } = this.state;
        if (userName === 'username1' && passWord === '123456') {
            toast.success('Login succeeded!');
            this.setState({
                errMessage: ''
            });
        } else {
            toast.error('Failed to login!');
            this.setState({
                errMessage: 'Wrong username or password!'
            });
        }
    };

    handleShowHide = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        });
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleOnClickLogin(event);
        }
    };

    render() {
        return (
            <>
                <div className='login-background'>
                    <div className='login-container'>
                        <form className='login-content row' onSubmit={this.handleOnClickLogin}>
                            <div className='col-12 text-login'>Login</div>
                            <div className='col-12 form-group login-input'>
                                <label>User name</label>
                                <input
                                    type='text'
                                    placeholder='Enter your userName'
                                    className='form-control'
                                    value={this.state.userName}
                                    onChange={this.handleOnChangeInput}
                                    name='userName'
                                    required
                                />
                            </div>
                            <div className='col-12 form-group login-input'>
                                <label>Password</label>
                                <div className='custom-input-password'>
                                    <input
                                        type={this.state.isShowPassword ? 'text' : 'password'}
                                        placeholder='Enter your password'
                                        className='form-control'
                                        value={this.state.passWord}
                                        onChange={this.handleOnChangeInput}
                                        name='passWord'
                                        onKeyDown={this.handleKeyDown}
                                        required
                                    />
                                    <span onClick={this.handleShowHide}>
                                        <i className={this.state.isShowPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}></i>
                                    </span>
                                </div>
                                <div className='col-12 mt-3' style={{ color: 'red' }}>
                                    {this.state.errMessage}
                                </div>
                            </div>
                            <div className='col-12'>
                                <button className='btn-login' type='submit'>
                                    Login
                                </button>
                            </div>
                            <div className='col-12'>
                                <span className='forgot-password'>Forgot your password?</span>
                            </div>
                            <div className='col-12 text-center mt-3'>
                                <span>Or login with:</span>
                            </div>
                            <div className='col-12 social-login'>
                                <i className="fa-brands fa-google-plus-g google"></i>
                                <i className="fa-brands fa-facebook-f facebook"></i>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </>
        );
    }
}

export default LoginPage;
