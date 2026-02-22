import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { WORKSPACES, TIME_SLOTS } from '../constants';
import './BookingPage.css';

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', description: 'Google Pay, PhonePe, Paytm' },
  { id: 'card', label: 'Debit Card / Credit Card', description: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', label: 'Net Banking', description: 'All major Indian banks' },
];

const BANKS = ['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'Others'];

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const workspace = WORKSPACES.find(w => w.id === id);

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bookedSlots, setBookedSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // UPI specific state
  const [upiId, setUpiId] = useState('');

  // Card specific states
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Net Banking specific states
  const [selectedBank, setSelectedBank] = useState('');

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('ws_bookings') || '[]');
    const currentWorkspaceBookingsForDate = savedBookings
      .filter(b => b.workspaceId === id && b.date === date)
      .map(b => b.timeSlotId);
    setBookedSlots(currentWorkspaceBookingsForDate);
  }, [id, date]);

  if (!workspace) {
    return (
      <div className="workspace-not-found">
        <h2 className="not-found-title">Workspace not found</h2>
        <Link to="/workspaces" className="not-found-link">Back to listings</Link>
      </div>
    );
  }

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    setExpiryDate(value);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 3);
    setCvv(value);
  };

  const isFormValid = () => {
    if (!selectedSlotId) return false;
    if (!name || !email) return false;
    if (!paymentMethod) return false;
    
    if (paymentMethod === 'upi') {
      return upiId.includes('@');
    }

    if (paymentMethod === 'card') {
      const cleanCard = cardNumber.replace(/\s/g, '');
      return cleanCard.length === 16 && expiryDate.length === 5 && cvv.length === 3;
    }

    if (paymentMethod === 'netbanking') {
      return selectedBank !== '';
    }
    
    return true;
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!selectedSlotId) {
      setErrorMessage("Please select a time slot to continue.");
      return;
    }

    if (!isFormValid()) {
      setErrorMessage("Please fill in all required payment and contact details.");
      return;
    }

    setIsSubmitting(true);
    const selectedSlot = TIME_SLOTS.find(s => s.id === selectedSlotId);
    const selectedPayment = PAYMENT_METHODS.find(p => p.id === paymentMethod);
    
    let finalPaymentMethodLabel = selectedPayment?.label || paymentMethod;
    if (paymentMethod === 'netbanking') finalPaymentMethodLabel = `Net Banking (${selectedBank})`;
    if (paymentMethod === 'upi') finalPaymentMethodLabel = `UPI (${upiId})`;

    const newBooking = {
      id: `book-${Date.now()}`,
      workspaceId: workspace.id,
      workspaceName: workspace.name,
      date,
      timeSlotId: selectedSlotId,
      timeSlotLabel: selectedSlot?.time || '',
      userName: name,
      userEmail: email,
      paymentMethod: finalPaymentMethodLabel,
      totalPrice: workspace.pricePerHour * 2,
      createdAt: new Date().toISOString()
    };

    // Simulate Payment Processing
    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem('ws_bookings') || '[]');
        localStorage.setItem('ws_bookings', JSON.stringify([...existing, newBooking]));
        localStorage.setItem('ws_last_booking', JSON.stringify(newBooking));
        setIsSubmitting(false);
        navigate('/confirmation');
      } catch (err) {
        console.error("Booking failed:", err);
        setErrorMessage("Something went wrong while saving your booking. Please try again.");
        setIsSubmitting(false);
      }
    }, 2000);
  };

  return (
    <div className="booking-container">
      {/* Header Image Section */}
      <div className="booking-header-image">
        <img
          src={workspace.image}
          className="header-image"
          alt={workspace.name}
        />
        <div className="header-overlay">
          <div className="header-content">
            <Link to={`/workspace/${workspace.id}`} className="back-link">
              <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Workspace
            </Link>
            <h1 className="header-title">{workspace.name}</h1>
            <p className="header-location">
              <svg className="location-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {workspace.location}
            </p>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="booking-form-wrapper">
        <form onSubmit={handleBooking} className="booking-form">
          
          {/* Workspace Details Summary */}
          <div className="workspace-details-grid">
            <div className="detail-card">
              <p className="detail-label">Type</p>
              <p className="detail-value-n">{workspace.type}</p>
            </div>
            <div className="detail-card">
              <p className="detail-label">Rate</p>
              <p className="detail-value rate">₹{workspace.pricePerHour}/hr</p>
            </div>
            <div className="detail-card">
              <p className="detail-label">Session</p>
              <p className="detail-value-n">2 Hours</p>
            </div>
            <div className="detail-card total-card">
              <p className="detail-label">Total</p>
              <p className="detail-value total">₹{workspace.pricePerHour * 2}</p>
            </div>
          </div>

          {/* Date and Time Slot Section */}
          <div className="form-section">
            <div className="date-time-grid">
              {/* Date Picker */}
              <div className="form-group">
                <label className="form-section-label">1. Select Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="date-input"
                  required
                />
              </div>

              {/* Time Slots */}
              <div className="form-group">
                <label className="form-section-label">2. Choose Time Slot</label>
                <div className="time-slots-container">
                  {TIME_SLOTS.map((slot) => {
                    const isBooked = bookedSlots.includes(slot.id);
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        disabled={isBooked}
                        onClick={() => setSelectedSlotId(slot.id)}
                        className={`time-slot-btn ${
                          isBooked 
                            ? 'time-slot-booked' 
                            : selectedSlotId === slot.id
                              ? 'time-slot-selected'
                              : 'time-slot-available'
                        }`}
                      >
                        <span className="slot-content">
                          <div className={`slot-indicator ${selectedSlotId === slot.id ? 'active' : ''}`} />
                          {slot.time}
                        </span>
                        {isBooked && <span className="reserved-badge">Reserved</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="form-section">
            <label className="form-section-label">3. Contact Details</label>
            <div className="contact-inputs">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="form-input"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Payment Section */}
          <div className="form-section">
            <label className="form-section-label">4. Secure Payment</label>
            <div className="payment-methods">
              {PAYMENT_METHODS.map((method) => (
                <div key={method.id} className="payment-method-wrapper">
                  {/* Payment Method Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod(method.id);
                      if (method.id !== 'netbanking') setSelectedBank('');
                    }}
                    className={`payment-method-btn ${
                      paymentMethod === method.id 
                        ? 'payment-method-active' 
                        : 'payment-method-inactive'
                    }`}
                  >
                    <div className="payment-method-content">
                      <div className={`radio-button ${paymentMethod === method.id ? 'radio-active' : ''}`}>
                        {paymentMethod === method.id && <div className="radio-dot" />}
                      </div>
                      <div>
                        <div className={`payment-label ${paymentMethod === method.id ? 'payment-label-active' : ''}`}>
                          {method.label}
                        </div>
                        <div className="payment-description">{method.description}</div>
                      </div>
                    </div>
                  </button>

                  {/* UPI Sub-form */}
                  {paymentMethod === 'upi' && method.id === 'upi' && (
                    <div className="payment-subform">
                      <label className="subform-label">Enter UPI ID</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={e => setUpiId(e.target.value)}
                        placeholder="username@bankid"
                        className="subform-input"
                        required
                      />
                      <p className="subform-help">Payment request will be sent to your UPI app.</p>
                    </div>
                  )}

                  {/* Card Sub-form */}
                  {paymentMethod === 'card' && method.id === 'card' && (
                    <div className="payment-subform">
                      <div className="card-form-group">
                        <label className="subform-label">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="0000 0000 0000 0000"
                          className="subform-input card-input"
                        />
                      </div>
                      <div className="card-details-grid">
                        <div className="card-form-group">
                          <label className="subform-label">Expiry</label>
                          <input
                            type="text"
                            value={expiryDate}
                            onChange={handleExpiryChange}
                            placeholder="MM/YY"
                            className="subform-input expiry-input"
                          />
                        </div>
                        <div className="card-form-group">
                          <label className="subform-label">CVV</label>
                          <input
                            type="text"
                            value={cvv}
                            onChange={handleCvvChange}
                            placeholder="•••"
                            className="subform-input cvv-input"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Net Banking Sub-form */}
                  {paymentMethod === 'netbanking' && method.id === 'netbanking' && (
                    <div className="payment-subform">
                      <label className="subform-label">Select Bank</label>
                      <div className="banks-grid">
                        {BANKS.map((bank) => (
                          <button
                            key={bank}
                            type="button"
                            onClick={() => setSelectedBank(bank)}
                            className={`bank-btn ${
                              selectedBank === bank
                                ? 'bank-btn-selected'
                                : 'bank-btn-inactive'
                            }`}
                          >
                            {bank}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="error-message">
              <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`submit-btn ${isSubmitting ? 'submit-btn-loading' : ''}`}
          >
            {isSubmitting ? (
              <span className="submit-loading">
                <svg className="spinner" fill="none" viewBox="0 0 24 24">
                  <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying Payment...
              </span>
            ) : (
              `Pay ₹${workspace.pricePerHour * 2} & Confirm Booking`
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;