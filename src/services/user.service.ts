import { User } from '../models/index.ts';                      

// Types for user creation and update
export type CreateUserData = {
  name: string;
  lastName: string;
  email: string;
  passwordHash: string;
  phone?: string | null;
  address?: string | null;
  role?: string;
};

export type UpdateUserData = Partial<CreateUserData>;    


// Create a new user
export function createUser(data: CreateUserData) {       
  return User.create(data);
}

// List all, ordered by id ascending
export function listUsers() {                            
  return User.findAll({ order: [['id', 'ASC']] });
}

// Search by primary key (id)
export function getUserById(id: number) {                
  return User.findByPk(id);
}

// Search by unique email
export function getUserByEmail(email: string) {          
  return User.findOne({ where: { email } });
}

// Update only fields present in 'data'
export async function updateUser(id: number, data: UpdateUserData) { 
  const user = await User.findByPk(id);  
  if (!user) return null;  
  await user.update(data); 
  return user;                         
}

// Delete by primary key (id)
export async function deleteUser(id: number) {           
  const user = await User.findByPk(id);                  
  if (!user) return false;                               
  await user.destroy(); // delete from db
  return true;                                           
}
