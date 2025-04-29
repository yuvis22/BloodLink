"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Droplet, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const Hero = () => {
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const heroButtons = [
    {
      icon: <Search className="h-5 w-5 mr-2" />,
      label: "Find a Donor",
      href: "/find-donor",
      color: "bg-rose-600 hover:bg-rose-700",
    },
    {
      icon: <Droplet className="h-5 w-5 mr-2" />,
      label: "Become a Donor",
      href: "/register",
      color: "bg-white text-rose-600 hover:bg-gray-100 border border-rose-600",
      requiresAuth: true,
    },
    {
      icon: <Calendar className="h-5 w-5 mr-2" />,
      label: "Schedule Donation",
      href: "/schedule",
      color: "bg-gray-800 hover:bg-gray-900",
      requiresAuth: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleAuthenticatedRedirect = (path: string) => {
    if (!isLoaded) return;

    if (user) {
      router.push(path);
    } else {
      router.push("/sign-in?redirect=" + encodeURIComponent(path));
    }
  };

  const handleButtonClick = (href: string, requiresAuth: boolean = false) => {
    if (requiresAuth) {
      handleAuthenticatedRedirect(href);
    } else {
      router.push(href);
    }
  };

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6823608/pexels-photo-6823608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-10"></div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)",
        }}
      ></div>

      <div className="container mx-auto px-4 py-20 lg:py-32 relative">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            Every Drop <span className="text-rose-600">Saves Lives</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed"
            variants={itemVariants}
          >
            Connect with blood donors in your area, schedule donations, and
            learn how your contribution can make a critical difference when it
            matters most.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={itemVariants}
          >
            {heroButtons.map((button, index) => (
              <motion.div
                key={index}
                onMouseEnter={() => setHoveredButton(index)}
                onMouseLeave={() => setHoveredButton(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className={cn(
                    "text-white px-6 py-6 transition-all duration-300 text-base font-medium",
                    button.color
                  )}
                  onClick={() =>
                    handleButtonClick(button.href, button.requiresAuth)
                  }
                >
                  {button.icon}
                  {button.label}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 flex items-center justify-center gap-8 text-gray-600"
            variants={itemVariants}
          >
            <div className="flex flex-col items-center">
              <span className="font-bold text-3xl text-rose-600">10k+</span>
              <span className="text-sm">Donors</span>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-3xl text-rose-600">24/7</span>
              <span className="text-sm">Support</span>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-3xl text-rose-600">5k+</span>
              <span className="text-sm">Lives Saved</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
