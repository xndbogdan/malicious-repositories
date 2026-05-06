import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiClock, FiUser } from 'react-icons/fi';

function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'crypto', name: 'Cryptocurrency' },
    { id: 'investment', name: 'Investment' },
    { id: 'property', name: 'Property' },
    { id: 'technology', name: 'Technology' },
    { id: 'market', name: 'Market Analysis' }
  ];

  const posts = [
    {
      id: 1,
      title: 'The Future of Real Estate: Cryptocurrency Payments and Blockchain Technology',
      slug: 'future-real-estate-crypto-payments',
      excerpt: 'Explore how cryptocurrency and blockchain are revolutionizing property transactions and investment opportunities.',
      image: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?w=800&q=80',
      category: 'crypto',
      author: 'Sarah Johnson',
      date: '2024-03-15',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Understanding Tokenized Real Estate Investment',
      slug: 'understanding-tokenized-real-estate',
      excerpt: "A comprehensive guide to property tokenization and how it's making real estate investment more accessible.",
      image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&q=80',
      category: 'investment',
      author: 'Michael Chen',
      date: '2024-03-12',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'Smart Contracts in Real Estate Transactions',
      slug: 'smart-contracts-real-estate',
      excerpt: 'How smart contracts are streamlining property transactions and reducing costs.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      category: 'technology',
      author: 'David Rodriguez',
      date: '2024-03-10',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: '2024 Real Estate Market Analysis: Crypto Impact',
      slug: '2024-market-analysis-crypto',
      excerpt: 'Analysis of how cryptocurrency adoption is affecting real estate market dynamics.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      category: 'market',
      author: 'Emma Wilson',
      date: '2024-03-08',
      readTime: '8 min read'
    },
    {
      id: 5,
      title: 'Property Investment Strategies with Cryptocurrency',
      slug: 'property-investment-strategies-crypto',
      excerpt: 'Learn effective strategies for investing in real estate using cryptocurrency.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
      category: 'investment',
      author: 'Sarah Johnson',
      date: '2024-03-05',
      readTime: '6 min read'
    },
    {
      id: 6,
      title: 'Regulatory Landscape: Crypto in Real Estate',
      slug: 'regulatory-landscape-crypto-real-estate',
      excerpt: 'Understanding the current regulatory environment for cryptocurrency-based property transactions.',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
      category: 'crypto',
      author: 'Michael Chen',
      date: '2024-03-02',
      readTime: '7 min read'
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-secondary-50 py-16">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Real Estate & Crypto Insights</h1>
          <p className="text-secondary-600">
            Stay updated with the latest trends in real estate investment, cryptocurrency, and blockchain technology.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="input pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <select
                  className="input"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Link to={`/blog/${post.slug}`}>
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-primary-600">
                    {categories.find(c => c.id === post.category)?.name}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-3 hover:text-primary-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-secondary-600 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-secondary-500">
                    <FiUser className="mr-2" />
                    <span className="mr-4">{post.author}</span>
                    <FiClock className="mr-2" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;