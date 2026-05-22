
export const getUserById = `
    SELECT * FROM user WHERE id=$1
    `;

export const updateDataByid = `
    UPDATE issues SET
    title=COALESCE($1, title),
    description=COALESCE($2 ,description),
    type=COALESCE($3, type),
    status=COALESCE($4, status)
     WHERE 'id'=$5 RETURNING *
    `;