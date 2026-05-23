export const getAllIssueDetails = `
 SELECT 
    i.id,
    i.title,
    i.description,
    i.type,
    i.status,
    json_build_object(
      'id', u.id,
      'name', u.name,
      'role', u.role
    )AS reporter,
     i.created_at,
    i.updated_at
     
  FROM issues i
  LEFT JOIN users u ON i.reporter_id = u.id 
  
`;


export const findUserByEmailQuery = `SELECT * FROM users WHERE email=$1`;


export const createUserQuery = ` INSERT INTO users(name, email, password, role) 
    VALUES($1, $2, $3, $4) 
    RETURNING *;`;


export const getIssueDetailsById = `
    SELECT 
    i.id,
    i.title,
    i.description,
    i.type,
    i.status,
    i.reporter_id,
    json_build_object(
      'id', u.id,
      'name', u.name,
      'role', u.role
    )AS reporter,
     i.created_at,
    i.updated_at
     
  FROM issues i
  LEFT JOIN users u ON i.reporter_id = u.id
  WHERE i.id = $1;
    `;
export const getUserById = ` SELECT * FROM users WHERE id=$1`;
export const updateDataByid = `
    UPDATE issues SET
    title=COALESCE($1, title),
    description=COALESCE($2 ,description),
    type=COALESCE($3, type),
    status= COALESCE($4,status)
     WHERE id=$5 RETURNING *
    `;

export const deleteIssueByid = `
    
      DELETE FROM issues WHERE id=$1
    
`;
