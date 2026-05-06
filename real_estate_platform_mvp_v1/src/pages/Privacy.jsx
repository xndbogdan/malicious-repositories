import { motion } from 'framer-motion';

function Privacy() {
  const sections = [
    {
      title: 'Introduction',
      content: `This Privacy Policy explains how RoyalCity ("we," "us," or "our") collects, uses, and protects your personal information when you use our platform. We are committed to ensuring the privacy and security of your personal and financial information, including cryptocurrency transactions.`
    },
    {
      title: 'Information We Collect',
      content: `We collect information that you provide directly to us, including:    
      • Personal identification information (name, email address, phone number)
      • Government-issued ID for KYC verification
      • Cryptocurrency wallet addresses
      • Investment preferences and history
      • Communication records with our platform

      We also automatically collect certain information about your device and how you interact with our platform, including:

      • IP address and device identifiers
      • Browser type and operating system
      • Usage data and interaction with our services
      • Blockchain transaction data`
    },
    {
      title: 'How We Use Your Information',
      content: `We use the collected information for:

      • Processing your property investments and cryptocurrency transactions
      • Verifying your identity and preventing fraud
      • Providing customer support and responding to inquiries
      • Sending important updates about your investments
      • Improving our platform and services
      • Complying with legal and regulatory requirements

      All data processing is conducted in accordance with applicable laws and regulations.`
    },
    {
      title: 'Cryptocurrency Transaction Privacy',
      content: `While blockchain transactions are publicly visible, we implement additional privacy measures:

      • We never share your wallet addresses publicly
      • Transaction details are encrypted in our database
      • We use separate wallet addresses for each transaction
      • Smart contracts are audited for privacy vulnerabilities

      Please note that blockchain transactions are irreversible and publicly recorded on the respective networks.`
    },
    {
      title: 'Data Security',
      content: `We implement robust security measures to protect your information:

• End-to-end encryption for sensitive data
• Regular security audits and penetration testing
• Multi-factor authentication
• Secure cold storage for cryptocurrency assets
• Regular backup and disaster recovery procedures

Despite our best efforts, no method of transmission over the Internet is 100% secure.`
    },
    {
      title: 'Information Sharing',
      content: `We may share your information with:

• Property management partners for investment processing
• Identity verification services for KYC compliance
• Legal authorities when required by law
• Service providers who assist in platform operations

We never sell your personal information to third parties.`
    },
    {
      title: 'Your Rights',
      content: `You have the right to:

• Access your personal information
• Correct inaccurate information
• Request deletion of your data (where legally possible)
• Opt-out of marketing communications
• Export your data in a portable format

Contact our privacy team to exercise these rights.`
    },
    {
      title: 'Cookies and Tracking',
      content: `We use cookies and similar technologies to:

• Maintain your session security
• Remember your preferences
• Analyze platform usage
• Improve user experience

You can control cookie settings through your browser preferences.`
    },
    {
      title: 'Changes to Privacy Policy',
      content: `We may update this Privacy Policy periodically. Significant changes will be notified through:

• Email notifications
• Platform announcements
• Website updates

Continue using our platform after changes constitutes acceptance of the updated policy.`
    },
    {
      title: 'Contact Us',
      content: `For privacy-related inquiries:

Email: privacy@RoyalCity.com
Address: 123 Privacy Street, Real City, RC 12345

We aim to respond to all inquiries within 48 hours.`
    }
  ];

  return (
    <div className="min-h-screen bg-secondary-50 py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-4">Privacy Policy</h1>
          <p className="text-secondary-600 text-center mb-12">
            Last updated: March 15, 2024
          </p>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                  <div className="text-secondary-600 whitespace-pre-line">
                    {section.content}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Privacy;