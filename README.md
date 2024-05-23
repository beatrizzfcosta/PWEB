## Controller Folder Structure Description and Architecture

### Folder Layers

1. **Aggregate File (Folder Name):**
   - Each folder in the controller directory contains an aggregate file named the same as the folder itself.
   - The aggregate file serves to consolidate and export routes from the same level and one level below.
   - This structure enables a recursive approach, allowing each layer to include the layer(s) below it.
   
2. **Routes Folder:**
   - Within each folder, there is a routes folder that houses all HTTP method routes at the same level.
   - Route files are named according to the HTTP method they handle (e.g., `post.js`, `get.js`, etc.).
   - This separation facilitates the organization and management of routes based on their HTTP methods.

3. **Additional Sections:**
   - Beyond the aggregate file and the routes folder, each folder may contain additional subfolders following the same structure.
   - These subfolders can be used to create chaining of folders and routes, enabling complex routing hierarchies.
   - For example, a folder structure like `/user/login` indicates that `/user` is a level, and `/login` is another within the `user` folder.

### Example Usage

controllers/
│
├── user/
│ ├── user.js (Aggregate File)
│ ├── routes/
│ │ ├── post.js
│ │ ├── get.js
│ │ ├── delete.js
│ │ ├── patch.js
│ │ └── ...
│ ├── login/
│ │ ├── login.js (Aggregate File)
│ │ ├── routes/
│ │ │ ├── post.js
│ │ │ └── ...
│ │ └── ...
│ └── ...
│
├── warehouse/
│ ├── warehouse.js (Aggregate File)
│ ├── routes/
│ │ ├── post.js
│ │ ├── get.js
│ │ ├── delete.js
│ │ ├── patch.js
│ │ └── ...
│ └── ...
│
└── project/
├── project.js (Aggregate File)
├── routes/
│ ├── post.js
│ ├── get.js
│ ├── delete.js
│ ├── patch.js
│ └── ...
└── ...
