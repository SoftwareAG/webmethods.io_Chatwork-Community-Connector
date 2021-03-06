module.exports = {

  name: "add_new_message_to_the_chat",

  title: "Add New Message To The Chat",

  description: "",
  version: "v1",

  input:{
    title: "Add New Message To The Chat",
    type: "object",
    properties: {
      room_id : {
          title : "Room ID",
          minLength : 1,
          type : "string"

      },
      body : {

          title : "message",
          minLength : 1,
          type : "string"

      }

    }
  },

  output: {
    title: "output",
  	type: "object",
  	properties: {

    }
  },
  mock_input:{},

  execute: function(input, output){
    var request = require("request")
  var options = {
    'method': 'POST',
    'url': 'https://api.chatwork.com/v2//rooms/'+input.room_id+'/messages',
    'headers': {
      'X-ChatWorkToken': input.auth.access_token,//'851a9719fb89a5d92c9433898b45eaf2',
      'Content-Type': 'application/json'
    },
    
 formData: {
  'body': input.body,
}

  };
  
  
  request(options, function (error, response, body) {
 try {
           if (body && typeof(body) === "string") {
               body = JSON.parse(body);
           }
       } catch (e) {
           return output(body);
       };
   
     if (response.statusCode === 403) {
           return output("the authentication information is incorrect.");
       
    }
    if (response.statusCode === 400) {
           return output("there is an error in the construction of the request. The body of the response will contain more detail of the problem.");
       }
   if (response.statusCode === 404) {
     return output(body);
           return output(" the requested record could not be found. This may also occur if the user does not have access to the requested record");
       }
       if (response.statusCode !== 200) {
           return output(body.status.errorDetails);
       }
    if (response.statusCode === 200) {
          // return output(body);
         
      // }
        // return output(body);//.categories);
         return output(null,body);
      
      }
       
});
  
   
   }

  }


