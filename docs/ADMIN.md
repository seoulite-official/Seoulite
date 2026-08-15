# Seoulite Admin Documentation

## Database Foundation

### Current Status
- **Prisma ORM** is installed and configured as the data access layer
- **SQLite** is used for local development (`./dev.db`)
- **Single Source of Truth**: All persistent issue data now lives in the Prisma database
- **Demo Data**: `app/lib/issues.ts` remains as temporary/reference data only

### Schema Overview

#### Issue Model
Stores metadata for each Seoulite issue:

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `slug` | String (unique) | URL-friendly identifier |
| `number` | Int | Sequential issue number |
| `date` | String | Publication date (YYYY-MM-DD format) |
| `title` | String? | Optional issue title |
| `description` | String | Issue description/summary |
| `coverImageKey` | String? | Storage reference for cover image |
| `coverImageOriginalName` | String? | Original filename of cover image |
| `coverImageSize` | Int? | File size in bytes |
| `coverImageMimeType` | String? | MIME type (e.g., image/jpeg) |
| `coverImageUploadedAt` | DateTime? | Upload timestamp |
| `publicationKey` | String? | Storage reference for PDF publication |
| `publicationOriginalName` | String? | Original PDF filename |
| `publicationSize` | Int? | PDF file size in bytes |
| `publicationMimeType` | String? | PDF MIME type (application/pdf) |
| `publicationUploadedAt` | DateTime? | PDF upload timestamp |
| `published` | Boolean | Publication status (default: false) |
| `publishedAt` | DateTime? | When issue was published |
| `createdAt` | DateTime | Record creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

#### User Model
Foundation for editorial/admin accounts:

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `email` | String (unique) | User email address |
| `name` | String? | User's full name |
| `password` | String | Hashed password (bcrypt) |
| `role` | String | User role (default: "EDITOR") |
| `createdAt` | DateTime | Account creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

### Storage Strategy
- **Binary Files**: PDFs and images are stored externally (not in SQLite)
- **Database Storage**: Only metadata and storage keys are stored in Prisma
- **Production**: External storage provider to be chosen (S3, Cloudinary, etc.)
- **Development**: Local file storage may be used for simplicity

### Migration Status
- Initial migration created: `20260814140310_init`
- Database file: `./dev.db`
- Schema validation: Passing
- TypeScript check: Passing

## Authentication System (Implemented 2026-08-15)

### Architecture Overview
- **Package**: `@auth/core@0.41.3` (Auth.js v5)
- **Strategy**: Credentials-only authentication with JWT sessions
- **Password Hashing**: bcryptjs (12 salt rounds)
- **Database**: Prisma ORM with SQLite (User model only)
- **Adapter**: NOT used (JWT sessions eliminate need for Prisma adapter)
- **Additional Models**: None (no Account, Session, or VerificationToken models)

### Key Files
- `app/api/auth/[...nextauth]/route.ts` - Auth.js configuration
- `app/admin/login/page.tsx` - Login form
- `app/admin/page.tsx` - Admin dashboard placeholder
- `middleware.ts` - Route protection for /admin paths
- `scripts/create-editor.ts` - Development account creation script
- `.env` - Environment variables (NEXTAUTH_SECRET, etc.)

### Features Implemented
1. **Login Page** (`/admin/login`)
   - Email + password form
   - Secure credential validation against Prisma User table
   - bcrypt password comparison
   - Safe error handling (does not reveal email existence)

2. **Session Management**
   - JWT-based sessions (stateless)
   - HTTP-only cookies with Secure flag in production
   - 30-day session duration
   - Proper cookie naming and security attributes

3. **Authorization**
   - Role-based access control (EDITOR role required for admin)
   - Separation of authentication (login) and authorization (permissions)
   - Middleware-based route protection

4. **Admin Protection**
   - `/admin` and all subroutes require authentication
   - Unauthenticated users redirected to `/admin/login`
   - No Admin link in public navigation (by design)
   - Public site visual design unchanged

5. **Admin Dashboard** (`/admin`)
   - Shows authenticated user information
   - Provides logout functionality
   - Neutral placeholder for future admin features

6. **Development Account Creation**
   - CLI script: `npx ts-node scripts/create-editor.ts`
   - Secure interactive prompts for email, password, name
   - Passwords hashed with bcrypt before storage
   - Clear warning: LOCAL DEVELOPMENT ONLY

### Environment Variables
- `DATABASE_URL` - SQLite connection string
- `NEXTAUTH_SECRET` - Secret for JWT encryption (32-byte base64)
- `NEXTAUTH_URL` - Base URL for callbacks (http://localhost:3000 dev)

### Security Notes
- Secrets stored only in environment variables (never in code)
- No `NEXT_PUBLIC_*` exposure of secrets
- Passwords never leave server in plaintext
- HTTP-only cookies prevent XSS token theft
- Secure cookie flag in production
- Role checking separates auth from authz

### Development Commands
```bash
# Start development server
npm run dev

# Prisma Studio (GUI for database)
npx prisma studio

# Create first editor account (development only)
npx ts-node scripts/create-editor.ts

# Generate Prisma client after schema changes
npx prisma generate

# Reset development database (CAUTION: deletes all data)
npx prisma migrate reset
```

### Next Steps (Pending Approval)
1. **Admin Interface**: Create CMS for managing issues/publications
2. **File Upload Handling**: Implement secure upload for cover images and PDFs
3. **Production Database**: Migrate to PostgreSQL when deployment provider chosen
4. **Validation & Security**: Add input validation, sanitization, and access controls
5. **Issue CRUD**: Implement issue creation/editing in admin interface

### Important Notes
- Do NOT modify `next.config.ts`, `tsconfig.json`, `package.json`, `postcss.config.mjs`, or `eslint.config.mjs` unless absolutely necessary
- Do NOT install additional packages without clear justification
- Keep components in `app/components/`, data/content in `app/lib/`
- Preserve existing functionality when adding features
- Run TypeScript and lint checks after meaningful changes
- This authentication system is minimal and focused - defer advanced features until approved