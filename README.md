# ToDo - API's

###
  O projeto foi desenvolvido para criação de um todo list, contém API's para criação, login e edição de usuário, CRUD de tarefas, sendo possível 
  adicionar: nome, descrição, status e categoria da tarefa, as categorias são dinâmicas sendo possível cria-las via endpoint e integrá-las a suas tarefas, 
  já os status fazem parte de um enum sendo possível apenas estes.
  
  ``` Tecnologias ```
  - Node JS
  - Express
  - Sequelize ORM
  - MySQL
  - Typescript

  

#
BASE_URL=http://localhost:3000/
- Endpoints desenvolvidos:
  - Auth;
      - /login;    
        ```
         {
           "email": string;
           "password": string;
         }
        ```
      - register;  
         ```
         {
           "name": string;
           "email": string;
           "password": string;
         }
        ```
    
      - update/:id;  
          ```
         {
            "profile": string,
            "name": string,
            "newEmail": string,
            "newPassword": string,
            "currentPassword": string
         }
        ```
  - Category:
      - create;
         ```
         {
            "name": string,
         }
        ```
      - list;
         ```
         {
            "id_user": string,
         }
        ```
      - delete;
         ```
         {
            "id": string,
         }
        ```
      - update/:id;
         ```
         {
            "newName": string
         }
        ```
  - Tasks:
      - create;
          ```
           {
               "name": string,
               "description": string,
               "userId": string required,
               "categoryId": string
            }
          ```
      - list
         ```
          tasks/?user_id=string&limit=number&page=number
      - update/:id
         ```
            {
              "name": string,
              "description": string,
              "status": string, options: [ "created","in-progress","paused","completed","canceled"],
              "categoryId": string
            }
          ```
      - delete/:id

