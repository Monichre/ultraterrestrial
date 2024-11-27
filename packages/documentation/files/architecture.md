# Architecture

Implementing a flexible and modular multi-client or dynamic data layer using Drizzle ORM with various PostgreSQL clients (like PGLite, Xata, Neon, and Supabase) in a monorepo structure involves several key steps. The goal is to create an abstraction layer that decouples SDK-specific implementations from your core application logic, ensuring type safety and maintainability. Here’s a comprehensive approach to achieve this:

1. Monorepo Structure

Organize your monorepo to separate concerns and maintain clarity. A typical structure might look like this:

```plaintext
/monorepo
├── /packages
│   ├── /core
│   │   └── (Core application logic)
│   ├── /data-layer
│   │   ├── /adapters
│   │   │   ├── supabaseAdapter.ts
│   │   │   ├── xataAdapter.ts
│   │   │   ├── neonAdapter.ts
│   │   │   └── pgliteAdapter.ts
│   │   ├── index.ts
│   │   └── types.ts
│   └── /shared
│       └── (Shared utilities, types, etc.)
├── package.json
└── tsconfig.json
```

2. Define Abstractions and Interfaces

Start by defining a common interface that all database clients will adhere to. This ensures that your core application interacts with a consistent API, regardless of the underlying client.

```typescript
// packages/data-layer/types.ts

export interface DatabaseClient {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    query<T>(query: string, params?: any[]): Promise<T[]>;
    mutate<T>(mutation: string, params?: any[]): Promise<T>;
    // Add other necessary methods
}

export type SupportedClients = 'supabase' | 'xata' | 'neon' | 'pglite';
```

3. Implement Adapter Pattern for Each Client

Create adapter classes for each PostgreSQL client that implement the DatabaseClient interface. This encapsulates the SDK-specific code within each adapter.

```typescript
// packages/data-layer/adapters/supabaseAdapter.ts

import { DatabaseClient } from '../types';
import { createClient } from '@supabase/supabase-js';

export class SupabaseAdapter implements DatabaseClient {
    private client = createClient('SUPABASE_URL', 'SUPABASE_ANON_KEY');

    async connect() {
        // Supabase manages connections internally
    }

    async disconnect() {
        // Supabase doesn't require explicit disconnection
    }

    async query<T>(query: string, params?: any[]): Promise<T[]> {
        const { data, error } = await this.client.rpc(query, params);
        if (error) throw error;
        return data;
    }

    async mutate<T>(mutation: string, params?: any[]): Promise<T> {
        // Implement mutation logic
        const { data, error } = await this.client.rpc(mutation, params);
        if (error) throw error;
        return data;
    }
}
```

*Repeat similar adapter implementations for Xata, Neon, and PGLite.*

4. Create a Factory to Initialize the Appropriate Adapter

Use a factory pattern to instantiate the correct adapter based on configuration or runtime parameters.

```typescript
// packages/data-layer/index.ts

import { DatabaseClient, SupportedClients } from './types';
import { SupabaseAdapter } from './adapters/supabaseAdapter';
import { XataAdapter } from './adapters/xataAdapter';
import { NeonAdapter } from './adapters/neonAdapter';
import { PGLiteAdapter } from './adapters/pgliteAdapter';

class DataLayer {
    private client: DatabaseClient;

    constructor(clientType: SupportedClients) {
        switch (clientType) {
            case 'supabase':
                this.client = new SupabaseAdapter();
                break;
            case 'xata':
                this.client = new XataAdapter();
                break;
            case 'neon':
                this.client = new NeonAdapter();
                break;
            case 'pglite':
                this.client = new PGLiteAdapter();
                break;
            default:
                throw new Error(`Unsupported client type: ${clientType}`);
        }
    }

    async connect() {
        await this.client.connect();
    }

    async disconnect() {
        await this.client.disconnect();
    }

    query<T>(query: string, params?: any[]): Promise<T[]> {
        return this.client.query<T>(query, params);
    }

    mutate<T>(mutation: string, params?: any[]): Promise<T> {
        return this.client.mutate<T>(mutation, params);
    }

    // Add other methods as needed
}

export default DataLayer;
```

5. Ensure Type Safety with Drizzle ORM

Leverage Drizzle ORM’s type-safe capabilities to define your database schema and queries. This ensures that your queries and mutations are type-checked at compile time.

```typescript
// packages/data-layer/schema.ts

import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    age: integer('age').notNull(),
});

// Define other tables similarly
```

```typescript
// packages/data-layer/queries.ts

import { drizzle } from 'drizzle-orm';
import { users } from './schema';
import DataLayer from './index';

const dataLayer = new DataLayer('supabase'); // Or dynamically determine the client
drizzle(dataLayer);

export const getUsers = async () => {
    return await dataLayer.query<typeof users>('SELECT * FROM users');
};

export const createUser = async (name: string, age: number) => {
    return await dataLayer.mutate<typeof users>(
        'INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *',
        [name, age]
    );
};

// Add other query and mutation methods as needed
```

6. Configure Dependency Injection

Allow the core application to specify which database client to use, possibly through environment variables or configuration files. This makes the data layer dynamic and easily switchable.

```typescript
// packages/core/src/index.ts

import DataLayer from 'data-layer';
import { getUsers, createUser } from 'data-layer/queries';

const clientType = process.env.DB_CLIENT as SupportedClients || 'supabase';
const dataLayer = new DataLayer(clientType);

const initialize = async () => {
    await dataLayer.connect();

    // Example usage
    const users = await getUsers();
    console.log(users);

    await dataLayer.disconnect();
};

initialize().catch(console.error);
```

7. Abstract Core Logic from Data Layer

Ensure that your core application interacts only with the data-layer package’s exposed methods, without knowing about the underlying client implementations. This decouples the core logic from the data access specifics.

```typescript
// packages/core/src/services/userService.ts

import { getUsers, createUser } from 'data-layer/queries';

export const fetchAllUsers = async () => {
    return await getUsers();
};

export const addNewUser = async (name: string, age: number) => {
    return await createUser(name, age);
};
```

8. Handle Migrations and Schema Management

Centralize your schema definitions and migrations within the data-layer package. Use Drizzle ORM’s migration tools to manage database changes across different clients.

### Example using Drizzle's CLI

```bash
drizzle migrate:create add_users_table
drizzle migrate:run
```

9. Ensure Security and Obfuscation

To obfuscate SDK-specific code and prevent leaking implementation details:

- **Internal Package Usage**: Ensure that the data-layer package is internal and not exposed publicly.
- **TypeScript Encapsulation**: Use TypeScript’s `private` and `protected` modifiers to restrict access to sensitive parts of the code.
- **Minification and Bundling**: If distributing the package, use bundlers like Webpack or Rollup to minify and bundle the code, making it harder to reverse-engineer.

```

10. Testing and Validation

Implement comprehensive testing to ensure that each adapter behaves consistently and that the abstraction layer correctly delegates operations to the appropriate client.

```typescript
// packages/data-layer/adapters/tests/supabaseAdapter.test.ts

import { SupabaseAdapter } from '../supabaseAdapter';

describe('SupabaseAdapter', () => {
    let adapter: SupabaseAdapter;

    beforeAll(() => {
        adapter = new SupabaseAdapter();
    });

    it('should connect without errors', async () => {
        await expect(adapter.connect()).resolves.not.toThrow();
    });

    it('should perform a query', async () => {
        const result = await adapter.query('SELECT * FROM users');
        expect(result).toBeInstanceOf(Array);
    });

    // Add more tests for other methods
});
```

11. Documentation and Developer Experience

Provide clear documentation for the data-layer package, outlining how to add new clients, how to use existing query and mutation methods, and guidelines for maintaining type safety.

12. Considerations for Future Scalability

- **Adding New Clients**: To support additional PostgreSQL clients in the future, simply implement new adapters adhering to the `DatabaseClient` interface and update the factory.
- **Dynamic Client Selection**: If you need to switch clients at runtime based on different criteria (e.g., multi-tenancy), enhance the factory to handle dynamic instantiation.
- **Performance Optimizations**: Implement connection pooling and caching mechanisms within each adapter to optimize performance across different clients.

### Example Implementation

Here’s a simplified example tying some of these concepts together:

```typescript
// packages/data-layer/adapters/xataAdapter.ts

import { DatabaseClient } from '../types';
import { XataClient } from '@xata.io/client';

export class XataAdapter implements DatabaseClient {
    private client = new XataClient({ apiKey: 'YOUR_XATA_API_KEY', databaseURL: 'YOUR_XATA_DB_URL' });

    async connect() {
        // Xata manages connections internally
    }

    async disconnect() {
        // Xata doesn't require explicit disconnection
    }

    async query<T>(query: string, params?: any[]): Promise<T[]> {
        const response = await this.client.sql.query(query, params);
        return response.rows as T[];
    }

    async mutate<T>(mutation: string, params?: any[]): Promise<T> {
        const response = await this.client.sql.mutate(mutation, params);
        return response.rows[0] as T;
    }
}
```

```typescript
// packages/core/src/index.ts

import dotenv from 'dotenv';
import DataLayer from 'data-layer';
import { fetchAllUsers, addNewUser } from 'data-layer/queries';

dotenv.config();

const clientType = process.env.DB_CLIENT as SupportedClients || 'supabase';
const dataLayer = new DataLayer(clientType);

const initialize = async () => {
    await dataLayer.connect();

    // Fetch users
    const users = await fetchAllUsers();
    console.log('Users:', users);

    // Add a new user
    const newUser = await addNewUser('John Doe', 30);
    console.log('New User:', newUser);

    await dataLayer.disconnect();
};

initialize().catch(console.error);
```

### Conclusion

By following this modular and abstracted approach, you ensure that your core application remains agnostic of the underlying database clients. This not only enhances flexibility and scalability but also simplifies maintenance and testing. Leveraging TypeScript’s type safety alongside Drizzle ORM’s capabilities provides a robust foundation for your data layer, accommodating multiple PostgreSQL clients seamlessly within a monorepo structure.
