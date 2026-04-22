# Student Courses Cart App - Implementation Plan

## Approved Plan Steps:
1. [x] **Install react-router-dom** - Add routing for separate login/register/dashboard pages. (npm install executed)
2. [x] **Create AuthContext.jsx** - Shared auth state with login/register/logout, JWT handling. (Created with fake JWT, localStorage users, login/register functions)

3. [x] **Create Login.jsx & Register.jsx** - Separate auth components with axios calls. (Created, using context, routing links)

4. [x] **Create Courses.jsx** - Course list with add-to-cart buttons (fake courses data). (Created with fake axios call, 6 courses)
5. [x] **Create Cart.jsx** - Cart display, remove items, total. (Created with quantity controls, totals, persist localStorage)

6. [x] **Supporting components** - Navbar.jsx, ProtectedRoute.jsx (created for routing protection)

7. [x] **Update main.jsx** - Wrap with AuthProvider & CartProvider. (Updated)
8. [x] **Update App.jsx** - Router, routes, navbar, protected dashboard, Dashboard component. (Replaced old auth logic with routing/context)
9. [x] **Update App.css** - All new styles for navbar, courses, cart, dashboard, responsive. (Complete styling)

**Task complete!** Run `cd axios && npm run dev` to test.



Progress: Step 1 done. Next: Create AuthContext.

