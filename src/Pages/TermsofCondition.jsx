// src/Pages/TermsOfConditions.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './TermsofCondition.css';

const TermsOfConditions = () => {
  return (
    <div className="terms-container">
      <section className="terms-hero">
        <div className="terms-hero-content">
          <h1>Terms of Conditions</h1>
          <p>Important guidelines for using our recipe sharing platform ✨</p>
        </div>
      </section>

      <section className="terms-content-section">
        <div className="terms-wrapper">
          <p className="terms-intro">
            Welcome to our recipe sharing website! By accessing or using our services, you agree to be bound by these Terms of Conditions. If you disagree with any part of the terms, you may not access the service.
          </p>

          <h2>1. User Accounts</h2>
          <p>
            You must create an account to share recipes. You are responsible for maintaining the confidentiality of your account and password.
          </p>

          <h2>2. Content Submission</h2>
          <p>
            When you share a recipe, you grant us a non-exclusive, royalty-free license to use, reproduce, and display your content. You represent that you own or have rights to the content you submit.
          </p>

          <h2>3. Prohibited Conduct</h2>
          <ul>
            <li>Posting harmful, illegal, or offensive content.</li>
            <li>Violating intellectual property rights.</li>
            <li>Spamming or harassing other users.</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>
            All content on the site, excluding user-submitted recipes, is our property or licensed to us. You may not reproduce or distribute it without permission.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            We are not liable for any damages arising from your use of the service, including but not limited to indirect or consequential damages.
          </p>

          <h2>6. Changes to Terms</h2>
          <p>
            We may update these terms at any time. Continued use of the service after changes constitutes acceptance.
          </p>

          <h2>7. Governing Law</h2>
          <p>
            These terms are governed by the laws of India.
          </p>

          <p className="terms-contact">
            If you have any questions about these Terms, please <Link to="/ContactUs">contact us</Link>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsOfConditions;