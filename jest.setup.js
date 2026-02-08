import '@testing-library/jest-dom'

// Fix for Prisma TextEncoder issue in Jest
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;