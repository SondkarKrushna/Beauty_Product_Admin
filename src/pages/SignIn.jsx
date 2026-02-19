import React, { useState } from "react";
import { useLoginAdminMutation, useVerifyAdminMutation } from "../redux/apis/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdmin, setToken } from "../redux/apis/authSlice";

const SignIn = () => {
    const [contact, setContact] = useState("9876543210");
    const [otp, setOtp] = useState("");
    const [showOtp, setShowOtp] = useState(false);

    const navigate = useNavigate()
    const [loginAdmin, { isLoading: sendingOtp }] = useLoginAdminMutation();
    const [verifyAdmin, { isLoading: verifying }] = useVerifyAdminMutation();
    const dispatch = useDispatch();

    const handleSendOtp = async () => {
        if (!contact || contact.length !== 10) {
            alert("Please enter valid 10-digit contact number");
            return;
        }
        try {
            const res = await loginAdmin({ contact }).unwrap();
            setShowOtp(true);
            alert("OTP sent successfully!");
        } catch (err) {
            alert(err?.data?.message || "Failed to send OTP");
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp) {
            alert("Enter your OTP");
            return;
        }
        try {
            const verifyRes = await verifyAdmin({ contact, otp }).unwrap();
            dispatch(setToken(verifyRes?.token));
            dispatch(setAdmin(verifyRes?.admin));
            localStorage.setItem("adminToken", verifyRes?.token);
            navigate("/");
        } catch (err) {
            alert(err?.data?.message || "Invalid OTP");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-5 sm:p-8"> {/* smaller padding for mobile */}

                    <h2 className="text-center text-pink-500 text-lg sm:text-xl font-semibold mb-5 sm:mb-6">
                        Sign In Now
                    </h2>

                    {/* Phone Input */}
                    <label className="block text-gray-700 text-sm mb-2">
                        Phone Number
                    </label>

                    <div className="flex mb-5 sm:mb-6">
                        <input
                            type="text"
                            value="+91"
                            readOnly
                            className="w-16 sm:w-20 px-2 sm:px-3 py-2 border border-pink-300 rounded-l-md focus:outline-none text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Enter number"
                            value={contact}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d{0,10}$/.test(value)) {
                                    setContact(value);
                                }
                            }}
                            maxLength={10}
                            className="flex-1 px-3 py-2 border border-pink-300 border-l-0 rounded-r-md focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
                        />
                    </div>

                    {/* OTP Input */}
                    {showOtp && (
                        <div className="mb-5 sm:mb-6">
                            <label className="block text-gray-700 text-sm mb-2">
                                OTP
                            </label>
                            <input
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d{0,6}$/.test(value)) {
                                        setOtp(value);
                                    }
                                }}
                                maxLength={6}
                                className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
                            />
                        </div>
                    )}

                    {/* Buttons */}
                    {!showOtp ? (
                        <button
                            onClick={handleSendOtp}
                            disabled={sendingOtp}
                            className="w-full bg-pink-500 text-white py-2.5 sm:py-2 rounded-md hover:bg-pink-600 transition-colors text-sm sm:text-base"
                        >
                            {sendingOtp ? "Sending OTP..." : "Sign In"}
                        </button>
                    ) : (
                        <button
                            onClick={handleVerifyOtp}
                            disabled={verifying}
                            className="w-full bg-green-500 text-white py-2.5 sm:py-2 rounded-md hover:bg-green-600 transition-colors text-sm sm:text-base"
                        >
                            {verifying ? "Verifying..." : "Verify OTP"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignIn;
