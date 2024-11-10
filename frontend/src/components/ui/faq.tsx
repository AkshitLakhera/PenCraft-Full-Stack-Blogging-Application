"use client";
import { useState } from "react";
import {
  ChevronDown,
  PenTool,
  Cloud,
  Share2,
  BookOpen,
  Zap,
  Lock,
  Users,
  Globe,
  Shield,
  Database,
  Layout,
  Edit,
  Code,
  FileText,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
  category: string;
}

interface NavLink {
  label: string;
  category: string;
  icon: React.ReactNode;
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("general");

  const navLinks: NavLink[] = [
    {
      label: "General",
      category: "general",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      label: "Features",
      category: "features",
      icon: <PenTool className="h-4 w-4" />,
    },
    {
      label: "Security",
      category: "security",
      icon: <Shield className="h-4 w-4" />,
    },
    {
      label: "Integration",
      category: "integration",
      icon: <Code className="h-4 w-4" />,
    },
  ];

  const allFaqs: FAQItem[] = [
    // General FAQs
    {
      question: "What is Pencraft and how does it work?",
      answer:
        "Pencraft is a modern blogging platform that empowers writers to publish and manage content independently. It uses React for the frontend, Cloudflare Workers for the backend, and other cutting-edge technologies for seamless performance.",
      icon: <Globe className="h-5 w-5" />,
      category: "general",
    },
    {
      question: "Who can use Pencraft?",
      answer:
        "Anyone who wants a reliable and independent platform for blogging. Whether you're a solo writer, a team, or a publication, Pencraft caters to your needs with full creative control.",
      icon: <Users className="h-5 w-5" />,
      category: "general",
    },
    {
      question: "Can I customize the layout of my blog?",
      answer:
        "Yes, Pencraft offers customizable templates and layout settings so that your blog can reflect your personal style and brand.",
      icon: <Layout className="h-5 w-5" />,
      category: "general",
    },
    {
      question: "What technologies does Pencraft use?",
      answer:
        "Pencraft is built using React, Cloudflare Workers, a robust ORM, modern database solutions, and strong authentication mechanisms to ensure a high-quality user experience.",
      icon: <Zap className="h-5 w-5" />,
      category: "general",
    },
    // Features FAQs
    {
      question: "What editing tools are available in Pencraft?",
      answer:
        "Pencraft provides a rich text editor with markdown support, code highlighting, and other advanced writing tools to enhance your blogging experience.",
      icon: <Edit className="h-5 w-5" />,
      category: "features",
    },
    {
      question: "How can I publish my blog posts?",
      answer:
        "Publishing in Pencraft is as easy as clicking 'Publish'. You can also schedule posts for future release or update published content anytime.",
      icon: <FileText className="h-5 w-5" />,
      category: "features",
    },
    {
      question: "Can I share my blog posts on social media?",
      answer:
        "Yes! Pencraft includes built-in social sharing options, so you can easily share your content on popular platforms.",
      icon: <Share2 className="h-5 w-5" />,
      category: "features",
    },
    {
      question: "Does Pencraft support team collaboration?",
      answer:
        "Yes, you can invite team members to collaborate, edit, and contribute to blog posts with different permission levels.",
      icon: <Users className="h-5 w-5" />,
      category: "features",
    },
    // Security FAQs
    {
      question: "How secure is my content on Pencraft?",
      answer:
        "We prioritize security with end-to-end encryption and industry-standard authentication. Your data is protected with frequent audits and reliable infrastructure.",
      icon: <Lock className="h-5 w-5" />,
      category: "security",
    },
    {
      question: "Is my data backed up?",
      answer:
        "Yes, Pencraft regularly backs up your data to ensure it remains safe and can be restored in case of unforeseen events.",
      icon: <Database className="h-5 w-5" />,
      category: "security",
    },
    {
      question: "What measures are in place for user authentication?",
      answer:
        "Pencraft uses secure authentication methods, including multi-factor authentication (MFA), to keep your account protected.",
      icon: <Shield className="h-5 w-5" />,
      category: "security",
    },
    {
      question: "Can I restrict access to my posts?",
      answer:
        "Yes, you have full control over your content's visibility. You can set posts to be public, private, or restricted to specific audiences.",
      icon: <Lock className="h-5 w-5" />,
      category: "security",
    },
    // Integration FAQs
    {
      question: "What integrations are available for Pencraft?",
      answer:
        "Pencraft supports integrations with tools like Google Analytics, SEO plugins, and social media platforms to enhance your blogging capabilities.",
      icon: <Code className="h-5 w-5" />,
      category: "integration",
    },
    {
      question: "Can I connect Pencraft to my custom domain?",
      answer:
        "Yes, Pencraft allows you to connect and manage your custom domain to give your blog a professional appearance.",
      icon: <Globe className="h-5 w-5" />,
      category: "integration",
    },
    {
      question: "Does Pencraft offer API access?",
      answer:
        "Yes, Pencraft provides API access for advanced users who want to integrate the platform with their own tools and workflows.",
      icon: <Zap className="h-5 w-5" />,
      category: "integration",
    },
    {
      question: "Is it possible to integrate third-party plugins?",
      answer:
        "Yes, Pencraft is designed to be flexible, allowing for the integration of third-party plugins to extend its functionality.",
      icon: <Cloud className="h-5 w-5" />,
      category: "integration",
    },
  ];

  const filteredFaqs = allFaqs.filter((faq) => faq.category === activeCategory);

  return (
    <div className="min-h-screen w-full max-w-4xl mx-auto px-4">
      <h2 className="text-center text-4xl font-semibold pb-10">
        Frequently Asked Questions
      </h2>
      {/* Category Navigation */}
      <nav className="flex items-center justify-center gap-4 md:gap-8 mb-12 overflow-x-auto pb-4">
        {navLinks.map((link) => (
          <button
            key={link.category}
            onClick={() => {
              setActiveCategory(link.category);
              setActiveIndex(null);
            }}
            className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm transition-all duration-200 whitespace-nowrap ${
              activeCategory === link.category
                ? "bg-primary/5 text-primary font-medium"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <span>{link.label}</span>
          </button>
        ))}
      </nav>

      {/* FAQ Items */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => (
          <div
            key={index}
            className="border border-border/5 rounded-lg overflow-hidden"
          >
            <button
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
              className="w-full p-4 md:p-6 flex items-center justify-between group hover:bg-primary/[0.02] transition-colors"
            >
              <div className="flex items-center gap-4 text-left">
                <span className="text-primary/40 group-hover:text-primary/60 transition-colors">
                  {faq.icon}
                </span>
                <span className="text-base md:text-lg font-light group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-primary/40 group-hover:text-primary/60 transition-all duration-200 flex-shrink-0 ml-4 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-200 ease-in-out ${
                activeIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 pt-2 text-sm text-muted-foreground/80">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
     {/* Contact Support Section */}
<div className="flex flex-col items-center mt-8 space-y-4">
  <h2 className="text-center text-lg font-medium">
    Still can't find answers?
  </h2>
  <a
    href="mailto:support@example.com"
    className="px-6 py-3 bg-primary text-black rounded-lg shadow-lg hover:bg-gray-300 transition-all duration-200"
  >
    Contact Us
  </a>
</div>
    </div>
  );
}
