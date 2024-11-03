import { AuthOptions, CredentialsConfig } from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';

interface User {
  id: string;
  name: string;
  email: string;
  // Add other fields as necessary
}

// Define the type of your credentials
interface Credentials {
  username: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsConfig<Credentials>({
      // Type the credentials and specify required fields for TypeScript safety
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials: Credentials | undefined) => {
        if (!credentials) {
          return null;
        }

        const { username, password } = credentials;

        // Replace this with your actual authentication logic
        const user = await authenticateUser(username, password);

        if (user) {
          // Return a User object if authentication is successful
          return { id: user.id, name: user.name, email: user.email };
        } else {
          // Return null if authentication fails
          return null;
        }
      },
    }),
  ],
  // Additional NextAuth options if needed
};

// Mock function to simulate an authentication check
async function authenticateUser(username: string, password: string): Promise<User | null> {
  // Replace this with your authentication logic, such as querying a database
  if (username === 'test' && password === 'password') {
    return {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
    };
  }
  return null;
}
