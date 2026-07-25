import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Eye, ShieldCheck, Users, Map, Heart, Smile, Leaf, Globe, Search } from 'lucide-react';
import Button from '../../components/ui/Button';

// Custom hook for animated counter
const useAnimatedCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function (easeOutExpo)
      const easePercentage = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(end * easePercentage));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count;
};

const AnimatedStat = ({ end, label, icon, duration }) => {
  const count = useAnimatedCounter(end, duration);
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-craft-100 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
      <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-6">
        {icon}
      </div>
      <h4 className="text-4xl font-extrabold text-craft-900 mb-2">{count.toLocaleString()}+</h4>
      <p className="text-craft-600 font-medium tracking-wide uppercase text-sm text-center">{label}</p>
    </div>
  );
};

const AboutUs = () => {
  return (
    <div className="font-sans text-craft-900 overflow-hidden bg-craft-50 -mt-8 pt-8">
      
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-craft-900 leading-tight">
              Empowering Artisans. <br/><span className="text-accent">Preserving Heritage.</span>
            </h1>
            <p className="text-xl text-craft-700 leading-relaxed border-l-4 border-accent pl-6 bg-white py-4 rounded-r-xl shadow-sm">
              CraftConnect Nepal is a digital marketplace dedicated to connecting local Nepali artisans directly with buyers while promoting transparency, fair trade, and authentic handmade craftsmanship.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 rounded-[3rem] transform -rotate-3 scale-105 -z-10"></div>
            <img 
              src="/about-us-hero.jpg" 
              alt="Community of Nepalese artisans" 
              className="w-full h-auto object-cover rounded-[3rem] shadow-2xl border-8 border-white"
            />
          </div>
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="bg-white py-24 border-y border-craft-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <h2 className="text-4xl font-bold tracking-tight">Our Story</h2>
          <div className="text-xl text-craft-700 leading-loose space-y-6">
            <p>
              For generations, Nepal has been home to some of the world’s most talented artisans. Yet, despite their incredible skill, many earn very little. The reason? <strong className="text-craft-900">Unnecessary middlemen</strong> who take a significant portion of the profit before the product ever reaches the customer.
            </p>
            <p>
              At the same time, buyers globally are seeking genuine, handmade crafts, but they often cannot verify whether the products they purchase are truly handmade or mass-produced in a factory.
            </p>
            <p className="font-semibold text-accent text-2xl">
              CraftConnect Nepal was created to solve this problem through technology.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Our Mission & 4. Our Vision */}
      <section className="py-24 bg-craft-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="bg-craft-800/50 backdrop-blur-md p-12 rounded-[2.5rem] border border-craft-700 hover:bg-craft-800 transition-colors">
              <Globe className="w-12 h-12 text-accent mb-6" />
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-craft-300 leading-relaxed">
                "Our mission is to empower Nepali artisans by providing a trusted digital marketplace where they can sell authentic handmade products directly to buyers while preserving Nepal's rich cultural heritage."
              </p>
            </div>
            <div className="bg-craft-800/50 backdrop-blur-md p-12 rounded-[2.5rem] border border-craft-700 hover:bg-craft-800 transition-colors">
              <Eye className="w-12 h-12 text-accent mb-6" />
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-craft-300 leading-relaxed">
                "To become Nepal's most trusted online marketplace for authentic handmade crafts and create sustainable economic opportunities for local artisans."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Core Values */}
      <section className="py-24 bg-craft-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-craft-900">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-craft-100 hover:shadow-lg transition-all hover:-translate-y-2">
              <HeartHandshake className="w-14 h-14 text-accent mb-6" />
              <h3 className="text-2xl font-bold text-craft-900">Fair Trade</h3>
            </div>
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-craft-100 hover:shadow-lg transition-all hover:-translate-y-2">
              <Search className="w-14 h-14 text-accent mb-6" />
              <h3 className="text-2xl font-bold text-craft-900">Transparency</h3>
            </div>
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-craft-100 hover:shadow-lg transition-all hover:-translate-y-2">
              <ShieldCheck className="w-14 h-14 text-accent mb-6" />
              <h3 className="text-2xl font-bold text-craft-900">Authenticity</h3>
            </div>
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-craft-100 hover:shadow-lg transition-all hover:-translate-y-2">
              <Users className="w-14 h-14 text-accent mb-6" />
              <h3 className="text-2xl font-bold text-craft-900">Community Empowerment</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Our Impact */}
      <section className="py-24 bg-white border-t border-craft-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-craft-900">Our Impact</h2>
            <p className="text-lg text-craft-600 mt-4">Numbers that tell the story of a growing community.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedStat end={250} label="Verified Artisans" icon={<ShieldCheck className="w-8 h-8" />} duration={2500} />
            <AnimatedStat end={1200} label="Handmade Products" icon={<Heart className="w-8 h-8" />} duration={3000} />
            <AnimatedStat end={45} label="Districts Connected" icon={<Map className="w-8 h-8" />} duration={2000} />
            <AnimatedStat end={5000} label="Happy Buyers" icon={<Smile className="w-8 h-8" />} duration={3500} />
          </div>
        </div>
      </section>

      {/* 7. Why CraftConnect Matters */}
      <section className="py-24 bg-craft-50 border-t border-craft-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-craft-900">Why CraftConnect Matters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border-l-8 border-accent flex items-start">
              <Globe className="w-10 h-10 text-craft-400 mr-6 shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-craft-900 mb-2">Supports Local Economy</h3>
                <p className="text-craft-600">Money flows directly into local communities, boosting regional economic stability instead of corporate margins.</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border-l-8 border-accent flex items-start">
              <Heart className="w-10 h-10 text-craft-400 mr-6 shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-craft-900 mb-2">Preserves Traditional Crafts</h3>
                <p className="text-craft-600">By making crafts financially viable, we encourage younger generations to learn and preserve ancient skills.</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border-l-8 border-accent flex items-start">
              <ShieldCheck className="w-10 h-10 text-craft-400 mr-6 shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-craft-900 mb-2">Builds Buyer Trust</h3>
                <p className="text-craft-600">Rigorous verifications and a transparent digital passport guarantee you get what you pay for.</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border-l-8 border-accent flex items-start">
              <Leaf className="w-10 h-10 text-craft-400 mr-6 shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-craft-900 mb-2">Encourages Sustainable Livelihoods</h3>
                <p className="text-craft-600">Fair trade pricing creates long-term sustainability for artisans and their families.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Closing Banner */}
      <section className="bg-accent text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-10">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Every Handmade Product Has a Story.<br/>Every Artisan Deserves a Fair Price.
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

export default AboutUs;
