** env_guide **

PORT = 

DATABASE_URL = 

HWT_KEY =

---------

**api_service **

method          path             authen        params      body
POST            /auth/register   0             none        {username,password,confirmpassword,email}
POST            /auth/login      0             none        {username,password}
GET             /auth/me         1             none        none
GET             /todos           1             none        none
POST            /todos/          1             none        {title, dueDate}
PUT             /todos/:id       1             id          {title, dueDate, status}
DELETE          /todos/:id       1             id          none

-------------------

Notes

MVC (moudels,route+controller,view)