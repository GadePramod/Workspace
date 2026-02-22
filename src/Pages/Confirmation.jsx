import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import './Confirmation.css';

const Confirmation = () => {
  const [booking, setBooking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const lastBooking = localStorage.getItem('ws_last_booking');
    if (lastBooking) {
      setBooking(JSON.parse(lastBooking));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const generatePDF = () => {
    if (!booking) return;

    try {
      const doc = new jsPDF();
      const primaryColor = '#4f46e5';

      // Header Branding
      doc.setFontSize(24);
      doc.setTextColor(primaryColor);
      doc.setFont('helvetica', 'bold');
      doc.text('WORKING SPACE', 105, 25, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setTextColor('#64748b');
      doc.setFont('helvetica', 'normal');
      doc.text('Premium Coworking Solutions India', 105, 32, { align: 'center' });

      doc.setDrawColor('#e2e8f0');
      doc.line(20, 40, 190, 40);

      // Invoice Meta
      doc.setFontSize(12);
      doc.setTextColor('#1e293b');
      doc.setFont('helvetica', 'bold');
      doc.text('INVOICE & BOOKING SUMMARY', 20, 50);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(`Booking ID: ${booking.id}`, 20, 58);
      doc.text(`Issue Date: ${new Date().toLocaleDateString()}`, 20, 64);
      doc.text(`Payment Mode: ${booking.paymentMethod}`, 20, 70);

      // Billing Details
      doc.setFont('helvetica', 'bold');
      doc.text('BILL TO:', 20, 85);
      doc.setFont('helvetica', 'normal');
      doc.text(booking.userName, 20, 92);
      doc.text(booking.userEmail, 20, 98);

      // Table
      doc.setFillColor('#f8fafc');
      doc.rect(20, 110, 170, 10, 'F');
      doc.setFont('helvetica', 'bold');
      doc.text('Description', 25, 116.5);
      doc.text('Date', 100, 116.5);
      doc.text('Time Slot', 135, 116.5);
      doc.text('Amount (INR)', 160, 116.5);

      doc.setFont('helvetica', 'normal');
      doc.text(booking.workspaceName, 25, 130);
      doc.text(booking.date, 100, 130);
      doc.text(booking.timeSlotLabel, 135, 130);
      doc.text(`${booking.totalPrice.toFixed(2)}`, 170, 130);

      doc.line(20, 137, 190, 137);

      // Summary
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor);
      doc.text(`TOTAL PAID: INR ${booking.totalPrice.toFixed(2)}`, 190, 150, { align: 'right' });

      doc.setFontSize(10);
      doc.setTextColor('#94a3b8');
      doc.setFont('helvetica', 'italic');
      doc.text('Thank you for choosing Working Space India.', 105, 185, { align: 'center' });
      doc.text('A confirmation SMS has also been sent to your registered mobile.', 105, 191, { align: 'center' });

      doc.save(`Invoice_${booking.id}.pdf`);
    } catch (err) {
      console.error("PDF Generation failed:", err);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  if (!booking) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        
        {/* Success Icon */}
        <div className="success-icon-container">
          <svg className="success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="confirmation-title">Booking Confirmed!</h1>
        <p className="confirmation-subtitle">
          Confirmed via <span className="payment-method-highlight">{booking.paymentMethod}</span>
        </p>

        {/* Booking Details */}
        <div className="booking-details">
          <div className="detail-row">
            <span className="detail-label">Workspace</span>
            <span className="detail-value">{booking.workspaceName}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Date & Time</span>
            <span className="detail-value date-time">
              {new Date(booking.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })} <br />
              <span className="time-slot">{booking.timeSlotLabel}</span>
            </span>
          </div>
          <div className="detail-row total-row">
            <span className="detail-label">Total Amount</span>
            <span className="total-amount">₹{booking.totalPrice}</span>
          </div>
        </div>

        {/* Download PDF Button */}
        <button
          onClick={generatePDF}
          className="download-pdf-btn"
        >
          <svg className="download-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF Invoice
        </button>

        {/* Action Buttons */}
        <div className="action-buttons">
          <Link to="/" className="btn-home">
            Go to Home
          </Link>
          <Link to="/workspaces" className="btn-new-booking">
            New Booking
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;