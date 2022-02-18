import * as mangoose from 'mongoose';
export const fileschema = new mangoose.Schema({ 
    Firstname:{  
        type:String  
    },  
    Lastname:{  
        type:String  
    },  
    City:{  
        type:String  
    },  
    Salary:{  
        type:Number  
    }
});