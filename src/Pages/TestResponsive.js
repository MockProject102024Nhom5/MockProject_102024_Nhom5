import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class FormQuanLy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            role: 'user',
            active: false,
            phone: '',
            address: ''
        };
    }

    handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        this.setState({
            [name]: type === 'checkbox' ? checked : value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('Dữ liệu form:', this.state);
    };

    handleReset = () => {
        this.setState({
            name: '',
            email: '',
            password: '',
            role: 'user',
            active: false,
            phone: '',
            address: ''
        });
    };

    render() {
        const { name, email, password, role, active, phone, address } = this.state;

        return (
            <div className="container mt-5">
                <h2 className="mb-4">Form Quản Lý Thông Tin</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="name" className="form-label">Họ và tên <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={name}
                                onChange={this.handleChange}
                                placeholder="Nhập họ và tên"
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="email" className="form-label"> Email <span className="text-danger">*</span></label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={email}
                                onChange={this.handleChange}
                                placeholder="Nhập email"
                                required
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="password" className="form-label">Mật khẩu <span className="text-danger">*</span></label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={password}
                                onChange={this.handleChange}
                                placeholder="Nhập mật khẩu"
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="role" className="form-label">Quyền</label>
                            <select
                                className="form-select"
                                id="role"
                                name="role"
                                value={role}
                                onChange={this.handleChange}
                            >
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                                <option value="editor">Editor</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="phone" className="form-label">Số điện thoại</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={phone}
                                onChange={this.handleChange}
                                placeholder="Nhập số điện thoại"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="address" className="form-label">Địa chỉ</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={address}
                                onChange={this.handleChange}
                                placeholder="Nhập địa chỉ"
                            />
                        </div>
                    </div>

                    <div className="form-check mb-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="active"
                            name="active"
                            checked={active}
                            onChange={this.handleChange}
                        />
                        <label className="form-check-label" htmlFor="active">
                            Kích hoạt tài khoản
                        </label>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">Lưu</button>
                        <button type="button" className="btn btn-secondary" onClick={this.handleReset}>Hủy</button>
                    </div>

                    <div className="mt-3">
                        <small className="text-muted"><span className="text-danger">*</span> Tất cả các trường đánh dấu là bắt buộc.</small>
                    </div>
                </form>
            </div>
        );
    }
}

export default FormQuanLy;
