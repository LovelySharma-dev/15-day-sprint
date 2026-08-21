A **Monorepo** is a software development approach where a single Git repository contains multiple distinct projects, packages, or services (such as frontends, backends, and shared utilities) rather than splitting them into isolated repositories.

---

### Core Concepts & Architecture Comparisons

**Monorepo vs. Multirepo**

* **Repository Strategy:** Determines where your code lives and how project files are organized.


* **Multirepo:** Each application/service lives in its own Git repository. Leads to duplicate code (like Zod schemas or utility functions), multiple commits across repos for single features, and disconnected CI/CD pipelines.


* **Monorepo:** A single Git repository housing all deployable apps and shared packages. Enables easy code sharing, atomic cross-stack Git commits, and unified team collaboration.



**Monolith vs. Microservices**

* **Deployment & System Architecture:** Determines how applications execute and scale in production, independent of repository structure.


* **Monolith:** All functionality (auth, payments, routing) is coded as a single deployable application unit.


* **Microservices:** Functionality is divided into isolated services running and scaling independently across different servers or cloud providers.



# Architectural Comparison Notes

| Setup Combination | Repository Structure | Deployment / Service Structure |
| :--- | :--- | :--- |
| **Monorepo + Monolith** | Single repository | Single deployable backend application |
| **Monorepo + Microservices** | Single repository | Multiple independently deployable services |
| **Multirepo + Monolith** | Multiple repositories (e.g., frontend repo & backend repo) | Single monolithic backend codebase |
| **Multirepo + Microservices** | Dedicated repository for each individual service | Multiple independently scalable services |

---

### Core Concept Breakdown

* **Repository Strategy (Where your code lives):**
  * **Monorepo:** A single Git repository housing all deployable apps and shared packages[cite: 1].
  * **Multirepo:** Each application or service lives in its own isolated Git repository[cite: 1].

* **System & Deployment Architecture (How apps run and scale):**
  * **Monolith:** All functionality (auth, payments, admin, etc.) is coded as a single deployable unit[cite: 1].
  * **Microservices:** Functionality is separated into isolated, independently deployable and scalable services across different servers or cloud environments[cite: 1].

---

### The Primitive Monorepo & Its Limitations

A primitive monorepo simply places folders (like `client`, `server`, `shared`) inside a single directory.

* **Messy Relative Imports:** Consuming code requires complex relative paths (e.g., `../../shared/src/formatCurrency`).


* **No Unified Dependency Management:** Each project manages packages in complete isolation without workspace awareness.


* **Manual Build Ordering:** You must manually compile dependencies before running dependent applications.



---

### Package Management with pnpm Workspaces

`pnpm` (Performant NPM) uses a content-addressable global storage mechanism, linking packages to projects rather than duplicating dependencies across directories, drastically saving disk space and speeding up installations.

**Standard Folder Structure**

```text
monorepo-root/
├── apps/
│   ├── web/        # Frontend app (e.g., Next.js / Vite React)
│   └── api/        # Backend server (e.g., Express)
├── packages/
│   └── utils/      # Shared utilities / types / schemas
├── package.json
└── pnpm-workspace.yaml

```

**Workspace Setup Files**

* **Root `pnpm-workspace.yaml`:** Defines workspace boundaries.


```yaml
packages:
  - 'apps/*'
  - 'packages/*'

```



* **Consuming Local Packages:** Use `workspace:*` in the consuming package's `package.json` to link local packages without publishing to an external registry:


```json
{
  "dependencies": {
    "@monorepo-setup/utils": "workspace:*"
  }
}

```



* **Next.js Note:** Include `transpilePackages: ["@monorepo-setup/utils"]` inside `next.config.js` to ensure Next.js compiles local TypeScript packages properly.



---

### Build Orchestration with Turborepo

While `pnpm` workspaces handle dependency linking and clean imports, they do not resolve task orchestration, build ordering, or intelligent caching.

**Key Turborepo Capabilities**

* **Dependency Graph Awareness:** Automatically detects which packages depend on others (e.g., builds `packages/utils` before compiling `apps/api` or `apps/web`).


* **Computational Caching:** Hashes task inputs and outputs (such as `dist/**` and `.next/**`), skipping recompilation entirely if files have not changed.


* **Parallel Execution:** Runs linting, testing, and dev servers concurrently across packages.



**Root `turbo.json` Configuration**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}

```

**Key CLI Commands**

* `pnpm add turbo -D -w`: Installs Turborepo globally at the workspace root.


* `pnpm turbo build`: Runs the build pipeline respecting dependency order and utilizing build cache.


* `pnpm turbo dev`: Boots all configured workspace apps concurrently.