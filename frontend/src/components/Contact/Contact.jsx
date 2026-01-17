// // frontend/src/components/Contact/Contact.jsx
// import React, { useState, useRef } from 'react';
// import { 
//   Mail, Phone, MapPin, Send, CheckCircle, 
//   AlertCircle, Github, Linkedin, Twitter, 
//   MessageSquare, User, Mail as MailIcon, FileText 
// } from 'lucide-react';
// // import emailjs from '@emailjs/browser';

// const Contact = () => {
//   const formRef = useRef();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);

//   const contactInfo = [
//     {
//       icon: Mail,
//       title: 'Email',
//       value: 'hello@nesttech.dev',
//       link: 'mailto:hello@nesttech.dev',
//       color: 'text-blue-500'
//     },
//     {
//       icon: Phone,
//       title: 'Phone',
//       value: '+1 (555) 123-4567',
//       link: 'tel:+15551234567',
//       color: 'text-green-500'
//     },
//     {
//       icon: MapPin,
//       title: 'Location',
//       value: 'San Francisco, CA',
//       link: 'https://maps.google.com',
//       color: 'text-red-500'
//     }
//   ];

//   const socialLinks = [
//     {
//       icon: Github,
//       label: 'GitHub',
//       href: 'https://github.com/nesttech',
//       color: 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white',
//       bgColor: 'bg-gray-100 dark:bg-gray-800'
//     },
//     {
//       icon: Linkedin,
//       label: 'LinkedIn',
//       href: 'https://linkedin.com/in/nesttech',
//       color: 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300',
//       bgColor: 'bg-blue-100 dark:bg-blue-900/30'
//     },
//     {
//       icon: Twitter,
//       label: 'Twitter',
//       href: 'https://twitter.com/nesttechdev',
//       color: 'text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-300',
//       bgColor: 'bg-sky-100 dark:bg-sky-900/30'
//     }
//   ];

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitStatus(null);

//     try {
//       // Using EmailJS for contact form (free tier available)
//       // const result = await emailjs.sendForm(
//         process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_id',
//         process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_id',
//         formRef.current,
//         process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'public_key'
//       );

//       if (result.status === 200) {
//         setSubmitStatus('success');
//         setFormData({ name: '', email: '', subject: '', message: '' });
        
//         // Reset form after 5 seconds
//         setTimeout(() => {
//           setSubmitStatus(null);
//         }, 5000);
//       }
//     } catch (error) {
//       console.error('Error sending email:', error);
//       setSubmitStatus('error');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDownloadResume = () => {
//     const link = document.createElement('a');
//     link.href = '/resume.pdf';
//     link.download = 'NestTech_Resume.pdf';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <section id="contact" className="section bg-dark-50 dark:bg-dark-950">
//       <div className="container">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <h2 className="section-title">
//             Get In <span className="gradient-text">Touch</span>
//           </h2>
//           <p className="section-subtitle">
//             Have a project in mind? Let's build something amazing together
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12">
//           {/* Left Column - Contact Info & Social */}
//           <div className="space-y-8 animate-slide-in-left">
//             {/* Contact Information */}
//             <div>
//               <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">
//                 Contact Information
//               </h3>
//               <div className="space-y-4">
//                 {contactInfo.map((info) => (
//                   <a
//                     key={info.title}
//                     href={info.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-4 p-4 bg-white dark:bg-dark-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
//                   >
//                     <div className={`p-3 rounded-lg ${info.color.replace('text-', 'bg-')}/10`}>
//                       <info.icon className={`w-6 h-6 ${info.color}`} />
//                     </div>
//                     <div className="flex-1">
//                       <div className="text-sm text-dark-500 dark:text-dark-400">
//                         {info.title}
//                       </div>
//                       <div className="font-medium text-dark-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
//                         {info.value}
//                       </div>
//                     </div>
//                   </a>
//                 ))}
//               </div>
//             </div>

//             {/* Social Links */}
//             <div>
//               <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">
//                 Connect With Me
//               </h3>
//               <div className="flex gap-4">
//                 {socialLinks.map((social) => (
//                   <a
//                     key={social.label}
//                     href={social.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className={`flex items-center gap-2 px-4 py-3 ${social.bgColor} rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}
//                   >
//                     <social.icon className={`w-5 h-5 ${social.color} transition-colors`} />
//                     <span className={`font-medium ${social.color} transition-colors`}>
//                       {social.label}
//                     </span>
//                   </a>
//                 ))}
//               </div>
//             </div>

//             {/* Resume Download */}
//             <div className="pt-8 border-t border-dark-200 dark:border-dark-700">
//               <div className="text-center">
//                 <button
//                   onClick={handleDownloadResume}
//                   className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium group"
//                 >
//                   <FileText className="w-5 h-5" />
//                   Download Full Resume
//                   <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Contact Form */}
//           <div className="animate-slide-in-right">
//             <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8">
//               <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">
//                 Send a Message
//               </h3>

//               {/* Status Messages */}
//               {submitStatus === 'success' && (
//                 <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
//                   <div className="flex items-center gap-3">
//                     <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
//                     <div>
//                       <div className="font-medium text-green-800 dark:text-green-300">
//                         Message sent successfully!
//                       </div>
//                       <div className="text-sm text-green-700 dark:text-green-400">
//                         I'll get back to you within 24 hours.
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {submitStatus === 'error' && (
//                 <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
//                   <div className="flex items-center gap-3">
//                     <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
//                     <div>
//                       <div className="font-medium text-red-800 dark:text-red-300">
//                         Error sending message
//                       </div>
//                       <div className="text-sm text-red-700 dark:text-red-400">
//                         Please try again or contact me directly via email.
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Contact Form */}
//               <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   {/* Name Field */}
//                   <div className="space-y-2">
//                     <label htmlFor="name" className="block text-sm font-medium text-dark-700 dark:text-dark-300">
//                       <div className="flex items-center gap-2">
//                         <User className="w-4 h-4" />
//                         Your Name
//                       </div>
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
//                       placeholder="John Doe"
//                     />
//                   </div>

//                   {/* Email Field */}
//                   <div className="space-y-2">
//                     <label htmlFor="email" className="block text-sm font-medium text-dark-700 dark:text-dark-300">
//                       <div className="flex items-center gap-2">
//                         <MailIcon className="w-4 h-4" />
//                         Email Address
//                       </div>
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
//                       placeholder="john@example.com"
//                     />
//                   </div>
//                 </div>

//                 {/* Subject Field */}
//                 <div className="space-y-2">
//                   <label htmlFor="subject" className="block text-sm font-medium text-dark-700 dark:text-dark-300">
//                     Subject
//                   </label>
//                   <input
//                     type="text"
//                     id="subject"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
//                     placeholder="Project Inquiry"
//                   />
//                 </div>

//                 {/* Message Field */}
//                 <div className="space-y-2">
//                   <label htmlFor="message" className="block text-sm font-medium text-dark-700 dark:text-dark-300">
//                     <div className="flex items-center gap-2">
//                       <MessageSquare className="w-4 h-4" />
//                       Your Message
//                     </div>
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     rows="6"
//                     className="w-full px-4 py-3 bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
//                     placeholder="Tell me about your project..."
//                   />
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className={`w-full btn btn-primary ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                       Sending...
//                     </>
//                   ) : (
//                     <>
//                       <Send className="w-5 h-5 mr-2" />
//                       Send Message
//                     </>
//                   )}
//                 </button>

//                 {/* Privacy Note */}
//                 <p className="text-center text-sm text-dark-500 dark:text-dark-400">
//                   Your information is secure and will never be shared with third parties.
//                 </p>
//               </form>
//             </div>

//             {/* Quick Response */}
//             <div className="mt-8 p-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl text-white">
//               <div className="flex items-center gap-4">
//                 <MessageSquare className="w-8 h-8" />
//                 <div>
//                   <h4 className="font-bold text-lg">Quick Response Time</h4>
//                   <p className="text-sm opacity-90">
//                     I typically respond within 24 hours for all inquiries
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Map/CTA Section */}
//         <div className="mt-16 text-center">
//           <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8">
//             <div className="text-left">
//               <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">
//                 Ready to Start Your Project?
//               </h3>
//               <p className="text-dark-600 dark:text-dark-400">
//                 Let's discuss how we can bring your ideas to life
//               </p>
//             </div>
//             <div className="flex gap-4">
//               <button
//                 onClick={() => window.location.href = 'mailto:hello@nesttech.dev'}
//                 className="btn btn-primary"
//               >
//                 <Mail className="w-5 h-5 mr-2" />
//                 Email Me
//               </button>
//               <button
//                 onClick={() => window.open('https://calendly.com/nesttech', '_blank')}
//                 className="btn btn-outline"
//               >
//                 <Calendar className="w-5 h-5 mr-2" />
//                 Schedule Call
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;




// frontend/src/components/Contact/Contact.jsx
import React, { useState, useRef } from 'react';
import { 
  Mail, Phone, MapPin, Send, CheckCircle, 
  AlertCircle, Github, Linkedin, Twitter, 
  MessageSquare, User, Mail as MailIcon, FileText, Calendar // ADDED Calendar
} from 'lucide-react';
// import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@nesttech.dev',
      link: 'mailto:hello@nesttech.dev',
      color: 'text-blue-500'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      color: 'text-green-500'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'San Francisco, CA',
      link: 'https://maps.google.com',
      color: 'text-red-500'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/nesttech',
      color: 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white',
      bgColor: 'bg-gray-100 dark:bg-gray-800'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/nesttech',
      color: 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://twitter.com/nesttechdev',
      color: 'text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-300',
      bgColor: 'bg-sky-100 dark:bg-sky-900/30'
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // SIMPLE FORM SUBMISSION WITHOUT EMAILJS
      // For now, just show success message
      // You can connect this to your backend later
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'NestTech_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contact" className="section bg-dark-50 dark:bg-dark-950">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? Let's build something amazing together
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info & Social */}
          <div className="space-y-8 animate-slide-in-left">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.title}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white dark:bg-dark-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className={`p-3 rounded-lg ${info.color.replace('text-', 'bg-')}/10`}>
                      <info.icon className={`w-6 h-6 ${info.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-dark-500 dark:text-dark-400">
                        {info.title}
                      </div>
                      <div className="font-medium text-dark-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {info.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">
                Connect With Me
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-3 ${social.bgColor} rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}
                  >
                    <social.icon className={`w-5 h-5 ${social.color} transition-colors`} />
                    <span className={`font-medium ${social.color} transition-colors`}>
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Resume Download */}
            <div className="pt-8 border-t border-dark-200 dark:border-dark-700">
              <div className="text-center">
                <button
                  onClick={handleDownloadResume}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium group"
                >
                  <FileText className="w-5 h-5" />
                  Download Full Resume
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="animate-slide-in-right">
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">
                Send a Message
              </h3>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <div>
                      <div className="font-medium text-green-800 dark:text-green-300">
                        Message sent successfully!
                      </div>
                      <div className="text-sm text-green-700 dark:text-green-400">
                        I'll get back to you within 24 hours.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <div>
                      <div className="font-medium text-red-800 dark:text-red-300">
                        Error sending message
                      </div>
                      <div className="text-sm text-red-700 dark:text-red-400">
                        Please try again or contact me directly via email.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Form */}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-dark-700 dark:text-dark-300">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Your Name
                      </div>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-dark-700 dark:text-dark-300">
                      <div className="flex items-center gap-2">
                        <MailIcon className="w-4 h-4" />
                        Email Address
                      </div>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-dark-700 dark:text-dark-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="Project Inquiry"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-dark-700 dark:text-dark-300">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Your Message
                    </div>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn btn-primary ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>

                {/* Privacy Note */}
                <p className="text-center text-sm text-dark-500 dark:text-dark-400">
                  Your information is secure and will never be shared with third parties.
                </p>
              </form>
            </div>

            {/* Quick Response */}
            <div className="mt-8 p-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl text-white">
              <div className="flex items-center gap-4">
                <MessageSquare className="w-8 h-8" />
                <div>
                  <h4 className="font-bold text-lg">Quick Response Time</h4>
                  <p className="text-sm opacity-90">
                    I typically respond within 24 hours for all inquiries
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map/CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8">
            <div className="text-left">
              <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">
                Ready to Start Your Project?
              </h3>
              <p className="text-dark-600 dark:text-dark-400">
                Let's discuss how we can bring your ideas to life
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => window.location.href = 'mailto:hello@nesttech.dev'}
                className="btn btn-primary"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Me
              </button>
              <button
                onClick={() => window.open('https://calendly.com/nesttech', '_blank')}
                className="btn btn-outline"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;