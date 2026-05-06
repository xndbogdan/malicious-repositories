import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiUser, FiCalendar, FiShare2, FiArrowLeft, FiTag } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

function BlogPost() {

  const post = {
    title: 'The Future of Real Estate: Cryptocurrency Payments and Blockchain Technology',
    content: `
      <p class="mb-4">The real estate industry is undergoing a revolutionary transformation with the integration of cryptocurrency payments and blockchain technology. This shift is not just about adding another payment method – it's about fundamentally changing how property transactions are conducted, recorded, and verified.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">The Rise of Crypto in Real Estate</h2>
      <p class="mb-4">Cryptocurrency is increasingly being accepted in real estate transactions, offering several advantages:</p>
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2">Faster transaction processing</li>
        <li class="mb-2">Lower transaction fees</li>
        <li class="mb-2">Enhanced security through blockchain technology</li>
        <li class="mb-2">Access to global investment opportunities</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4">Blockchain's Impact on Property Transactions</h2>
      <p class="mb-4">Blockchain technology is revolutionizing property transactions in several ways:</p>
      <ol class="list-decimal pl-6 mb-4">
        <li class="mb-2">Smart Contracts: Automating and securing transaction processes</li>
        <li class="mb-2">Property Records: Creating immutable records of ownership</li>
        <li class="mb-2">Tokenization: Enabling fractional property ownership</li>
        <li class="mb-2">Transparency: Providing clear transaction histories</li>
      </ol>

      <h2 class="text-2xl font-semibold mt-8 mb-4">The Future Outlook</h2>
      <p class="mb-4">As we look to the future, several trends are emerging:</p>
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2">Increased adoption of cryptocurrency payments in real estate</li>
        <li class="mb-2">More platforms offering tokenized property investments</li>
        <li class="mb-2">Integration of smart contracts in property transactions</li>
        <li class="mb-2">Enhanced security measures for digital real estate transactions</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4">Conclusion</h2>
      <p class="mb-4">The integration of cryptocurrency and blockchain in real estate is not just a trend – it's the future of property transactions. As these technologies continue to evolve, we can expect to see more innovative solutions that make real estate investment more accessible, secure, and efficient.</p>
    `,
    image: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?w=1200&q=80',
    author: 'Sarah Johnson',
    date: '2024-03-15',
    readTime: '5 min read',
    category: 'Cryptocurrency',
    tags: ['Blockchain', 'Real Estate', 'Cryptocurrency', 'Investment']
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl text-white"
            >
              <Link to="/blog" className="inline-flex items-center text-white mb-6 hover:text-primary-300">
                <FiArrowLeft className="mr-2" />
                Back to Blog
              </Link>
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center text-secondary-200 space-x-6">
                <div className="flex items-center">
                  <FiUser className="mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <FiCalendar className="mr-2" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <FiClock className="mr-2" />
                  {post.readTime}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-md p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="space-y-6">
              {/* Share */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FiShare2 className="mr-2" />
                  Share this article
                </h3>
                <div className="flex space-x-4">
                  <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200">
                    <FaFacebook size={20} />
                  </button>
                  <button className="p-2 rounded-full bg-sky-100 text-sky-500 hover:bg-sky-200">
                    <FaTwitter size={20} />
                  </button>
                  <button className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200">
                    <FaLinkedin size={20} />
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FiTag className="mr-2" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-secondary-100 text-secondary-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;