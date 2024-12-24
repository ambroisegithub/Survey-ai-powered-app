export interface User {
    user_id: number; 
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status?: string; 
  }
   
    export interface LoginResponse {
      success: boolean;
      message: string;
      data: {
        user: User;
        token: string;
      };
    }
    
    export interface LoginCredentials {
      email: string;
      password: string;
    }
    
    