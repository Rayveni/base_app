function message_update(success,message) {
    document.querySelector('#message_id').textContent = message;
  
  };

async function FileUpload(inp) 
{
    let user = { name:'john', age:34 };
    let formData = new FormData();
    let photo = inp.files[0];      
         
    formData.append("file", photo);
    formData.append("report_params", JSON.stringify(user)); 
    
    //const ctrl = new AbortController()    // timeout setTimeout(() => ctrl.abort(), 5000);
    
    try {
       let r = await fetch('/upload', 
           {
               method: "POST", body: formData//,signal: ctrl.signal
           }); 
      let response = await r.json();//text()

        message_update(response['status'], response['message']);
    
    } catch (e) {
        message_update(false, e);
     
    }
    
}