import { useState, useEffect } from 'react';
import { Search, BookOpen } from 'lucide-react';
import Blog from './Blog';

// Updated blog items with longer descriptions for testing
const blogItems = [
  {
    imgSrc: "https://images.squarespace-cdn.com/content/v1/651f3729b2f69811ea357c79/74a113a6-ab95-493d-9c33-fab940272ca4/clay-banks-IYLcwiyYUgc-unsplash-no+guy.jpg?format=1500w",
    heading: "Unveiling the Secrets Beyond the Tourist Trails",
    description: "Embark on a captivating journey that invites you to dive deep into the rich tapestry of local culture. Discover hidden spots and secret treasures that often lie just beyond the well-trodden tourist paths. Our adventure takes us through winding alleyways adorned with colorful murals, bustling local markets filled with the scents of spices and fresh produce, and breathtaking secret viewpoints that offer panoramic vistas showcasing the true essence of each unique destination.As you navigate through these vibrant streets, learn how to truly connect with local communities. Engage with friendly residents who are eager to share their stories, traditions, and insights. From participating in time-honored festivals that celebrate their heritage to enjoying informal gatherings that showcase traditional music and dance, every moment spent immersing yourself in local life enriches your experience beyond measure.Venture into charming hidden cafes where skilled baristas craft aromatic coffee and bakers whip up traditional delicacies that have been passed down through generations. Visit artisan workshops where talented craftsmen meticulously preserve ancient crafts, from intricate pottery to handwoven textiles, offering you a glimpse into the local artistry that flourishes away from the commercialized mainstream.These encounters allow you to create memories that resonate far deeper than typical tourist attractions ever could. Each conversation, each shared laugh, becomes a thread in the fabric of your adventure, weaving together a narrative that is uniquely yours. Whether it’s savoring a homemade dish at a local family’s table or exploring a forgotten temple off the beaten path, these are the transformative experiences that turn a simple trip into an unforgettable adventure filled with authentic connections and lasting impressions.In this exploration, you will not only see the sights but feel the heartbeat of the place you visit. The stories of the people, the sounds of the street, and the flavors of the cuisine will linger in your mind long after you’ve returned home. So, pack your bags and prepare to venture off the beaten path, where the true spirit of travel awaits, ready to enrich your journey in ways you never imagined.  ",
    time: "20",
    comments: 10,
    tag: "Destination"
  },
  {
    imgSrc: "https://plus.unsplash.com/premium_photo-1670604211960-82b8d84f6aea?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    heading: "Culinary Delights: Must-Try Dishes from Around the World",
    description: "Embark on a culinary journey with these must-try dishes that capture the essence of their regions...",
    time: "30",
    comments: 8,
    tag: "Culinary"
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df",
    heading: "Lifestyle Tips for a Happier, Healthier You",
    description: "Transform your daily routine with these lifestyle changes that promote well-being and positivity. Discover practical tips, mindfulness techniques, and healthy habits that can make a significant impact on your physical and mental health. From morning routines that energize your day to evening practices that ensure restful sleep, we'll explore comprehensive approaches to wellness that fit into your busy lifestyle. Learn about nutrition, exercise, stress management, and the importance of work-life balance in creating a more fulfilling life.",
    time: "25",
    comments: 15,
    tag: "Lifestyle"
  },
   
    {
      imgSrc: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      heading: "Top Travel Hacks for a Smoother Journey",
      description: "Simplify your travel experience with these smart tips and tricks that every traveler should know...",
      time: "15",
      comments: 5,
      tag: "Tips & Hacks"
    },
    {
      imgSrc: "https://images.unsplash.com/photo-1683009427666-340595e57e43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzdGluYXRpb258ZW58MHx8MHx8fDA%3D",
      heading: "Exploring Hidden Destinations Off the Beaten Path",
      description: "Step away from the crowded tourist spots and uncover these hidden gems that offer a unique experience...",
      time: "40",
      comments: 22,
      tag: "Destination"
    },
    {
      imgSrc: "https://images.unsplash.com/photo-1505870136463-c17bc84b30a2?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      heading: "The Ultimate Guide to Street Food Around the World",
      description: "Discover the best street food scenes from bustling markets to charming alleys across the globe...",
      time: "35",
      comments: 18,
      tag: "Culinary"
    }
];

export const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState(blogItems);
  const categories = ["All", "Destination", "Culinary", "Lifestyle", "Tips & Hacks"];

  useEffect(() => {
    const filtered = blogItems.filter(blog => {
      const matchesCategory = selectedCategory === 'All' || blog.tag === selectedCategory;
      const matchesSearch = blog.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           blog.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredBlogs(filtered);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-[#11A2E9]" size={32} />
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Pencraft Blog
              </h1>
            </div>
            <p className="text-gray-400 max-w-xl">
              Discover stories, thinking, and expertise from writers on any topic that matters to you.
            </p>
          </div>
          
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg py-2 pl-4 pr-10 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#11A2E9]/50 focus:border-transparent"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#11A2E9] text-white shadow-lg shadow-[#11A2E9]/20'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-[#11A2E9]/10 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid with Responsive Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((item, index) => (
            <Blog
              key={index}
              {...item}
              featured={index === 0}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;