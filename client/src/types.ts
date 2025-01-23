export interface playlist{
   _id?: string;
   name: string;
   owner?: User;
   isPublic: boolean;
   songs?:any 
}

interface User{
   _id: string;
   name: string;
   email:string
}