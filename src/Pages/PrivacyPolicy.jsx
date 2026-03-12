// src/Pages/PrivacyPolicy.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <section className="privacy-hero">
        <div className="privacy-hero-content">
          <h1>Privacy Policy</h1>
          <p>Your privacy matters to us on our recipe sharing platform ✨</p>
        </div>
      </section>

      <section className="privacy-content-section">
        <div className="privacy-wrapper">
          <p className="privacy-intro">
            At our recipe sharing website, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, and any other information you provide when creating an account, sharing recipes, or contacting us.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to operate and maintain our website, provide you with services, respond to your comments and questions, and send you updates or promotional materials.
          </p>

          <h2>3. Sharing Your Information</h2>
          <p>
            We do not sell or rent your personal information to third parties. We may share information with service providers who assist us in operating our website or conducting our business.
          </p>

          <h2>4. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies to enhance your experience, gather general visitor information, and track visits to our website. You can choose to disable cookies through your browser settings.
          </p>

          <h2>5. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the information you provide, please be aware that no security measures are perfect.
          </p>

          <h2>6. Children's Privacy</h2>
          <p>
            Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If we learn that we have collected such information, we will delete it.
          </p>

          <h2>7. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please <Link to="/contactus">contact us</Link>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;