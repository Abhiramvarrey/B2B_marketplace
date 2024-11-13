import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'
// Define shop categories
const SHOP_CATEGORIES = [
    'Grocery',
    'Electronics',
    'Clothing',
    'Bakery',
    'Restaurant',
    'Stationery',
    'Hardware',
    'Jewelry',
    'Pharmacy',
    'Cosmetics',
    'Furniture',
    'Bookstore',
    'Sports',
    'Toys',
    'Other'
];

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        mobile: '',
        password: '',
        ownerName: '',
        shopName: '',
        shopLocation: '',
        shopCategory: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        console.log(formData)
        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        // Mobile validation
        if (!formData.mobile) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
            newErrors.mobile = 'Mobile number must be 10 digits';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        // Owner Name validation
        if (!formData.ownerName) {
            newErrors.ownerName = 'Owner Name is required';
        }

        // Shop Name validation
        if (!formData.shopName) {
            newErrors.shopName = 'Shop Name is required';
        }

        // Shop Location validation
        if (!formData.shopLocation) {
            newErrors.shopLocation = 'Shop Location is required';
        }

        // Shop Category validation
        if (!formData.shopCategory) {
            newErrors.shopCategory = 'Shop Category is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({ 
            ...formData, 
            [name]: value 
        });
        
        // Clear specific field error when user starts typing or selecting
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: undefined
            });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            try {
                const res = await axios.post('http://localhost:5000/api/auth/register', formData);
                localStorage.setItem('token', res.data.token);
                navigate('/login');
            } catch (err) {
                console.error(err.response?.data);
                if (err.response?.data?.message) {
                    alert(err.response.data.message);
                }
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-8">
            <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-blue-700">Shop Registration</h2>
                    <p className="text-gray-500 mt-2">Create your business account</p>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    {/* Email Input */}
                    <div>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={onChange}
                            placeholder="Email Address"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
                                ${errors.email 
                                    ? 'border-red-500 focus:ring-red-200' 
                                    : 'border-gray-300 focus:ring-blue-200'} 
                                focus:ring-2`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Mobile Input */}
                    <div>
                        <input 
                            type="tel" 
                            name="mobile"
                            value={formData.mobile}
                            onChange={onChange}
                            placeholder="Mobile Number"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
                                ${errors.mobile 
                                    ? 'border-red-500 focus:ring-red-200' 
                                    : 'border-gray-300 focus:ring-blue-200'} 
                                focus:ring-2`}
                        />
                        {errors.mobile && (
                            <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div>
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={onChange}
                            placeholder="Password"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
                                ${errors.password 
                                    ? 'border-red-500 focus:ring-red-200' 
                                    : 'border-gray-300 focus:ring-blue-200'} 
                                focus:ring-2`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Owner Name Input */}
                    <div>
                        <input 
                            type="text" 
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={onChange}
                            placeholder="Owner Name"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
                                ${errors.ownerName 
                                    ? 'border-red-500 focus:ring-red-200' 
                                    : 'border-gray-300 focus:ring-blue-200'} 
                                focus:ring-2`}
                        />
                        {errors.ownerName && (
                            <p className="text-red-500 text-sm mt-1">{errors.ownerName}</p>
                        )}
                    </div>

                    {/* Shop Name Input */}
                    <div>
                        <input 
                            type="text" 
                            name="shopName"
                            value={formData.shopName}
                            onChange={onChange}
                            placeholder="Shop Name"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
                                ${errors.shopName 
                                    ? 'border-red-500 focus:ring-red-200' 
                                    : 'border-gray-300 focus:ring-blue-200'} 
                                focus:ring-2`}
                        />
                        {errors.shopName && (
                            <p className="text-red-500 text-sm mt-1">{errors.shopName}</p>
                        )}
                    </div>

                    {/* Shop Location Input */}
                    <div>
                        <input 
                            type="text" 
                            name="shopLocation"
                            value={formData.shopLocation}
                            onChange={onChange}
                            placeholder="Shop Location"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
                                ${errors.shopLocation 
                                    ? 'border-red-500 focus:ring-red-200' 
                                    : 'border-gray-300 focus:ring-blue-200'} 
                                focus:ring-2`}
                        />
                        {errors.shopLocation && (
                            <p className="text-red-500 text-sm mt-1">{errors.shopLocation}</p>
                        )}
                    </div>

                    {/* Shop Category Dropdown */}
                    <div>
                        <select 
                            name="shopCategory"
                            value={formData.shopCategory}
                            onChange={onChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
                                ${errors.shopCategory 
                                    ? 'border-red-500 focus:ring-red-200' 
                                    : 'border-gray-300 focus:ring-blue-200'} 
                                focus:ring-2`}
                        >
                            <option value="" disabled>Select Shop Category</option>
                            {SHOP_CATEGORIES.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        {errors.shopCategory && (
                            <p className="text-red-500 text-sm mt-1">{errors.shopCategory}</p>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;