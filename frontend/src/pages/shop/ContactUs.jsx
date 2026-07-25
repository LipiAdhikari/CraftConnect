import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Clock, Send, ChevronDown } from 'lucide-react';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-craft-200 rounded-2xl overflow-hidden bg-white hover:border-accent transition-colors">
      <button 
        className="w-full text-left px-6 py-4 font-bold text-craft-900 flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <ChevronDown className={`w-5 h-5 text-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-craft-700 leading-relaxed border-t border-craft-100 mt-2 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill out all fields.");
      return;
    }
    // Simulate sending message
    toast.success("Message sent successfully! We will get back to you soon.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="font-sans text-craft-900 overflow-hidden bg-craft-50 -mt-8 pt-8">
      
      {/* 1. Hero Section */}
      <section className="bg-craft-900 text-white py-20 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">Get in Touch</h1>
          <p className="text-xl text-craft-300 leading-relaxed">
            We'd love to hear from you. Whether you're an artisan, buyer, or partner, we're here to help.
          </p>
        </div>
      </section>

      {/* 2 & 3. Contact Info & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-craft-100 flex items-start hover:-translate-y-1 transition-transform">
              <MapPin className="w-8 h-8 text-accent mr-5 shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-craft-900 mb-1">Location</h3>
                <p className="text-craft-600">Pokhara, Nepal</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-craft-100 flex items-start hover:-translate-y-1 transition-transform">
              <Mail className="w-8 h-8 text-accent mr-5 shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-craft-900 mb-1">Email</h3>
                <p className="text-craft-600">support@craftconnectnepal.com</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-craft-100 flex items-start hover:-translate-y-1 transition-transform">
              <Phone className="w-8 h-8 text-accent mr-5 shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-craft-900 mb-1">Phone</h3>
                <p className="text-craft-600">+977 98XXXXXXXX</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-craft-100 flex items-start hover:-translate-y-1 transition-transform">
              <Clock className="w-8 h-8 text-accent mr-5 shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-craft-900 mb-1">Working Hours</h3>
                <p className="text-craft-600">Sunday – Friday<br/>10 AM – 5 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-10 md:p-12 rounded-[2.5rem] shadow-xl border border-craft-100">
            <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-craft-800 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-craft-50 border border-craft-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow" 
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-craft-800 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-craft-50 border border-craft-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow" 
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-craft-800 mb-2">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-craft-50 border border-craft-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow" 
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-craft-800 mb-2">Message</label>
                <textarea 
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-craft-50 border border-craft-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow resize-none" 
                  placeholder="Your message here..."
                  required
                ></textarea>
              </div>

              <Button type="submit" className="w-full py-4 text-lg font-bold shadow-md hover:shadow-lg flex justify-center items-center">
                <Send className="w-5 h-5 mr-2" /> Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions */}
      <section className="bg-white py-24 border-y border-craft-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-craft-600">Quick answers to questions you may have.</p>
          </div>
          
          <div className="space-y-4">
            <FAQItem 
              question="How do I become a verified artisan?" 
              answer="You can apply by clicking 'Become an Artisan' during registration. You will need to submit a government-issued ID, workshop photos, and process videos. Our Admin team manually reviews each application to ensure authenticity."
            />
            <FAQItem 
              question="How long does verification take?" 
              answer="Verification typically takes 24 to 48 hours. Once approved, you will receive full access to the Artisan Dashboard to start uploading products."
            />
            <FAQItem 
              question="How do I report a suspicious product?" 
              answer="If you are logged in as a buyer, you will see a '🚩 Report Product' button on every product details page. Clicking it will allow you to submit a report with visual evidence."
            />
            <FAQItem 
              question="How can I track my order?" 
              answer="Once you place an order, you can view the status directly from your 'Order History' panel in the Buyer Dashboard. You'll also receive email notifications on state changes (e.g. Shipped, Delivered)."
            />
          </div>
        </div>
      </section>

      {/* 5. Find Us (Map) */}
      <section className="py-24 bg-craft-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-craft-900">Find Us</h2>
          </div>
          <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl border-4 border-white relative bg-craft-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112521.84157155057!2d83.9011910609355!3d28.236965609459537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995937bbf0376ff%3A0xf6cf823b25803c5b!2sPokhara%2C%20Nepal!5e0!3m2!1sen!2sus!4v1714589283733!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Pokhara, Nepal"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 6. Follow Us */}
      <section className="bg-white py-16 border-y border-craft-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Follow Our Journey</h2>
          <div className="flex justify-center space-x-6">
            <a href="#" className="w-14 h-14 rounded-full bg-craft-50 flex items-center justify-center text-craft-700 hover:bg-accent hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="w-14 h-14 rounded-full bg-craft-50 flex items-center justify-center text-craft-700 hover:bg-accent hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="w-14 h-14 rounded-full bg-craft-50 flex items-center justify-center text-craft-700 hover:bg-accent hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="w-14 h-14 rounded-full bg-craft-50 flex items-center justify-center text-craft-700 hover:bg-accent hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* 7. Final Banner */}
      <section className="bg-accent text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-10">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Together, let's preserve Nepal's <br/>rich handmade heritage.
          </h2>
          <Link to="/marketplace" className="inline-block">
            <Button className="py-4 px-10 text-lg font-bold !bg-white !text-accent hover:!bg-craft-50 shadow-xl border-none">
              Explore Marketplace
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default ContactUs;
