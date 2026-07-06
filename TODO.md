# Admin Frontend Implementation TODO

## Backend
- [x] Create `Express-project/controllers/adminController.js`
- [x] Create `Express-project/routes/admin.js`
- [x] Update `Express-project/server.js` to register admin routes
- [x] Fix `authMiddleware.js` to handle `Bearer <token>` format

## Frontend
- [x] Create `vite-project/src/api/axios.js`
- [x] Create `vite-project/src/components/AdminRoute.jsx` (fixes blank page)
- [x] Create `vite-project/src/components/AdminDashboard.jsx`
- [x] Create `vite-project/src/components/AdminMovies.jsx`
- [x] Create `vite-project/src/components/AdminShows.jsx`
- [x] Create `vite-project/src/components/AdminUsers.jsx`
- [x] Update `vite-project/src/components/Login.jsx` (admin redirect)
- [x] Update `vite-project/src/main.jsx` (admin routes + AdminRoute import)

## Admin API Endpoints (Backend)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/stats | Total Movies, Shows, Users, Subscriptions |
| GET | /api/admin/movies | Get ALL movies (unfiltered) |
| GET | /api/admin/shows | Get ALL shows (unfiltered) |
| GET | /api/admin/users | Get ALL users (no password) |
| GET | /api/admin/subscriptions | Get ALL subscriptions |
| DELETE | /api/admin/users/:id | Delete a user |

## Admin Routes (Frontend)
| Route | Component | Access |
|-------|-----------|--------|
| /admin/dashboard | AdminDashboard | admin only |
| /admin/movies | AdminMovies | admin only |
| /admin/shows | AdminShows | admin only |
| /admin/users | AdminUsers | admin only |


